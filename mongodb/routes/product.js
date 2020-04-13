const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/product');
const checkAuth = require('../middleware/check-auth');


//get all products added
router.get("/", ProductController.product_get_all);
//add new product to database
router.post("/", checkAuth ,ProductController.product_create_product  );
//get a single product
router.get("/:productId", ProductController.product_get_product);
//update a product
router.patch("/:productId",ProductController.product_update_product );
//delete a product
router.delete("/:productId",ProductController.product_delete_product);



module.exports = router;