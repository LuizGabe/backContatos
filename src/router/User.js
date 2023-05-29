import { Router } from "express";

import { 
  AllUserAndSearch, 
  UserById, 
  AddUser, 
  DeleteById,
} from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.get('/', AllUserAndSearch);

userRoute.get('/:id', UserById);

userRoute.post('/', AddUser);

userRoute.delete('/:id', DeleteById);

export { userRoute }