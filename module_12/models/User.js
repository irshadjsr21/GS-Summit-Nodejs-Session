const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(12, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.verifyPassword = async function (pass) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pass, this.password, function (err, isMatch) {
      if (err) {
        reject(err);
      }
      resolve(isMatch);
    });
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
