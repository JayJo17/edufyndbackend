import {Router} from 'express';
import {getAllUniversity, getSingleUniversity, saveUniversity,updateUniversityBySuperAdmin, deleteUniversity} from '../controller/university.controller';
import { checkQuery, checkRequestBodyParams} from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';

const router:Router=Router();



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


export default router