import { Router } from 'express';
const router: Router = Router();

import Student from './student.routes'
import Agent from './agent.routes'
import Login from './login.routes'
import University from './university.routes'
import Applicant from './applicant.routes'
import Contact from './contact.routes'



router.use('/student', Student)
router.use('/agent', Agent)
router.use('/login', Login)
router.use('/university', University)
router.use('/applicant', Applicant)
router.use('/contact', Contact)



export default router