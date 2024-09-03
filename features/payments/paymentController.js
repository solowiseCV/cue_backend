import PaymentService from "./paymentService.js";

const paymentInstance = new PaymentService();

// Start a new payment process
export const startPayment = async (req, res) => {
    try {
        const response = await paymentInstance.startPayment(req.body);
        return res.status(201).json({
            status: "Success",
            message: "Payment initialized successfully",
            data: response
        });
    } catch (error) {
        console.error("Error in startPayment:", error);
        return res.status(500).json({
            status: "Failed",
            message: error.message || "An error occurred while starting the payment process"
        });
    }
};

// Create a payment record after verification
export const createPayment = async (req, res) => {
    try {
        const response = await paymentInstance.createPayment(req.query);
        return res.status(201).json({
            status: "Success",
            message: "Payment created successfully",
            data: response
        });
    } catch (error) {
        console.error("Error in createPayment:", error);
        if (error.code === 400) {
            return res.status(400).json({
                status: "Failed",
                message: error.message || "Bad request"
            });
        }
        return res.status(500).json({
            status: "Failed",
            message: error.message || "An error occurred while creating the payment"
        });
    }
};

// Retrieve payment receipt by reference
export const getPayment = async (req, res) => {
    try {
        const response = await paymentInstance.paymentReceipt(req.body);
        if (!response) {
            return res.status(404).json({
                status: "Failed",
                message: "Payment not found"
            });
        }
        return res.status(200).json({
            status: "Success",
            message: "Payment retrieved successfully",
            data: response
        });
    } catch (error) {
        console.error("Error in getPayment:", error);
        return res.status(500).json({
            status: "Failed",
            message: error.message || "An error occurred while retrieving the payment"
        });
    }
};
