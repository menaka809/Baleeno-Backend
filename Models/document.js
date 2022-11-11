import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
    },
    canEdit: {
        type: Boolean,
        required: true,
    },
    lastModifiedBy: {
        type: String,
        required: true,
    },
    lastModifiedDate: {
        type: Date,
        required: true,
    },
    des: {
        type: String,
    },
    note: {
        type: String,
    },
    link: {
        type: String,
        required: true,
    }
});

export const Document = mongoose.model('documents', DocumentSchema);