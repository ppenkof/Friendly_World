import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { get } from "mongoose";
import { getErrorMessage } from "../utils/errorUtils.js";
import { animalService } from "../services/index.js";

const animalController = Router();

//dashboard
animalController.get('/dashboard', async (req, res) => {
    const animals = await animalService.getAll();

    res.render('animals/dashboard', { animals });
});

animalController.get('/create', (req, res) => {
    res.render('animals/create');
});
//Create
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
//Get Details
animalController.get('/:animalId/details', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const userId = req.user._id;

    const animal = await animalService.getOne(animalId);
    const isOwner = animal.owner.equals(userId);
   
    const donations = animal.donations.map(d=>d.email).join(', ');
    const isDonating = animal.donations.some(d=>d.equals(userId));

    res.render('animals/details', { animal, isOwner, donations, isDonating });
});
//Edit get
animalController.get('/:animalId/edit', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const animal = await animalService.getOne(animalId);

    if(!animal.owner.equals(req.user._id)){
        throw {
            message:'Cannot edit animal that you are not owner',
            statusCode:401
        };
    }
    
    res.render('animals/edit', { animal });
});
//Edit post
animalController.post('/:animalId/edit', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const animalData = req.body;
    const userId = req.user._id;
    const animal = await animalService.getOne(animalId);

    if(!animal.owner.equals(userId)){
        throw {
            message:'Cannot edit animal that you are not owner',
            statusCode:401
        };
    }

    try {
        await animalService.edit(animalId, animalData);
        res.redirect(`/animals/${animalId}/details`);
    } catch (error) {
        res.render('animals/edit', {
        animal: animalData,
        error: getErrorMessage(error),
        });
    }
   
});

//delete
animalController.get('/:animalId/delete', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const userId = req.user._id;

    await animalService.remove(animalId, userId);
    res.redirect('/animals/dashboard');
});

//donate
animalController.get('/:animalId/donations', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const userId = req.user._id;

    await animalService.donate(animalId, userId);
    res.redirect(`/animals/${animalId}/details`);
});

//search
animalController.get('/search', isAuth, async (req, res) => {
    const filter = req.query;
    const animals = await animalService.search(filter);
    console.log(filter);

    res.render('search', { animals, filter, pageTitle: 'Search animals' });
});

export default animalController;