import expressAsyncHandler from "express-async-handler";
//import contactModel from "../models/contactModel.js";
import Contact from "../models/contactModel.js";

//@desc Get all contacts
//@routes GET/api/contacts
//@access public
 const getContacts=expressAsyncHandler(async(req,res)=>
    {
        const contacts= await Contact.find({user_id:req.user.id});
        res.status(200).json(contacts);
    });
//@desc Create New  contacts
//@routes POST/api/contacts
//@access public
  const createContact=expressAsyncHandler(async(req,res)=>
    {    
        console.log(req.body);
        const {name,email,phone}=req.body;
        if(!name || !email || !phone)
            {
                res.status(400)
                throw new Error("All fields are mandatory!");
            }
            const contact=await Contact.create(
                {
                    name,
                    email,
                    phone,
                    user_id:req.user_id
                    //user_id:req.user.id
                }
            );
        res.status(201).json(contact);
    });
//@desc Get contact
//@routes GET/api/contacts:id
//@access public
  const getContact=expressAsyncHandler(async(req,res)=>
    {
        const contact=await Contact.findById(req.params.id);
        if(!contact)
            {
               res.status(404);
               throw new Error("Contact not found");
            }

        res.json(contact);
    });
//@desc Update  contacts
//@routes PUT/api/contacts/:id
//@access public
  const updateContact=expressAsyncHandler(async(req,res)=>
    {
        const contact=await Contact.findById(req.params.id);
        if(!contact)
            {
                res.status(404);
                throw new Error("Contact not found");
            }
        if(contact.user_id.toString() !== req.user.id)
            {
                res.status(403);
                throw new Error("User don't have permission to update other user contacts");
            }    
            const updateContact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(updateContact);
    });
//@desc Delete  contacts
//@routes delete/api/contacts/:id
//@access public
  const deleteContact= expressAsyncHandler(async(req,res)=>
    {
        const contact=await Contact.findById(req.params.id);
        if(!contact)
            {
                res.status(404);
                throw new Error("Contact not found");
            }
        if(contact.user_id.toString() !== req.user_id)
            {
                res.status(403);
                throw new Error("User dont't have permission to update other user contacts");
            }  
            await Contact.deleteOne({_id:req.params.id});
        res.status(200).json(contact);
    });
export {getContacts,createContact,getContact,updateContact,deleteContact}