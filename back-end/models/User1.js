const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    name:  String,
    email: String, 
    password: String,
    isAdmin: {type: Boolean , default: false},
    verified: Boolean
    
  },
  
);

module.exports = mongoose.model("User", userSchema);
