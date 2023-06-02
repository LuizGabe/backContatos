import { Router } from "express";

import { 
  AllUsersAndSearch, 
  UserById, 
  AddUser, 
  DeleteById,
} from "../controllers/User.controller.js";

const userRoute = Router();

userRoute.get('/', AllUsersAndSearch);

userRoute.get('/:id', UserById);

userRoute.post('/', AddUser);

userRoute.delete('/:id', DeleteById);

export { userRoute }