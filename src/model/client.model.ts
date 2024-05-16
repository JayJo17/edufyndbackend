import * as mongoose from 'mongoose'


export interface ClientDocument extends mongoose.Document{
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

})


export const Client = mongoose.model("Client", clientSchema)