import {Schema, model, Types } from 'mongoose';

const animalSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Animal name is required!'],
    },

    years:{
        type: Number,
        required: [true, 'Animal age is required!'],
    },

    kind: {
        type: String,
        required: [true, 'Animal kind is required!'],
    },

    imageUrl: {
        type: String,
        required: [true, 'Animal image is required!'],
    },

    need: {
        type: String,
        required: [true, 'Animal need is required!'],
    },

    location: {
        type: String,
        required: [true, 'Animal location is required!'],
    },

    description:{
        type: String,
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