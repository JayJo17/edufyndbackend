import {Router} from 'express';
import { createAgent,createStudentByAgent } from '../controller/agent.controller';
import { checkQuery, checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';
const router:Router=Router();


router.post('/', 
         checkRequestBodyParams('email'),
         createAgent
);


router.put('/create-student/:id', //create student by agent
    // basicAuthUser,
    checkSession,
    // checkRequestBodyParams('_id'),
    createStudentByAgent  
);

export default router