import { Router } from 'express';
import { getAllUniversity, getSingleUniversity, saveUniversity, updateUniversityBySuperAdmin, deleteUniversity, getFilteredUniversity, getFilteredUniversityForAppliedStudent, csvToJson } from '../controller/university.controller';
import { checkQuery, checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';
import upload from '../utils/fileUploaded';
const router: Router = Router();


router.get('/getalluniversity', //get all university
    basicAuthUser,
    checkSession,
    getAllUniversity
);


router.get('/getsingleuniversity',
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    getSingleUniversity,
);


router.post('/',
    basicAuthUser,
    checkSession,
    // checkQuery('_id'),
    // checkRequestBodyParams('_id'),
    // upload.single('universityLogo'),
    saveUniversity
);


router.put('/', // update 
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    checkRequestBodyParams('_id'),
    updateUniversityBySuperAdmin
);


router.delete('/', //delete university
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    deleteUniversity
);

router.post('/import',      // CSV File to json and Store into Database
    upload.single('file'),
    csvToJson
);

router.put('/getfilteruniversity',
    basicAuthUser,
    checkSession,
    getFilteredUniversity,
);



router.put('/appliedstudent',    // Filter for Applied Student of University
    basicAuthUser,
    checkSession,
    getFilteredUniversityForAppliedStudent,
);




export default router