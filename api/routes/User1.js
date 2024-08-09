const express = require("express");
const User = require("../models/User1");
const UserVerification = require("../models/UserVerification");
const userRoute = express.Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const path = require("path");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
const PasswordReset = require("../models/PasswordReset");

// Set up OAuth2 client


let transporter;

// Fonction pour configurer le transporter avec OAuth2
async function setUpTransporter() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground" // Redirect URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await oauth2Client.getAccessToken();

    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // Tester la connexion au serveur SMTP
    transporter.verify((error, success) => {
      if (error) {
        console.log("Transporter Error:", error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

  } catch (error) {
    console.error("Failed to create transporter", error);
  }
}

// Appelle la fonction pour configurer le transporter
setUpTransporter();

const sendVerificationEmail = async ({ _id, email, name }, res) => {
  try {
    const currentUrl = "http://localhost:3000/";
    const uniqueString = uuidv4() + _id;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Vérification de votre adresse email',
      text: `Bonjour ${name},\n\nVeuillez vérifier votre adresse email en cliquant sur le lien suivant : ${currentUrl + "api/users/verify/" + _id + "/" + uniqueString} \n\nCe lien expirera dans 1 heure.\n\nMerci!`,
    };

    // Hash the uniqueString
    const hashedUniqueString = await bcrypt.hash(uniqueString, 10);

    // Créer un nouvel enregistrement de vérification
    const newVerification = new UserVerification({
      userId: _id,
      uniqueString: hashedUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000, // 1 heure
    });

    // Sauvegarder l'enregistrement dans la base de données
    await newVerification.save();

    // Envoyer l'email de vérification
    await transporter.sendMail(mailOptions);

    res.json({
      status: "PENDING",
      message: "Verification email sent",
    });
 
  } catch (error) {
    console.error("Error in sendVerificationEmail:", error);
    res.json({
      status: "FAILED",
      message: "Could not save the verification data or send email",
    });
  }
};
//send password reset email
const sendResetEmail = async ({ _id, email, name }, redirectUrl, res) => {
    const resetString = uuidv4() + _id;

    // First, we clear all existing reset records
    PasswordReset.deleteMany({ userId: _id })
        .then(result => {
            // Reset records deleted successfully
            // now we send email
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Password Reset',
                text: `Bonjour ${name},\n\nPlease reset your password by clicking this link : ${redirectUrl + "/" + _id + "/" + resetString} \n\n This link expires in 1 hour.\n\n Thanks!`,
            };

            // hash the reset string
            const saltRounds = 10;
            bcrypt.hash(resetString, saltRounds)
                .then(hashedResetString => {
                    // set values in the reset collection (database)
                    const newPasswordReset = new PasswordReset({
                        userId: _id,
                        resetString: hashedResetString,
                        createdAt: Date.now(),
                        expiresAt: Date.now() + 3600000, // 1 hour
                    });
                    newPasswordReset
                        .save()
                        .then(() => {
                            transporter.sendMail(mailOptions)
                                .then(() => {
                                    // reset email sent and password reset record saved
                                    res.json({
                                        status: "SUCCESS",
                                        message: "Reset email sent"
                                    });
                                })
                                .catch(error => {
                                    console.log(error);
                                    res.json({
                                        status: "FAILED",
                                        message: "An error occurred while sending the reset email"
                                    });
                                });
                        })
                        .catch(error => {
                            console.log(error);
                            res.json({
                                status: "FAILED",
                                message: "An error occurred while saving the reset record"
                            });
                        });
                })
                .catch(error => {
                    console.log(error);
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while hashing the reset string"
                    });
                });
        })
        .catch(error => {
            console.log(error);
            res.json({
                status: "FAILED",
                message: "An error occurred while clearing existing reset records"
            });
        });
};



