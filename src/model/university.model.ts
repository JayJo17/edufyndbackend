import * as mongoose from 'mongoose'

export interface UniversityDocument extends mongoose.Document {
    universityName?: string; // University Name
    universityLogo?: string; // University Logo (Optional)
    country?: string; // Country
    campus?: { // Campus details with State and City
        state: string;
        city: string;
    }[];
    ranking?: string; // Ranking (Optional)
    averageFees?: number; // Average Fees
    popularCategories?: string[]; // Popular Categories (Multiple)
    admissionRequirement?: string; // Admission Requirement (Text box)
    offerTAT?: string; // Offer TAT
    commission?: {
        amount?: number; // Amount/Percentage
        method?: string; // Payment Method (Fixed/Percentage)
        eligibility?: string; // Eligibility for Commission
        currency?: string; // Currency
        paymentTAT?: string; // Payment TAT
        tax?: string; // Tax (Inclusive/Exclusive)
        commissionPaidOn?: string; // Commission paid on (Course Fees/Paid Fees)
    };
}


const universitySchema = new mongoose.Schema({
    universityName:{type: String,required:true},
    country:{ type:String, required: true},
    campus:[{state:{type:String,required:true},city:{type:String,required: true}}],
    ranking: {type: String,required: true},
    averageFees:{type:String},
    popularCategory: {type:String},
    admissionRequirement:{type:String},
    offerTAT:{type:String},
    commission:{
        paymentMethod:{type: String,},
        amount: { type: String },
        percentage: { type: String },
        eligibilityForCommission: { type: String },
        currency:{ type: String},
        paymentTAT: { type: String },
        tax:{type: String},
        commissionPaidOn:{type:String}
           }
})

export const University = mongoose.model("University", universitySchema)