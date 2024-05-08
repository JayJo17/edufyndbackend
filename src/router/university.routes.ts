import {Router} from 'express';
import {createUniversity} from '../controller/university.controller';
import { checkQuery, checkRequestBodyParams } from '../middleware/Validators';

const router:Router=Router();


router.post('/create', 
        //  checkRequestBodyParams('email'),
        createUniversity
);


export default router