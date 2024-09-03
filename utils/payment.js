import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const paystack = () => {
    const MySecretKey = `Bearer ${process.env.PAYSTACK_SECRET_KEY}`;

    const initializePayment = async (form) => {
        try {
            const response = await axios.post(
                "https://api.paystack.co/transaction/initialize",
                form,
                {
                    headers: {
                        authorization: MySecretKey,
                        'content-type': 'application/json',
                        'cache-control': 'no-cache',
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    };

    const verifyPayment = async (ref) => {
        try {
            const response = await axios.get(
                `https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`,
                {
                    headers: {
                        authorization: MySecretKey,
                        'content-type': 'application/json',
                        'cache-control': 'no-cache',
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    };

    return { initializePayment, verifyPayment };
};

export default paystack;
