const mongoose = require("mongoose");


const PasswordResetSchema = new mongoose.Schema(
  {
    userId: String, 
    resetString: String,
    createAt:  Date,
    expiresAt: Date,
    
  },
  
);

const PasswordReset = mongoose.model("PasswordReset", PasswordResetSchema);
module.exports = PasswordReset
 