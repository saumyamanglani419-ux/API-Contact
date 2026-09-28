import express from "express"
import { login, register } from "../Controllers/user.js";

const router = express.Router();

// User Register Route
// @api desc = user register
// @api method = POST
// @api endpoint = /api/user/register

router.post("/register", register)

// User Register Login
// @api desc = user login
// @api method = POST
// @api endpoint = /api/user/login

router.post("/login", login)

export default router