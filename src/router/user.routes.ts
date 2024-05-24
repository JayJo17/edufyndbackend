import { Router } from 'express';
import { getAllUser, getSingleUser, createUser, updateUser, deleteUser } from '../controller/user.controller';
import { checkQuery, checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';

const router: Router = Router();

router.get('/getAllUser',                //get all user Details
    basicAuthUser,
    checkSession,
    getAllUser
);

router.get('/getSingleUser',
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    getSingleUser,
);


router.post('/',           // create User
    basicAuthUser,
    checkSession,
    // checkQuery('_id'),
    // checkRequestBodyParams('_id'),
    createUser
);


router.put('/',                    // update User Details
    basicAuthUser,
    checkSession,
    // checkQuery('_id'),
    checkRequestBodyParams('_id'),
    updateUser
);


router.delete('/',                  //delete User
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    deleteUser
);

 
export default router