// Verify email 
userRoute.get("/verify/:userId/:uniqueString", (req, res) => {
    let { userId, uniqueString } = req.params;
    
    UserVerification.find({ userId })
        .then((result) => {
            if (result.length > 0) {
                const { expiresAt } = result[0];
                const hashedUniqueString = result[0].uniqueString;
                
                if (expiresAt < Date.now()) {
                    // Lien expiré
                    UserVerification.deleteOne({ userId })
                        .then(() => {
                            User.deleteOne({ _id: userId })
                                .then(() => {
                                    let message = "Link has expired. Please sign up again"; 
                                    res.redirect(`/users/api/verified/error=true&message=${message}`);
                                })
                                .catch((error) => {
                                    console.log(error);
                                    let message = "Clearing user with expired unique string failed";
                                    res.redirect(`/users/api/verified/error=true&message=${message}`);
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                            let message = "An error occurred while clearing expired verification record";
                            res.redirect(`/users/api/verified/error=true&message=${message}`);
                        });
                } else {
                    // Un enregistrement valide existe
                    bcrypt.compare(uniqueString, hashedUniqueString)
                        .then((result) => {
                            if (result) {
                                // Les chaînes correspondent
                                User.updateOne({ _id: userId }, { verified: true })
                                    .then(() => {
                                        UserVerification.deleteOne({ userId })
                                            .then(() => {
                                                res.sendFile(path.join(__dirname, "../views/verified.html"));
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                                let message = "An error occurred while finalizing successful verification";
                                                res.redirect(`/users/api/verified/error=true&message=${message}`);
                                            });
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        let message = "An error occurred while updating the user record";
                                        res.redirect(`/users/api/verified/error=true&message=${message}`);
                                    });
                            } else {
                                let message = "Invalid verification link";
                                res.redirect(`/users/api/verified/error=true&message=${message}`);
                            }
                        })
                        .catch((error) => {
                            let message = "An error occurred while comparing unique strings";
                            res.redirect(`/users/api/verified/error=true&message=${message}`);
                        });
                }
            } else {
                let message = "Account record does not exist or has not been verified. Please sign up or log in";
                res.redirect(`/users/api/verified/error=true&message=${message}`);
            }
        })
        .catch((error) => {
            console.log(error);
            let message = "An error occurred while verifying the email";
            res.redirect(`/users/api/verified/error=true&message=${message}`);
        });
});

//

//verified page route
userRoute.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/verified.html"));
  });
  




// Route login 
userRoute.post( "/login", (req, res) => {
    let { email, password } = req.body;

    if (email === "" || password === "") {
        res.json({
            status : "FAILED",
            message : "Empty input fields"
        });
    } 

    else {
        //check if user exists
        User.find({email})
        .then(data=>{
            if (data.length) {
                if(!data[0].verified) {
                    res.json({
                        status: "FAILED",
                        message: "User has not been verified. Please check your email"
                    })
                }
                else{
                    const hashedPassword = data[0].password;
                    bcrypt
                    .compare(password, hashedPassword)
                    .then(result=>{
                        if (result){
                            res.json({
                                status: "SUCCESS",
                                message: "Login successful",
                                data: data
                            });
                        }
                        else{
                            res.json({
                                status: "FAILED",
                                message: "Invalid email or password"
                            });
                        }
                    }).catch(err=>{
                        res.json({
                            status: "FAILED",
                            message: "An error occurred while comparing passwords"
                        });
                    });
                }
                //user exists
                
            }
            else {
                res.json({
                    status: "FAILED",
                    message: "Invalid credentials entered" 
                });
            }
        })
        .catch(err=>{
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing user"
            });
        });
    }
});

