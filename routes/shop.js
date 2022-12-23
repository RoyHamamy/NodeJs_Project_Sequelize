const express = require("express");

// This will help us route through different pages:
const router = express.Router();

//Using the MVC method, We need to use the functions stored in the shopController folder:
const shopController = require("../controllers/shop");

router.get("/products/:productId", shopController.getProduct);

router.get("/orders", shopController.getOrders);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.get("/favorites", shopController.getFavorites);

router.get("/", shopController.getProducts);

router.get("/favorites", shopController.getFavorites);

router.post("/favorites", shopController.postNewFavorite);

router.post("/create-order", shopController.postOrder);

router.get("/orders", shopController.getOrders);


module.exports = router;
