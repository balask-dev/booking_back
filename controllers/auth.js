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
export async function login(req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Invalid credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Invalid credentials!");

    const { password, ...others } = user._doc;
    res.status(200).send(others);
  } catch (err) {
    res.status(500).send(err);
  }
});
