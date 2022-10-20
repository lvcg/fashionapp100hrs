//Main Routes 
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, recipesController.getProfile);
router.get("/favorites", ensureAuth, recipesController.getFavorites);
//router.get("/feed", ensureAuth, recipesController.getFeed);

//Routes for user login/signup
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;