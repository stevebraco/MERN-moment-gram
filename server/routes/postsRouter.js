import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/postsController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// http://localhost:5000/posts
//all of the users no matter if they're logged in or not, they can see all the posts 
router.get("/", getPosts);
// for create a post we need to have your own id, we need to be logged in
router.post("/", auth, createPost);
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router;
