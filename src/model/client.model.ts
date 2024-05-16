import * as mongoose from 'mongoose'


export interface ClientDocument extends mongoose.Document{
    _id?: any;
    clientID?: any;   // (Auto Generate)
typeOfClient?: string;    // - Institution, Financial Institution, Other Service Provider
businessName?: string;
businessMailID?: string;
businessContactNo?: string;
website?: string;
staff?: string;
name?: string;
contactNo?: string;
emailID?: string;
address?: string;    // Street Address, City, State, Postal Code, Country
gstn?: string;
status?: string;     // (Active/Inactive)
}


const clientSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    clientID: {type: String},
    typeOfClient: {type: String},  // - Institution, Financial Institution, Other Service Provider
    businessName: {type: String},
    businessMailID: {type: String},
    businessContactNo: {type: String},
    website: {type: String},
    staff: {type: String},
    name: {type: String},
    contactNo: {type: String},
    emailID: {type: String},
    address: {type: String},    // Street Address, City, State, Postal Code, Country
    gstn: {type: String},
    status: {type: String}     // (Active/Inactive)

})


export const Client = mongoose.model("Client", clientSchema)