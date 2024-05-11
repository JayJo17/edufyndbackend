import {Router} from 'express';
import {createUniversity} from '../controller/university.controller';
import { checkQuery, checkRequestBodyParams} from '../middleware/Validators';
import { checkSession } from '../utils/tokenManager';

const router:Router=Router();


router.post('/create', 
        checkSession,
        checkQuery('_id'),
        createUniversity
);


export default router