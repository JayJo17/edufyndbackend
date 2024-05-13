import {Router} from 'express';
import {getAllProgram, getSingleProgram, createProgram,updateProgramBySuperAdmin, deleteProgram} from '../controller/program.controller';
import { checkQuery, checkRequestBodyParams} from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';

const router:Router=Router();



router.get('/getallprogram', //get all program
    basicAuthUser,
     checkSession,
    getAllProgram
);


router.get('/getsingleprogram',
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    getSingleProgram,
);


router.post('/', 
        checkSession,
        checkQuery('_id'),
        createProgram
);


router.put('/', // update 
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    checkRequestBodyParams('_id'),
    updateProgramBySuperAdmin
);


router.delete('/', //delete program
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    deleteProgram
);


export default router