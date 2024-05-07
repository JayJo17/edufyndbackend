import { Router } from 'express';
const router: Router = Router();

import Student from './student.routes'
import Agent from './agent.routes'
import Login from './login.routes'



router.use('/student', Student)
router.use('/agent', Agent)
router.use('/login', Login)



export default router