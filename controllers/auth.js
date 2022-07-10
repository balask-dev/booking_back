import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { createError } from "../verify/error.js";

export async function register(req, res, next) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({...req.body,password: hash,});
    await newUser.save();
    res.status(200).send("Account Created");
  } catch (err) {
       console.log(err) 
 }
}
export async function login(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User Not Found"));
   
    const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
    if (!isPasswordCorrect)
      return next(createError(400, "Invalid credentials"));
   
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin },process.env.JWT);
   const { password, isAdmin, ...otherDetails } = user._doc;
    
   res.cookie("access_token", token, {httpOnly: true}).status(200).send({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    console.log(err);
  }
}
