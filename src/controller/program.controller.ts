import { Program, ProgramDocument} from '../model/program.model'
import { SuperAdmin } from "../model/superAdmin.model";
import {validationResult} from 'express-validator'
import {response} from '../helper/commonResponseHandler'
import {clientError, errorMessage} from '../helper/ErrorMessage'


var activity = "Program"


export const getAllProgram = async(req, res, next)=>{
   try {
       const program = await Program.find({isDeleted: false})
       response(req, res, activity, 'Level-1', 'GetAll-Program', true, 200, program, clientError.success.fetchedSuccessfully )

   } catch (err: any) {
       response(req, res, activity, 'Level-3', 'GetAll-Program', false, 500, {},  errorMessage.internalServer, err.message)
    
   }
}


export const getSingleProgram = async (req, res, next)=>{
    try {
        const program = await Program.findOne({_id: req.query._id})
        response(req, res, activity, 'Level-1', 'GetSingle-Program', true, 200, program, clientError.success.fetchedSuccessfully)
       
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'GetSingle-Program', false, 500, {}, errorMessage.internalServer, err.message)
        
    }
}



export let createProgram = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
           
            const superadmin = await SuperAdmin.findOne({ _id: req.query._id });
          
            if (superadmin) {
                const programDetails: ProgramDocument = req.body;
          
                const createData = new Program(programDetails);
                let insertData = await createData.save();
             
                response(req, res, activity, 'Level-2', 'Create-Program-By-Superadmin', true, 200, insertData, clientError.success.registerSuccessfully);
            }
            else {
                response(req, res, activity, 'Level-3', 'Create-Program', true, 422, {}, 'Not Authorized to create Program');
            }

        } catch (err: any) {
       
            response(req, res, activity, 'Level-3', 'Create-Program', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
    else {
        response(req, res, activity, 'Level-3', 'Create-Program', false, 422, {}, errorMessage.notAuthorized, JSON.stringify(errors.mapped()));
    }
}





export let updateProgramBySuperAdmin = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try{
            const superadmin = await SuperAdmin.findOne({ _id: req.query._id });
         
            if (superadmin) {
                const programDetails : ProgramDocument = req.body;
                const updateData = await Program.findOneAndUpdate({ _id: req.body._id }, {
                    $set: {  
                        university: programDetails.university,
                        courseType: programDetails.courseType,
                        
                        englishlanguageTest: programDetails.englishlanguageTest,
                       
                        universityInterview: programDetails.universityInterview,
                        GRE_GMAT_requirement: programDetails. GRE_GMAT_requirement,
                   
                        academicRequirement: programDetails.academicRequirement,
                        commission: programDetails.commission
                    },
                    $addToSet: {
                        programTitle:programDetails.programTitle

                    }
                })
                response(req, res, activity, 'Level-2', 'Update-Program', true, 200, updateData, clientError.success.updateSuccess);
            }
            else {
                response(req, res, activity, 'Level-3', 'Update-Program', true, 422, {}, 'Not Authorized to update Program');
            }    
            
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-Program', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
    else {
        response(req, res, activity, 'Level-3', 'Update-Program', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}



export let deleteProgram = async (req, res, next) => {
  
    try {
        const superadmin = await SuperAdmin.findOne({ _id: req.query.sup });
     
        if(superadmin){
            let id = req.query._id;
      
            const program = await Program.findByIdAndDelete({ _id: id })
           
            response(req, res, activity, 'Level-2', 'Delete-Program', true, 200, program, 'Successfully Remove Program');
        }
        else {
            response(req, res, activity, 'Level-3', 'Delete-Program', true, 422, {}, 'Not Authorized to Delete Program');
        }
      
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Delete-Program', false, 500, {}, errorMessage.internalServer, err.message);
    }
};
