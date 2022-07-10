import express from "express";
import {updateUser,deleteUser,getUser,getUsers} from "../controllers/user.js";
import {verifyUser } from "../verify/verifyToken.js";

const router = express.Router();

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getUser);
router.get("/", getUsers);

export default router;
