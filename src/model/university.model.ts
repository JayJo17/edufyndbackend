import * as mongoose from 'mongoose'

export interface UniversityDocument extends mongoose.Document {
    _id?: any;
    superAdminId?: any;
    universityName?: string; // University Name
    email?: string;
    universityLogo?: string; // University Logo (Optional)
    country?: string; // Country
    campus?: string;
    ranking?: string; // Ranking (Optional)
    averageFees?: number; // Average Fees
    popularCategories?: string[]; // Popular Categories (Multiple)
    admissionRequirement?: string; // Admission Requirement (Text box)
    offerTAT?: string; // Offer TAT
    commission?:any[];
}


const universitySchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    superAdminId: {type: mongoose.Types.ObjectId, ref: 'SuperAdmin'},
    universityName:{type: String},
    email:{type: String},
    country:{ type:String},
    campus:{ type: String},
    ranking: {type: String},
    averageFees:{type:String},
    popularCategory: {type:String},
    admissionRequirement:{type:String},
    offerTAT:{type:String},
    commission:[{
        paymentMethod:{type: String,},
        amount: { type: String },
        percentage: { type: String },
        eligibilityForCommission: { type: String },
        currency:{ type: String},
        paymentTAT: { type: String },
        tax:{type: String},
        commissionPaidOn:{type:String}
           }]
})

export const University = mongoose.model("University", universitySchema)