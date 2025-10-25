import {Schema, model, Types } from 'mongoose';

const animalSchema = new Schema({
    name: {
        type: string,
        required: [true, 'Animal name is required!'],
    },

    years:{
        type: number,
        required: [true, 'Animal age is required!'],
    },

    kind: {
        type: string,
        required: [true, 'Animal kind is required!'],
    },

    imageUrl: {
        type: string,
        required: [true, 'Animal image is required!'],
    },

    need: {
        type: string,
        required: [true, 'Animal need is required!'],
    },

    location: {
        type: string,
        required: [true, 'Animal location is required!'],
    },

    description:{
        type: string,
        required: [true, 'Animal description is required!'],
    },

    owner: {
        type: Types.ObjectId,
        ref: 'User',
    },

    donations:[{
        type: Types.ObjectId,
        ref: 'User',
    }] // an array of objects containing the user's ID


});

const Animal = model('Animal', animalSchema);

export default Animal;