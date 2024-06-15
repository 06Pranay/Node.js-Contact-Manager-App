import express from "express";
import { createContact, deleteContact, getContact, getContacts, updateContact } from "../controllers/contactController.js";
import validateToken from "../middleware/validateTokenHandler.js";
const router=express.Router();
  
router.get('/',validateToken,getContacts);
router.post('/',validateToken,createContact);
router.get('/:id',validateToken,getContact);

router.put('/:id',validateToken,updateContact);
router.delete('/:id',validateToken,deleteContact);

export default router;
