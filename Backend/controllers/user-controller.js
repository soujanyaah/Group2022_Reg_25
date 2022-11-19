const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Checking the crypto module
const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Encrypting text
function encrypt(text) {
   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text
function decrypt(text) {
   let iv = Buffer.from(text.iv, 'hex');
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
}

//login
const login = async (req, res, next) => {
  ("login");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate("package");
    if (!user) {
      return res.status(404).json({ msg: "No user found for this email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Email and password does not match",
      });
    }
    const data = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    user.password = undefined;
    jwt.sign(data, "filesaver", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      return res.status(200).json({
        token,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        role: user.role,
        user: user,
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

//signup
const signUp = async (req, res, next) => {
  const { email, password, firstName, lastName, role } = req.body;

  let user;
  try {
    user = new User({
      email,
      password,
      firstName,
      lastName,

      role,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const data = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(data, "filesaver", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      return res.status(200).json({
        token,
        name: firstName,
        id: user.id,
        role: user.role,
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

//save message
const saveMessage = async (req, res, next) => {
  const encryptedMsg = encrypt(req.body.message); 
  console.log(encryptedMsg)
  const newmessage = { message: encryptedMsg.encryptedData };


  const user = await User.findById(req.body.userId);

  try {
    const savedMessage = await user.updateOne({
      $push: { messages: [newmessage]},
    });
    res.status(200).json("message saved");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = login;
exports.signUp = signUp;
exports.saveMessage = saveMessage;
