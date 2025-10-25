import { Router } from "express";
import homeController  from "./controllers/homeController.js";
import errorController from "./controllers/errorController.js";
import userController from "./controllers/userController.js";
import animalController from "./controllers/animalController.js";

const routes = Router();

routes.use(homeController);
routes.use('/users', userController);
routes.use('/animals', animalController);   
//todo add routes here


routes.use(errorController);

export default routes;