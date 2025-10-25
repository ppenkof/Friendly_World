import Animal from "../models/Animal.js";

export function getAll() {
    return Animal.find().select({name: true, need: true, imageUrl: true, location:true}); //.select({title: true, category: true, imageUrl: true}) is not mandatory or required, just to return only these fields
}

export function getOne(animalId) {
    const found = Animal.findById(animalId).populate(['owner', 'donations']);
    return found;
}

export function getLatest(){
    return Animal.find()
    .sort({_id: -1}) // if timestaps:true in model, you can sort by createdAt: -1: .sort({createdAt: -1})
    .limit(3).select({name: true, need: true, imageUrl: true});
}

export function create(animalData, userId) {
    return Animal.create({
        ...animalData, 
        owner: userId
    });
}