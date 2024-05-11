import * as mongoose from 'mongoose'

export interface UniversityDocument extends mongoose.Document {
    universityName?: string; // University Name
    universityLogo?: string; // University Logo (Optional)
    country?: string; // Country
    campus?: any[];
    ranking?: string; // Ranking (Optional)
    averageFees?: number; // Average Fees
    popularCategories?: string[]; // Popular Categories (Multiple)
    admissionRequirement?: string; // Admission Requirement (Text box)
    offerTAT?: string; // Offer TAT
    commission?:any[];
}


const universitySchema = new mongoose.Schema({
    universityName:{type: String},
    country:{ type:String},
    campus:[{
        state:{type:String},
        city:{type:String}
    }],
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