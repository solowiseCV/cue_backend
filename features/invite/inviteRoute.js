import express from 'express';
import { sendTripInvitation } from './inviteController.js';
import authenticate from '../../middlewares/auth.middle.js';


const router = express.Router();

router.post('/send-invitation',authenticate, sendTripInvitation);

export default router;
