const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {blogPosts} = require('./models');
//adding default data to blog
blogPosts.create('title', 'content', 'author', 'publishDate');
blogPosts.create('title2', 'content2', 'author2', 'publishDate2');

//returns the current blog posts
router.get('/blog-posts', (req, res) => {
  res.json(blogPosts.get());
});

router.post('/blog-posts', (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length;i++){
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = blogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(item);
});

router.delete('/blog-posts/:id', (req, res) => {
  blogPosts.delete(req.params.id);
  console.log(`Deleted shopping list item \`${req.params.ID}\``);
  res.status(204).end();
});

router.put('/blog-posts/:id', (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const fields = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (`Reqest path id (${req.params.id}) and new request id (${req.body.id}) must match `)
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post \`${req.params.id}\` `);
  const updatedItem = blogPosts.update({
    id: req.params.id,
    name: req.body.title,
    budget: req.body.content,
    author: req.body.author
  });
  res.status(204).end();
});

module.exports = router;