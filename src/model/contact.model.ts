import * as mongoose from 'mongoose'


export interface ContactDocument extends mongoose.Document{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}


const contactSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    subject: {type: String},
    message: {type: String}
})

export const Contact = mongoose.model("Contact", contactSchema)