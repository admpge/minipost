const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

// POST (create data)
router.post('/', async (req, res) => {
  const postData = new Post({
    user: req.body.user,
    title: req.body.title,
    text: req.body.text,
    hashtag: req.body.hashtag,
    location: req.body.location,
    url: req.body.url,
  });

  try {
    const postToSave = await postData.save();
    res.send(postData);
  } catch (err) {
    res.send({ message: err });
  }
});

// GET (ALL)
router.get('/', async (req, res) => {
  try {
    const getPosts = await Post.find();
    res.send(getPosts);
  } catch (err) {
    res.send({ message: err });
  }
});

// GET (SPECIFIC)
router.get('/:postId', async (req, res) => {
  try {
    const getPost = await Post.findById(req.params.postId);
    res.send(getPost);
  } catch (err) {
    res.send({ message: err });
  }
});

// PATCH
router.patch('/:postId', async (req, res) => {
  const postData = new Post({
    user: req.body.user,
    title: req.body.title,
    text: req.body.text,
    hashtag: req.body.hashtag,
    location: req.body.location,
    url: req.body.url,
  });
  try {
    const updatePostById = await Post.updateOne(
      { _id: req.params.postId },
      {
        $set: {
          user: req.body.user,
          title: req.body.title,
          text: req.body.text,
          hashtag: req.body.hashtag,
          location: req.body.location,
          url: req.body.url,
        },
      }
    );
    res.send(updatePostById);
  } catch (err) {
    res.send({ message: err });
  }
});

// DELETE
router.delete('/:postId', async (req, res) => {
  try {
    const deletePostById = await Post.deleteOne({ _id: req.params.postId });
    res.send(deletePostById);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
