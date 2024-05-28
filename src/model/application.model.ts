import * as mongoose from 'mongoose'


export interface ApplicantDocument extends mongoose.Document {
    applicationCode?: string //(Student Code / Number Series)
    studentName?: string,        //(Auto Fetch from Students)
    dob?: Date,             //(Auto Fetch from Students)
    passportNo?: string,       // (Auto Fetch from Students)
    email?: string,         //(Auto Fetch from Students)
    primaryNumber?: string,
    whatsAppNumber?: string,
    selectCourse?: any,
    anyVisaRejections?: string,  // (Auto Fetch from Students)
    feesPaid?: string,
    assignTo?: string
}


const applicantSchema = new mongoose.Schema({
    applicationCode: {type: String},    
    studentID: { type: mongoose.Types.ObjectId, ref: 'Student' }, 
    universityID : { type: mongoose.Types.ObjectId, ref: 'University' },       
    dob:{ type: Date, ref: 'Student' },              
    passportNo: { type: String, ref: 'Student' },      
    email:{ type: String, ref: 'Student' },       
    primaryNumber: { type: String, ref: 'Student' }, 
    whatsAppNumber: { type: String, ref: 'Student' }, 
    selectCourse: {
        inTake: {type: String},
        universityID : { type: mongoose.Types.ObjectId, ref: 'University' }, 
    },
    anyVisaRejections: { type: String, ref: 'Student' }, 
    feesPaid: {type: String},
    //  assignTo?: string
})

export const Applicant = mongoose.model("Applicant", applicantSchema)