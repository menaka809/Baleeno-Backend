import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

export const Customer = mongoose.model('customers', CustomerSchema);