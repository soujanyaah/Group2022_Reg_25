const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  address: {
    type: String,
  },
  age: {
    type: Number,
  },
  mobile: {
    type: String,
  },
  gender: {
    type: String,
    default: "Male",
  },
  role: {
    type: String,
    default: "user",
  },
  messages: [
    {
      message: {
        type: String,
      },
      file_paths: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
