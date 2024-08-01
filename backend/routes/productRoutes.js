const express = require('express');
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/get", getProducts);
router.post('/create', upload.array('files', 10), protect, createProduct); 
router.put("/:id", upload.array('files', 10), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
