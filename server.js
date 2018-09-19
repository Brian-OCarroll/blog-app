const express = require('express');
const morgan = require('morgan');

const app = express();

const blogPostsRouter = require('./blogPostsRouter');
//logs http request info
app.use(morgan('common'));

app.use(express.json());

app.get('/blog-posts', blogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`our app is listening on port ${process.env.PORT || 8080}`);
})