import * as mongoose from 'mongoose'

export interface StudentDocument extends mongoose.Document {
    _id?: any;
    studentCode?: string;
    source?: string[];
    name?: string;
    passportNo?: string;
    expiryDate?: Date;
    dob?: Date;
    citizenship?: string;
    gender?: any[];
    email?: string;
    contactNumber?: string;
    primaryNumber?: string;
    whatsAppNumber?: string; // Same as primary number if yes
    highestQualification?: string;
    degreeName?: string;
    academicYear?: string;
    yearPassed?: number;
    institution?: string;
    percentage?: number;
    doHaveAnyEnglishLanguageTest?: boolean;
    englishTestType?: any[]; // Only sEnglishLanguageTest is true
    testScore?: number; // Only sEnglishLanguageTest is true
    dateOfTest?: Date; // Only sEnglishLanguageTest is true
    country?: string[];
    desiredUniversity?: string;
    desiredCourse?: string;
    workExperience?: number; // In years
    hasVisaRejections?: boolean;
    anyVisaRejections?: string; // Only sVisaRejections is true
    hasTravelHistory?: boolean;
    doYouHaveTravelHistory?: string; // Only sTravelHistory is true
    finance?: any[];
    password?: string;
    confirmPassword?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedIn?: string;
    modifiedOn?: Date;
    modifiedBy?: string;

};

const studentSchema =new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    studentCode : {type: String},
    source: { type: String},
    name: {type: String},
    passportNo: {type: String},
    expiryDate: {type: String},
    dob: {type: String},
    citizenship : {type: String},
    gender : {type: String,},
    email: {type: String},
    mobileNumber: {type: String},
    whatsAppNumber: {type: String},
    highestQualification :{type: String},
    degreeName: {type: String, },
    academicYear: {type: String },
    yearPassed: {type: String },
    institution: {type: String },
    percentage: {type: String },
    doHaveAnyEnglishLanguageTest: {type: Boolean},
    englishTestType: {
        type: String,
        // enum: ['IELTS', 'PTE', 'TOEFL', 'Duolingo'],
        // required: function() {
        //   return !this.doHaveAnyEnglishLanguageTest === true;  // Only required if doHaveAnyEnglishLanguageTest is true
        // }
      },
      testScore: {
        type: String,
        required: function() {
            return this.doHaveAnyEnglishLanguageTest === true; // Test score is required only if doHaveAnyEnglishLanguageTest is true
        },
        validate: {
            validator: function(value) {
                return this.doHaveAnyEnglishLanguageTest || !value; // Test score should not be provided if doHaveAnyEnglishLanguageTest is false
            },
            message: 'Test score cannot be provided if doHaveAnyEnglishLanguageTest is false'
        }
    },
      dateOfTest: {type: String, required: function() {
        return this.doHaveAnyEnglishLanguageTest === true; 
      } },
      country:{type: String },
      desiredUniversity:{type: String}, //(Optional)
      desiredCourse:{type: String}, //(Optional)
      workExperience: {type: String},
      anyVisaRejections:{type: String}, // (Yes/No) If ‘Yes’ state reason (Text Box)
      doYouHaveTravelHistory: {type: Boolean}, // (Yes/No) If ‘Yes’ state reason (Text Box)
      finance:{type: String},
      password: {type: String},
      confirmPassword:  {type: String},
      twitter: {type: String},
      instagram: {type: String},
      facebook: {type: String},
      linkedIn: {type: String},
      modifiedOn: { type: Date },
      modifiedBy: { type: String }
})


export const Student = mongoose.model("Student", studentSchema)