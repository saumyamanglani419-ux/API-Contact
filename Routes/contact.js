import express from "express";
import {
  deleteContactById,
  getAllContact,
  getContactbyId,
  getContactbyUserId,
  newContact,
  updateContactById,
} from "../Controllers/contact.js";

import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

// new contact
// @api desc = creating contact
// @api method = POST
// @api endpoint = /api/contact/new
router.post("/new", isAuthenticated, newContact);

// get all contact
// @api desc = fetch all contact
// @api method = GET
// @api endpoint = /api/contact/
router.get("/", getAllContact);

// get contact by Id
// @api desc = fetch contact by Id
// @api method = GET
// @api endpoint = /api/contact/id
router.get("/:id", getContactbyId);

// update contact by Id
// @api desc = update contact by Id
// @api method = PUT
// @api endpoint = /api/contact/id
router.put("/:id", isAuthenticated, updateContactById);

// delete contact by Id
// @api desc = update contact by Id
// @api method = DELETE
// @api endpoint = /api/contact/id
router.delete("/:id", isAuthenticated, deleteContactById);

// get user by Id
// @api desc = get contact by Id
// @api method = GET
// @api endpoint = /api/contact/id
router.get("/userid/:id", getContactbyUserId);

export default router;
