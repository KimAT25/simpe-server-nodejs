import Router from 'express';
import { body, oneOf } from 'express-validator';
import { handleInputError } from './modules/midlewares';
import {
    getProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} from './handlers/product'
import {
    getUpdates,
    getOneUpdate,
    createUpdate,
    updateUpdate,
    deleteUpdate
} from './handlers/update';

const router = Router();

// Proudct

router.get('/product', getProducts);
router.get('/product/:id' ,getOneProduct);
router.put('/product/:id', body('name').isString(), handleInputError, updateProduct);
router.post('/product', body('name').isString(), handleInputError, createProduct);
router.delete('/product/:id', deleteProduct);

// Update

router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);

router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').optional().isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']),
    body('version').optional(),
    updateUpdate
);

router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate
);
router.delete('/update/:id', deleteUpdate);

// Update

router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    () => {}
);
router.post('/updatepoint',
    body('name').optional().isString(),
    body('description').optional().isString(),
    body('updatedId').exists().isString(),
    () => {});
router.delete('/updatepoint/:id', () => {});

export default router;