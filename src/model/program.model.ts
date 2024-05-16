import * as mongoose from 'mongoose'


export interface ProgramDocument extends mongoose.Document {
    superAdminId?: any;
    appliedStudentId?: any;
    universityId?: any;
    university?: string;
    courseType?: string;
    programTitle?: any[];
    englishlanguageTest?: string;
    textBox?: string;
    universityInterview?: string;
    GRE_GMAT_requirement?: string;
    score?: string;
    academicRequirement?: string;
    commission?: string;

}

const programSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    superAdminId: { type: mongoose.Types.ObjectId, ref: 'SuperAdmin' },
    appliedStudentId: { type: mongoose.Types.ObjectId, ref: 'Student' },
    universityId: { type: mongoose.Types.ObjectId, ref: 'University' },
    university: { type: String }, // (List Universities added)
    courseType: { type: String },  // (List) Add, Delete, View, Edit
    applicationFee: { type: String },
    currency: { type: String },
    amount: { type: String },
    discountedValue: { type: String },
    campus: { type: String },  //(Fetch campus details from ‘UNIVERSITY’ based on the university selected) / (Multiple Add) 
    courseFee: { type: String },  // (To be added for each campus)
    intake: { type: String },
    Duration: { type: String }, // (Month & Year in numbers like 1 - 12),
    englishlanguageTest: { type: String },   // (ELT) requirement – Yes/No (Text Box)
    textBox: { type: String },

    universityInterview : { type: String },   // – Yes/No

    GRE_GMAT_requirement : { type: String },  //(Yes/No) If yes mention score
    score: { type: String },

    academicRequirement : { type: String },     //(Text Box)
    commission: { type: String }           // (Edit only for the program)
 
})

export const Program = mongoose.model("Program", programSchema)

