// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//     isVerified: {
//       type: Boolean,
//       default: false, // Ce champ indique si l'utilisateur a vérifié son email
//     },
//   },
//   { timestamps: true }
// );

// // Valider le mot de passe
// userSchema.methods.matchPassword = async function (enterPassword) {
//   return await bcrypt.compare(enterPassword, this.password);
// };

// // Hacher le mot de passe avant de l'enregistrer
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// module.exports = mongoose.model("User", userSchema);
