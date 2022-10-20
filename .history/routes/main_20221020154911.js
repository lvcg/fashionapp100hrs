//Main Routes 
router.get("/", homeController.getIndex
router.get("/profile", ensureAuth, fashionController.getProfile);
router.get("/favorites", ensureAuth, fashionController.getFavorites);
//router.get("/feed", ensureAuth, recipeController.getFeed);

//Routes for user login/signup
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;