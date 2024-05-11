import * as mongoose from 'mongoose'


export interface AdminDocument extends mongoose.Document{
    name?: string;
    email?: string;
    mobileNumber?: string;
    password?: string;
    confirmPassword?: string;
}


const adminSchema = new mongoose.Schema({
    name: {type: String},
    email: { type: String},
    mobileNumber: {type: String},
    password: {type: String},
    confirmPassword: {type: String}
})

export const Admin = mongoose.model("Admin", adminSchema)
export default Admin