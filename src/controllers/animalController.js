import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { get } from "mongoose";
import { getErrorMessage } from "../utils/errorUtils.js";
import { animalService } from "../services/index.js";

const animalController = Router();

animalController.get('/', async (req, res) => {
    const animals = await animalService.getAll();
console.log(animals);
    res.render('animals', { animals });
});

animalController.get('/create', (req, res) => {
    res.render('animals/create');
});

animalController.post('/create', isAuth, async (req, res) => {
    const animalData = req.body;
    const userId = req.user._id;
//console.log(animalData, userId);
    try {
        await animalService.create(animalData, userId)
        res.redirect('/');

    } catch (error) {

        res.render('animals/create', {
        error: getErrorMessage(error),
        animal: animalData,
        });

    }
});


export default animalController;