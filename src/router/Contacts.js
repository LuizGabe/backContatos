import { Router } from "express";

import { 
  AddContact, 
  AllContactsAndSearch, 
  DeleteContact,  
} from "../controllers/Contacts.controller.js";

const contactRoute = Router();

contactRoute.get('/', AllContactsAndSearch)

contactRoute.post('/', AddContact)

contactRoute.delete('/:id', DeleteContact)

export { contactRoute }