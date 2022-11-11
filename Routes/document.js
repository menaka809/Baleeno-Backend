import express, { Router } from 'express';

// Controllers
import { 
    addDocument, getAllDocuments, deleteDocument, downloadDocument, updateDocument, getSelectedDocument
} from '../controllers/document.js';
import {upload} from '../Middlewear/multerUpload.js'

const router = express.Router();

router.post('/add', addDocument);
router.get('/getAllDocuments', getAllDocuments);
router.get('/delete/:id', deleteDocument);
router.get('/downloadDocument/:url', downloadDocument);
router.post('/edit/:id', updateDocument);
router.get('/getSelectedDocument/:id', getSelectedDocument);
// router.get('/getSelectedCustomerByNic/:nic',getSelectedCustomerByNic);
// router.get('/getAllCustomersCount', getAllCustomersCount);
// router.post('/logIn',customerLogIn);
// router.post('/isLoggedIn',isLoggedIn);

export default router;