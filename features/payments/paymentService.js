import _ from 'lodash';
import Payment from '../payments/paymentModel.js';
import paystack from '../../utils/payment.js';
 const {initializePayment, verifyPayment} = paystack();


export default class PaymentService {
    async startPayment(data) {
        try {
            const form = _.pick(data, ['amount', 'email', 'full_name']);
            form.metadata = { full_name: form.full_name };
            form.amount *= 100; 

            const response = await initializePayment(form);
        

            return response;  
        } catch (error) {
            error.source = 'Start Payment Service';
            throw error;
        }
    }


    async createPayment(req) {
        const ref = req.reference;
        if (!ref) {
            throw { code: 400, msg: 'No reference passed in query!' };
        }

        try {
            const existingPayment = await Payment.findOne({ reference: ref });
        if (existingPayment) {
            throw new Error(`Payment with reference ${ref} already exists.`);
        }


            const response = await verifyPayment(ref);
        
            const { reference, amount, status } = response.data;
            const { email } = response.data.customer;
            const full_name = response.data.metadata.full_name;

            const newPayment = { reference, amount, email, full_name, status };
            const payment = await Payment.create(newPayment);

            return payment;
        } catch (error) {
            error.source = 'Create Payment Service';
            throw error;
        }
    }

    async paymentReceipt(body) {
        try {
            const reference = body.reference;
            const transaction = await Payment.findOne({ reference });

            if (!transaction) {
                throw { code: 404, msg: 'Payment not found!' };
            }

            return transaction;
        } catch (error) {
            error.source = 'Payment Receipt';
            throw error;
        }
    }
};