userRoute.post("/register", (req, res) => {
    let { name, email, password } = req.body;
   
    if (!name || !email || !password) {
      return res.json({
        status: "FAILED",
        message: "Empty input fields",
      });
    } else if (!/^[a-zA-Z]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name format",
        });
    } else if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
        res.json({
            status: "FAILED",
            message: "Invalid email format",
        });
    } else if (password.length < 6) {
        res.json({
            status: "FAILED",
            message: "Password must be at least 6 characters",
        });
    } else {
        // checking if user already exists
        User.find({ email })
        .then(result => {
            if (result.length) {
                // A user already exists
                res.json({
                    status: "FAILED",
                    message: "User with this email already exists",
                });
            } else {
                // try to create a new user
                // password handling
                const saltRounds = 10;
                bcrypt
                    .hash(password, saltRounds)
                    .then(hashedPassword => {
                        const newUser = new User({
                            name,
                            email,
                            password: hashedPassword,
                            verified: false
                        });
                        newUser
                            .save()
                            .then((result) => {
                                // handle account verification
                                sendVerificationEmail(result, res);
                            })
                            .catch((err) => {
                                res.json({
                                    status: "FAILED",
                                    message: "An error occurred while saving the user",
                                });
                            });
                    })
                    .catch((err) => {
                        res.json({
                            status: "FAILED",
                            message: "An error occurred while hashing the password",
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing user",
            });
        });
    }
});


// Password reset stuff

userRoute.post("/password-reset-email", (req, res) => {
    const {email} = req.body;
    const redirectUrl = "http://localhost:5173/#reset-password";
    User
    .find({email})
    .then((data)=>{
        if (data.length){
            //user exist
            //chek if user is verified

            if (!data[0].verified){
                res.json({
                    status: "FAILED",
                    message: "User has not been verified. Please check your email"
                })
            }
            else{
                //proceed with password reset
                sendResetEmail(data[0], redirectUrl, res);
            }
        }
        else{
            res.json({
                status: "FAILED",
                message: "No user with this email found"
            })
        }
    })
    .catch(error=>{
        console.log(error);
        res.json({
            status: "FAILED",
            message: "An error occurred while checking for the user",
        })
    })
})

// actully reset the password
userRoute.post("/reset-password", (req, res) => {
    let {userId, resetString, newPassword} = req.body;

    PasswordReset.find({userId})
    .then(result=>{
        if (result.length > 0) {
            
            const {expiresAt} = result[0];
            const hashedResetString = result[0].resetString;

            if (expiresAt < Date.now()){
                PasswordReset.deleteOne({userId})
                .then(()=>{
                    // Reset record successfully deleted
                    res.json({
                        status: "FAILED",
                        message: "Reset link has expired. Please request a new one"
                    })
                }
                    
                )
                .catch(error=>{
                    // deletion failed
                    console.log(error);
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while clearing the reset record"
                    
                    })
                })
            }
            else{
                // valid reset record exists
                // First compare the reset string
                bcrypt
                .compare(resetString, hashedResetString)
                .then((result)=>{
                    if (result){
                        // string matched
                        // hash password again
                        const saltRounds = 10;
                        bcrypt.hash(newPassword, saltRounds)
                        .then(hashedNewPassword=>{
                            // update the user password

                            User.updateOne({_id: userId}, {password: hashedNewPassword})
                            .then(()=>{
                                // password updated succesfully. Now delete the reset record
                                PasswordReset.deleteOne({userId})
                                .then(()=>{
                                    // both user record and reset record updated 
                                    res.json({
                                        status: "SUCCESS",
                                        message: "Password reset successful"
                                    })
                                })
                                .catch(error=>{
                                    console.log(error)
                                    res.json({
                                        status: "FAILED",
                                        message: "An error occurred while finalizing passsord reset"
                                    })
                                })
                            })
                            .catch(error=>{
                                console.log(error);
                                res.json({
                                    status: "FAILED",
                                    message: "An error occurred while updating the password"
                                })
                            })
                        })
                        .catch(error=>{
                            console.log(error);
                            res.json({
                                status: "FAILED",
                                message: "An error occurred while hashing the new password"
                            })
                        })
                    }
                    else{
                        // Existing record but incorrect reset string passed
                        res.json({
                            status: "FAILED",
                            message: "Invalid password reset details passed"
                        })
                    }
                })
                .catch(error=>{
                    res.json({
                        
                        status: "FAILED",
                        message: "An error occurred while comparing reset strings"
                    })
                })
            }
        }
        else{
            // password reset record doesn't exist
            res.json({
                status: "FAILED",
                message: "Password reset request not found"
            });
        }
    })
    .catch(error=>{
        console.log(error);
        res.json({
            status: "FAILED",
            message: "An error occurred while checking for the reset record"
        });
    })
})


// userRoute.get(
//   "/verify-email",
//   AsyncHandler(async (req, res) => {
//     const token = req.query.token;

//     console.log("Token reçu:", token);

//     if (!token) {
//       return res.status(400).json({ message: "Invalid or missing token" });
//     }

//     try {
//       // Vérifier et décoder le token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("Token décodé:", decoded);
//       const userId = decoded.userId;

//       // Trouver l'utilisateur
//       const user = await User.findById(userId);
//       console.log("Utilisateur trouvé:", user);

//       if (!user) {
//         return res.status(400).json({ message: "Invalid token or user not found" });
//       }

//       if (user.isVerified) {
//         return res.status(400).json({ message: "User already verified" });
//       }

//       // Mettre à jour le champ isVerified
//       user.isVerified = true;
//       await user.save();

//       console.log("Utilisateur après mise à jour:", user);

//       res.status(200).json({ message: "Email verified successfully" });

//     } catch (error) {
//       console.error("Échec de la vérification:", error.message);
//       res.status(400).json({ message: "Verification failed, invalid or expired token" });
//     }
//   })
// );




// // Get profile data
// userRoute.get(
//   "/profile",
//   protect,
//   AsyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);
//     if (user) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         createdAt: user.createdAt,
//       });
//     } else {
//       res.status(404);
//       throw new Error("User not found");
//     }
//   })
// );

// // Update user profile
// userRoute.put(
//   "/profile",
//   protect,
//   AsyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);
//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       if (req.body.password) {
//         user.password = req.body.password; // sera haché par le middleware pre('save') dans le modèle User
//       }
//       const updatedUser = await user.save();
//       res.json({
//         _id: updatedUser._id,
//         name: updatedUser.name, 
//         email: updatedUser.email,
//         isAdmin: updatedUser.isAdmin,
//         createdAt: updatedUser.createdAt,
//         token: generateToken(updatedUser._id),
//       });
//     } else {
//       res.status(404);
//       throw new Error("USER NOT FOUND");
//     }
//   })
// );

module.exports = userRoute;
