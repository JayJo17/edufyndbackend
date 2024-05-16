import * as mongoose from 'mongoose'

export interface UniversityDocument extends mongoose.Document {
    _id?: any;
    superAdminId?: any;
    appliedStudentId?: any;
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
    paymentMethod?: string;
    amount?: string;
    percentage?: string;
    eligibilityForCommission?: string;
    currency?: string;
    paymentTAT?: string;
    tax?: string;
    commissionPaidOn?: string;
    founded?: string;
    institutionType?: string;
    applicationFees?: string;
    costOfLiving?: string;
    grossTuition?: string;
}


const universitySchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    superAdminId: { type: mongoose.Types.ObjectId, ref: 'SuperAdmin' },
    appliedStudentId: { type: mongoose.Types.ObjectId, ref: 'Student' },
    universityName: { type: String },
    universityLogo: { type: String },
    email: { type: String },
    country: { type: String },
    campus: [{ type: String }],
    ranking: { type: String },
    averageFees: { type: String },
    popularCategory: { type: String },
    admissionRequirement: { type: String },
    offerTAT: { type: String },

    paymentMethod: { type: String, },
    amount: { type: String },
    percentage: { type: String },
    eligibilityForCommission: { type: String },
    currency: { type: String },
    paymentTAT: { type: String },
    tax: { type: String },
    commissionPaidOn: { type: String },
    founded: { type: String },
    institutionType: { type: String },
    applicationFees: { type: String },
    costOfLiving: { type: String },
    grossTuition: { type: String }
})

export const University = mongoose.model("University", universitySchema)