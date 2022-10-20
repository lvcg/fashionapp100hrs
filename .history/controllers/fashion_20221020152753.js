const cloudinary = require("../middleware/cloudinary");
const Fashion = require("../models/Fashion");
const Favorite = require("../models/Favorite");

module.exports = {
  getProfile: async (req, res) => { 
    console.log(req.user)
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const recipes = await Fashion.find({ user: req.user.id });
      //Sending post data from mongodb and user data to ejs template
      res.render("profile.ejs", { fashionstyle: fashionstyles, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFavorites: async (req, res) => { 
    console.log(req.user)
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const Fashions = await Favorite.find({ user: req.user.id }).populate('fashionstyle');

      console.log(fashions)

      //Sending post data from mongodb and user data to ejs template
      res.render("favorites.ejs", { fashionstyle: fashionstyles, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFashionstyles: async (req, res) => {
    try {
      //id parameter comes from the post routes
      //router.get("/:id", ensureAuth, postsController.getPost);
      //http://localhost:2121/post/631a7f59a3e56acfc7da286f
      //id === 631a7f59a3e56acfc7da286f
      const recipe = await Recipe.findById(req.params.id);
      res.render("fashion.ejs", { fashionstyle: fashionstyles, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  createRecipe: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      //media is stored on cloudainary - the above request responds with url to media and the media id that you will need when deleting content 
      await Recipe.create({
        name: req.body.name,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        ingredients: req.body.fashionstyle,
        directions: req.body.addinfo,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  favoriteRecipe: async (req, res) => {
    try {
      //media is stored on cloudainary - the above request responds with url to media and the media id that you will need when deleting content 
      await Favorite.create({
        user: req.user.id,
        recipe: req.params.id,
      });
      console.log("Favorite has been added!");
      res.redirect(`/fashion/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeRecipe: async (req, res) => {
    try {
      await Recipe.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/fashion/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteRecipe: async (req, res) => {
    try {
      // Find post by id
      let recipe = await Recipe.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(recipe.cloudinaryId);
      // Delete post from db
      await Recipe.remove({ _id: req.params.id });
      console.log("Deleted Style");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};