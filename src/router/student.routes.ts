import {Router} from 'express';
import { getAllStudent, saveStudent,updateStudent, deleteStudent} from '../controller/student.controller';
import { checkQuery, checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';
const router:Router=Router();



router.get('/', //get all users
    basicAuthUser,
     checkSession,
    getAllStudent
);

router.post('/save', 
         checkRequestBodyParams('email'),
        saveStudent
);

router.put('/update/:id', //update user
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('_id'),
    updateStudent  
);


router.delete('/delete', //delete user
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    deleteStudent
);


export default router