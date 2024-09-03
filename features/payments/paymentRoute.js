import express from "express";

import {startPayment, createPayment, getPayment} from './paymentController.js';

const paymentRoute = express.Router();

paymentRoute.post('/startPayment', startPayment);
paymentRoute.post('/createPayment', createPayment);
paymentRoute.get('/paymentDetails', getPayment);
export default paymentRoute;