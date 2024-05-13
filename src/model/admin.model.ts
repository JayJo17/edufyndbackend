import * as mongoose from 'mongoose'


export interface AdminDocument extends mongoose.Document{
    name?: string;
    adminCode?: string;
    email?: string;
    mobileNumber?: string;
    password?: string;
    confirmPassword?: string;
    role?:string;
}


const adminSchema = new mongoose.Schema({
    name: {type: String},
    adminCode: {type: String},
    email: { type: String},
    mobileNumber: {type: String},
    password: {type: String},
    confirmPassword: {type: String},
    role: {type: String}
})

export const Admin = mongoose.model("Admin", adminSchema)
