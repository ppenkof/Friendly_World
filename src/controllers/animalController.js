import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { get } from "mongoose";
import { getErrorMessage } from "../utils/errorUtils.js";

const animalController = Router();

animalController.get('/create', (req, res) => {
    res.render('animals/create');
});



export default animalController;