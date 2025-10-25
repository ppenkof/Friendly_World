import { Router } from "express";
import { animalService } from "../services/index.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const latestAnimals = await animalService.getLatest();

    res.render('home', {animals: latestAnimals});//, { pageTitle: 'Home Page' }
});

export default homeController;