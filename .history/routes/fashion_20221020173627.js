const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const recipesController = require("../controllers/fashion");
const { ensureAuth } = require("../middleware/auth");

//Post Routes
//Since linked from server js treat each path as:
//post/:id, post/createPost, post/likePost/:id, post/deletePost/:id
router.get("/:id", ensureAuth, fashionController.getFashion);

//Enables user to create post w/ cloudinary for media uploads
router.post("/createFashion", upload.single("file"), fashionController.createfashion);

router.post("/favoritestyle/:id", fashionController.favoritefashion);

//Enables user to like post. In controller, uses POST model to update likes by 1
router.put("/likeRecipe/:id", fashionController.likeRecipe);

//Enables user to delete post. In controller, uses POST model to delete post from MongoDB collection
router.delete("/deleteRecipe/:id", fashionController.deleteRecipe);

module.exports = router;