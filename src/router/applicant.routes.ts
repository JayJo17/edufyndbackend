import {Router} from 'express';
import { createApplicant } from '../controller/applicant.controller';
import { checkQuery, checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';
const router:Router=Router();


router.post('/save', 
         checkRequestBodyParams('email'),
         createApplicant
);


export default router