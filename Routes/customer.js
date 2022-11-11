import express, { Router } from 'express';
import { verifyJWT} from '../Middlewear/auth.js';

// Controllers
import { 
    addCustomer, customerLogIn, getSelectedCustomer, editCustomer, deleteCustomer, isLoggedIn
    //  getAllCustomers, deleteCustomer, editCustomer, getSelectedCustomer,  getAllCustomersCount, logIn, getSelectedCustomerByNic
} from '../controllers/customer.js';

const router = express.Router();

router.post('/add', addCustomer);
// router.get('/getAllCustomers', getAllCustomers);
router.get('/delete', verifyJWT, deleteCustomer);
router.post('/edit', verifyJWT, editCustomer);
router.get('/getSelectedCustomer', verifyJWT, getSelectedCustomer);
// router.get('/getSelectedCustomerByNic/:nic',getSelectedCustomerByNic);
// router.get('/getAllCustomersCount', getAllCustomersCount);
router.post('/logIn',customerLogIn);
router.post('/isLoggedIn',isLoggedIn);

export default router;