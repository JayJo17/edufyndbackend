import { Student, StudentDocument } from '../model/student.model'
import { validationResult } from "express-validator";
import * as TokenManager from "../utils/tokenManager";
import { response, } from "../helper/commonResponseHandler";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { decrypt, encrypt } from "../helper/Encryption";

var activity = "Student";



export let getAllStudent = async (req, res, next) => {
    try {
        const data = await Student.find({ isDeleted: false });
        response(req, res, activity, 'Level-1', 'GetAll-Student', true, 200, data, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'GetAll-Student', false, 500, {}, errorMessage.internalServer, err.message);
    }
};


export let saveStudent = async (req, res, next) => {
    console.log("Register ")
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const student = await Student.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });

            if (!student) {
                req.body.password = await encrypt(req.body.password)
                const studentDetails: StudentDocument = req.body;
                // studentDetails..createdOn = new Date();

                const createData = new Student(studentDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["name"],
                    loginType: 'student'
                });
                const result = {}
                result['_id'] = insertData._id
                result['email'] = insertData.email;
                let finalResult = {};
                finalResult["loginType"] = 'student';
                finalResult["studentDetails"] = result;
                finalResult["token"] = token;
                response(req, res, activity, 'Level-2', 'Save-Student', true, 200, finalResult, clientError.success.registerSuccessfully);
            }
            else {
                response(req, res, activity, 'Level-3', 'Save-Student', true, 422, {}, 'Email already registered');
            }

        } catch (err: any) {

            response(req, res, activity, 'Level-3', 'Save-Student', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
    else {
        response(req, res, activity, 'Level-3', 'Save-User', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}




export let updateStudent = async (req, res, next) => {
    console.log("update jo")
    const errors = validationResult(req);
    console.log()
    if (errors.isEmpty()) {
        try {  

            const studentDetails: StudentDocument = req.body;
            const student = await Student.findOne({ $and: [{ isDeleted: false }, { _id: { $ne: studentDetails._id } }, { email: studentDetails.email }] });
            console.log("up",student)
            if (!student) {
                const updateStudent = new Student(studentDetails);
           
                const insertStudent = await updateStudent.updateOne({
                    $set: {
                        studentCode: studentDetails.studentCode,
                        source: studentDetails.source,
                        name: studentDetails.name,
                        passportNo: studentDetails.passportNo,
                        expiryDate:studentDetails.expiryDate,
                        dob: studentDetails.dob,
                        citizenship:studentDetails.citizenship,
                        gender:studentDetails.gender,
                        email:studentDetails.email,
                        primaryNumber:studentDetails.primaryNumber,
                        whatsAppNumber: studentDetails.whatsAppNumber,
                        highestQualification:studentDetails.highestQualification,
                        degreeName:studentDetails.degreeName,
                        academicYear: studentDetails.academicYear,
                        yearPassed: studentDetails.yearPassed,
                        institution:studentDetails.institution,
                        percentage: studentDetails.percentage,
                        doHaveAnyEnglishLanguageTest:studentDetails.doHaveAnyEnglishLanguageTest,
                        englishTestType:studentDetails.englishTestType,
                        testScore: studentDetails.testScore,
                        dateOfTest: studentDetails.dateOfTest,
                        desiredCountry:studentDetails.desiredCountry,
                        desiredUniversity:studentDetails.desiredUniversity, 
                        desiredCourse: studentDetails.desiredCourse, 
                        workExperience: studentDetails.workExperience,
                        anyVisaRejections: studentDetails.anyVisaRejections, 
                        doYouHaveTravelHistory: studentDetails.doYouHaveTravelHistory, 
                        finance: studentDetails.finance
                    }
                });
                const userData = await Student.findOne({ _id: studentDetails._id });
                response(req, res, activity, 'Level-3', 'Update-Student', true, 200, userData, clientError.success.updateSuccess);

            } else {
                response(req, res, activity, 'Level-3', 'Update-Student', false, 422, {}, errorMessage.fieldValidation, "Email Already Exists");
            }
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-Student', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Update-Student', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}





export let deleteStudent = async (req, res, next) => {
  
    try {
        let id = req.query._id;
        const student = await Student.findByIdAndDelete({ _id: id })
        // const notification = await Notification.deleteMany({ $or: [{ to: id }, { from: id }] })
        response(req, res, activity, 'Level-2', 'Delete-Student', true, 200, student, 'Successfully Remove User');
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Delete-Student', false, 500, {}, errorMessage.internalServer, err.message);
    }
};