import {Router} from 'express';
import {getAllUniversity, getSingleUniversity, saveUniversity,updateUniversityBySuperAdmin, deleteUniversity, getFilteredUniversity, getFilteredUniversityForAppliedStudent} from '../controller/university.controller';
import { checkQuery, checkRequestBodyParams} from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';


import multer = require('multer')
import path  = require('path')

const router:Router=Router();


// router.use(express.static(path.resolve('public/upload')))



const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './images')
    },
    filename: (req,file,cb)=>{
        cb(null, file.originalname)
    }
 })
 
 const upload = multer({
     storage: storage,
     limits: {fileSize: 1000000}
 })

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


router.post('/import', upload.single('file'),)

export default router