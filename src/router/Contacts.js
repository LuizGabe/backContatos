import { Router } from "express";

import { 
  AddContact, 
  AllContacts, 
  DeleteContact, 
  SearchContacts 
} from "../controllers/Contacts.controller.js";

const contactRoute = Router();

contactRoute.get('/', AllContacts)

contactRoute.get('/search/:busca', SearchContacts)

contactRoute.post('/', AddContact)

contactRoute.delete('/:id', DeleteContact)

export { contactRoute }