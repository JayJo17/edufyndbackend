import { Agent, AgentDocument} from '../model/agent.model'
import { Student, StudentDocument } from '../model/student.model'
import { validationResult } from "express-validator";
import * as TokenManager from "../utils/tokenManager";
import { response, } from "../helper/commonResponseHandler";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { decrypt, encrypt } from "../helper/Encryption";

var activity = "Agent";


export let createAgent = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const agent = await Agent.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
          
            if (!agent) {
                req.body.password = await encrypt(req.body.password)
                const agentDetails: AgentDocument = req.body;
                // studentDetails.createdOn = new Date();
          
                const createData = new Agent(agentDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["name"],
                    loginType: 'agent'
                });
                const result = {}
                result['_id'] = insertData._id
                result['email'] = insertData.email;
                let finalResult = {};
                finalResult["loginType"] = 'agent';
                finalResult["agentDetails"] = result;
                finalResult["token"] = token;
                response(req, res, activity, 'Level-2', 'Create-Agent', true, 200, finalResult, clientError.success.registerSuccessfully);
            }
            else {
                response(req, res, activity, 'Level-3', 'Create-Agent', true, 422, {}, 'Email already registered');
            }

        } catch (err: any) {
       
            response(req, res, activity, 'Level-3', 'Create-Agent', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
    else {
        response(req, res, activity, 'Level-3', 'Create-Agent', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}




// export let createStudentByAgent = async (req, res, next) => {

//     const errors = validationResult(req);
//     console.log()
//     if (errors.isEmpty()) {
//         try {  
//             const agentDetails: AgentDocument = req.body;
//             const studentDetails: StudentDocument = req.body;

//             const agent = await Agent.findOne({ $and: [{ isDeleted: false }, { _id: { $ne: agentDetails._id } }, { email: agentDetails.email }] });
          
//             if (!agent) {
//                 const createStudent = new Student(studentDetails);
           
//                 const insertStudent = await createStudent.updateOne({
//                     $set: {
//                         studentCode: studentDetails.studentCode,
//                         source: studentDetails.source,
//                         name: studentDetails.name,
//                         passportNo: studentDetails.passportNo,
//                         expiryDate:studentDetails.expiryDate,
//                         dob: studentDetails.dob,
//                         citizenship:studentDetails.citizenship,
//                         gender:studentDetails.gender,
//                         email:studentDetails.email,
//                         primaryNumber:studentDetails.primaryNumber,
//                         whatsAppNumber: studentDetails.whatsAppNumber,
//                         highestQualification:studentDetails.highestQualification,
//                         degreeName:studentDetails.degreeName,
//                         academicYear: studentDetails.academicYear,
//                         yearPassed: studentDetails.yearPassed,
//                         institution:studentDetails.institution,
//                         percentage: studentDetails.percentage,
//                         doHaveAnyEnglishLanguageTest:studentDetails.doHaveAnyEnglishLanguageTest,
//                         englishTestType:studentDetails.englishTestType,
//                         testScore: studentDetails.testScore,
//                         dateOfTest: studentDetails.dateOfTest,
//                         desiredCountry:studentDetails.desiredCountry,
//                         desiredUniversity:studentDetails.desiredUniversity, 
//                         desiredCourse: studentDetails.desiredCourse, 
//                         workExperience: studentDetails.workExperience,
//                         anyVisaRejections: studentDetails.anyVisaRejections, 
//                         doYouHaveTravelHistory: studentDetails.doYouHaveTravelHistory, 
//                         finance: studentDetails.finance
//                     }
//                 });
//                 const userData = await Agent.findOne({ _id: agentDetails._id });
//                 response(req, res, activity, 'Level-3', 'Create-Student -By-Agent', true, 200,insertStudent, clientError.success.updateSuccess);

//             } else {
//                 response(req, res, activity, 'Level-3', 'Create-Student -By-Agent', false, 422, {}, errorMessage.fieldValidation, "Email Already Exists");
//             }
//         } catch (err: any) {
//             response(req, res, activity, 'Level-3', 'Create-Student -By-Agent', false, 500, {}, errorMessage.internalServer, err.message);
//         }
//     } else {
//         response(req, res, activity, 'Level-3', 'Create-Student -By-Agent', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
//     }
// }



export let createStudentByAgent = async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        try {
                     const agentDetails: AgentDocument = req.body;
                     const studentDetails: StudentDocument = req.body;

            // Find the agent in the database
            const agent = await Agent.findOne({ email: agentDetails.email },{_id:agentDetails._id });
            console.log("agent email", agent)
            console.log(agentDetails._id)

            if (!agent) {
                // Agent does not exist, proceed to create a new student
                const createStudent = new Student({
                    ...studentDetails,
                    agentId: agentDetails._id // Add agent ID to student document
                });

                // Save the student to the database
                const insertStudent = await createStudent.save();

                // Respond with success message
                response(req, res, activity, 'Level-3', 'Create-Student-By-Agent', true, 200, {
                    student: insertStudent,
                    agentId: agentDetails._id,
                }, 'Student created successfully by agent.');
            } else {
                // Agent already exists, respond with error message
                response(req, res, activity, 'Level-3', 'Create-Student-By-Agent', false, 422, {}, 'Agent with the provided email already exists.');
            }
        } catch (err: any) {
            // Handle server error
        
            response(req, res, activity, 'Level-3', 'Create-Student-By-Agent', false, 500, {}, 'Internal server error.', err.message);
        }
    } else {
        // Request body validation failed, respond with error message
        response(req, res, activity, 'Level-3', 'Create-Student-By-Agent', false, 422, {}, 'Field validation error.', JSON.stringify(errors.mapped()));
    }
};