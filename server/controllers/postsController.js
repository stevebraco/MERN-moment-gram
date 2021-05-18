import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find(); // Récupérer des données dans la collection

    res.status(200).json(postMessages); // 200 OK // Envoie une réponse JSON.
  } catch (error) {
    res.status(404).json({ message: error.message }); // 404 error
  }
};

export const createPost = async (req, res) => {
  const post = req.body; // corps de la requête
  console.log('req', req)
  const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString() });


  try {
    await newPost.save();
    res.status(201).json(newPost); // 201 creation
  } catch (error) {
    res.status(409).json({ message: error.message }); // 409 conflict
  }
};

export const updatePost = async (req, res) => {
  console.log('ID',req.params.id);
  //1 Or const id = req.params.id
  //2 Or const {id: _id} = req.params
  const { id } = req.params; // Récupération de l'id
  const { title, message, creator, selectedFile, tags } = req.body;
  //2 Or const post = req.body

  //We need to make sure that the id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id ${id}`);
    //2 Or if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  
  // 2 Or const updatedPost = await PostMessage.findByIdAndUpdate(_id, {... post, _id}, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  //We need to make sure that the id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id ${id}`);

    await PostMessage.findByIdAndRemove(id);
    console.log('Delete');

    res.json({ message: 'Post deleted successfully' })


}

export const likePost = async (req, res) => {
  const { id } = req.params;
  // If not id not authenticated
  if(!req.userId) return res.json({ message : 'unauthenticated' })

  //We need to make sure that the id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id ${id}`);

    const post = await PostMessage.findById(id); // find the post

    const index = post.likes.findIndex((id) => id === String(req.userId));
    // if id is not in the find 
    if(index === -1) {
      //like the post
      post.likes.push(req.userId);
    } else {
      // dislike a post
      post.likes = post.likes.filter((id) => id ==! String(req.userId))
    }

    // The second parameter (post.likeCount) we want to pass in our updates, thats goind to be an object,
    // We want to increment the like count so to set likeCount to be equal to post.likeCount
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new : true}) // updated post

    res.json(updatedPost);
}
