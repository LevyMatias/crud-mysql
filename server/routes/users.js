import express from 'express';
import { addUsers, getUsers, updateUsers, deleteUser } from '../controllers/user.js';

const routes = express.Router();

routes.get("/", getUsers);
routes.post("/", addUsers);
routes.put("/:id", updateUsers);
routes.delete("/:id", deleteUser);
export default routes;