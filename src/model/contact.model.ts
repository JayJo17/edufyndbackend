import * as mongoose from 'mongoose'


export interface ContactDocument extends mongoose.Document{
    name?: string;
    email?: string;
    mobileNumber?: string;
    message?: string;
}


const contactSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    mobileNumber: {type: String},
    message: {type: String}
})

export const Contact = mongoose.model("Contact", contactSchema)