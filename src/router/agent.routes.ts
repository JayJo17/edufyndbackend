import {Router} from 'express';
import { saveAgent } from '../controller/agent.controller';
const router:Router=Router();




router.post('/save', saveAgent)


export default router