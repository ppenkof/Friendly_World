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

export function edit(animalId, animalData){
    const found = Animal.findByIdAndUpdate(animalId, animalData, {runValidators: true});
    return found;
}

export async function remove(animalId, userId) {
    const animal = await Animal.findById(animalId);

    if(!animal.owner.equals(userId)){
        throw new Error('You are not the owner of this animal post!');
    }
    
    return Animal.findByIdAndDelete(animalId);
}

export async function donate(animalId, userId) {
    // const animal = await animal.findById(animalId);
    // animal.donationsers.push(userId);

    // return animal.save();

    //return animal.findByIdAndUpdate(animalId, {$push: {donations: userId}}); //This is not by requirements
    const animal = await Animal.findById(animalId);

    if(animal.owner.equals(userId)){
        throw new Error('Owner cannot donate animal!');
    }

    animal.donations.push(userId);
    return animal.save(); 
}

export  function search(filter) {
    const query = {};

    if(filter.location){
        query.location = {$regex: filter.location, $options: 'i'};
    }

    return Animal.find(query);//.select({name: true, need: true, imageUrl: true, location:true});

}