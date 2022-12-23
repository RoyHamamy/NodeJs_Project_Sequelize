const express = require("express");

// This will help us route through different pages:
const router = express.Router();

//Using the MVC method, We need to use the functions stored in the shopController folder:
const adminController = require("../controllers/admin");

router.get("/add-product", adminController.getAddProducts);

router.post("/add-product", adminController.postAddProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

router.get("/products", adminController.getProducts);

module.exports = router;