const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const { storage } = require("../firebase");


const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category , userId } = req.body;
  console.log(req.body)

  try {
    let files = req.files;

    let filesUpload = [];
    if (files) {
      const filesArray = Array.isArray(files) ? files : [files];

      await Promise.all(
        filesArray.map(async (file) => {
          let metadata = {
            contentType: file.mimetype,
          };
          const storageRef = ref(
            storage,
            "productImages/" + Date.now() + file.originalname
          );
          const uploadTask = uploadBytesResumable(
            storageRef,
            file.buffer,
            metadata
          );

          await new Promise((resolve, reject) => {
            uploadTask.on("state_changed", null, reject, async () => {
              try {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                filesUpload.push(downloadURL);
                resolve();
              } catch (error) {
                reject(error);
              }
            });
          });
        })
      );
    }

    const product = new Product({
      userId,
      name,
      price,
      description,
      images: filesUpload,
      category,
    });

    const createdProduct = await product.save();
    res.status(200).json(createdProduct);
  } catch (error) {
    res.status(401);
    throw new Error('Something went wrong');
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category , userId, countInStock } = req.body;
console.log(req.body)
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.userId = userId || product.userId
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;

      let files = req.files;
      let filesUpload = [];

      if (files) {
        const filesArray = Array.isArray(files) ? files : [files];

        await Promise.all(
          filesArray.map(async (file) => {
            let metadata = {
              contentType: file.mimetype,
            };
            const storageRef = ref(
              storage,
              "productImages/" + Date.now() + file.originalname
            );
            const uploadTask = uploadBytesResumable(
              storageRef,
              file.buffer,
              metadata
            );

            await new Promise((resolve, reject) => {
              uploadTask.on("state_changed", null, reject, async () => {
                try {
                  const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                  );
                  filesUpload.push(downloadURL);
                  resolve();
                } catch (error) {
                  reject(error);
                }
              });
            });
          })
        );
      }

      if (filesUpload.length > 0) {
        product.images = filesUpload;
      }

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(401);
    throw new Error('Something went wrong');
  }
});


const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};