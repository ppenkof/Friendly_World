import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { get } from "mongoose";
import { getErrorMessage } from "../utils/errorUtils.js";
import { animalService } from "../services/index.js";

const animalController = Router();

animalController.get('/dashboard', async (req, res) => {
    const animals = await animalService.getAll();

    res.render('animals/dashboard', { animals });
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
        res.redirect('/animals/dashboard');

    } catch (error) {

        res.render('animals/create', {
        error: getErrorMessage(error),
        animal: animalData,
        });

    }
});

animalController.get('/:animalId/details', async (req, res) => {
    const animalId = req.params.animalId;
    const userId = req.user._id;
    // console.log(userId);
    // console.log(req.user);

    const animal = await animalService.getOne(animalId);
    const isOwner = animal.owner.equals(userId);
    // console.log(isOwner);
    const donations = animal.donations.map(d=>d.email).join(', ');
    const isDonating = animal.donations.some(d=>d.equals(userId));

    res.render('animals/details', { animal, isOwner, donations, isDonating });
});



export default animalController;