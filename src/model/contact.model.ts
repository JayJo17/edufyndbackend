import * as mongoose from 'mongoose'


export interface ContactDoument extends mongoose.Document{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}


const contactSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String}
})