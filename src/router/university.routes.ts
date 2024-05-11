import {Router} from 'express';
import {createUniversity,updateUniversityBySuperAdmin} from '../controller/university.controller';
import { checkQuery, checkRequestBodyParams} from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';

const router:Router=Router();


router.post('/create', 
        checkSession,
        checkQuery('_id'),
        createUniversity
);


router.put('/update', // update 
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    checkRequestBodyParams('_id'),
    updateUniversityBySuperAdmin
);


export default router