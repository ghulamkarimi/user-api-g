import express from "express";
import { login, logout, registerUser } from "../controllers/userController.js";
import { validateCreateUser } from "../middleware/validation/validationHandler.js";

const router = express.Router();

router.post("/api/users/register", validateCreateUser, registerUser);
router.post("/api/users/login" , login)
router.post("/api/users/logout" , logout)
 


export default router;