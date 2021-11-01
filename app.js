const express = require('express');
const app = express();
const port = process.env.PORT || 3000
app.use(express.json());
const fileSystem = require('fs');

/* I defined an array with object elements to store blog details. */
const data = [
  {
    id: 1,
    title: "title 1",
    body: "this is post 1"
  },
  {
    id: 2,
    title: "title 2",
    body: "this is post 2"
  }
];

/* 
  * I defined a GET route that sends a message indicating to the client they are in the root of the blog.
  * Example test URL: http://localhost:3000  */
app.get('/', (req, res) => {
  return res.send('Root of blog works');
});

/* 
  * I defined a GET route that returns all blogs or specific blogs as per the client's query.
  * The top level if condition is executed when the client wants a specific blog. Hence the blog with the id is looked for with the find array method applied on the data array containing all blogs, the result is then stored on the blog variable.
  * The second nested if condition is used for validation purposes. This only occurs only if a blog with that id is not found. 
  Example test URLS: 
  1. http://localhost:3000/api/blogs
  2. http://localhost:3000/api/blogs?id=2 */
app.get('/api/blogs', (req, res) => {
  if(req.query.id){
    const blog = data.find(blog => blog.id === parseInt(req.query.id));
    if(!blog){
      return res.status(404).send("That blog doesn't exist");
    }
    // This LOC returns the blog with that id.
    return res.send(blog);
  }
  // This LOC returns all the blogs
  return res.json(data);
});

/* 
  * I defined a POST route that enables creation of a new blog by the client.
  * I destructured the keys in the request body and stored them in the respective variables.
  * I used an if condition that returns an error if a title or body is not passed by the client when creating the blog.
  * If the blog has required fields the blog is added to the data array using push.
  * A success message is returned after the blog has been added to the data array.
  * Example test URL: http://localhost:3000/api/blogs/new
*/
app.post('/api/blogs/new', (req, res) => {
  const {title, body} = req.body;
  if(!title || !body){
    return res.status(400).send('Both the title and the body are required.')
  }
  data.push({
    id: data.length + 1,
    title,
    body
  });
  return res.status(201).send('post has been created.');
});

/* 
  * I defined the PUT method that updates a specific blog.
  * The blog with the id is looked for with the find array method applied on the data array containing all blogs, the blog is then stored on the blog variable.
  * We then access the body key and store the body in the request body in this key.
  * I then return a success message.
  * Example test URL: http://localhost:3000/api/blog?id=2
*/
app.put('/api/blog', (req, res) => {
  const blog = data.find(blog => blog.id === parseInt(req.query.id));
  blog.body = req.body.body;
  return res.send(`Blog ${blog.id} updated.`);
});

/* 
  * I defined the DELETE method that deletes a specific blog.
  * The blog with the id is looked for with the find array method applied on the data array containing all blogs, the blog is then stored on the blog variable.
  * I then use the splice array method to delete from the data array the object in the index similar to that of the blog variable.
  * I then return a success message.
  * Example test URL: http://localhost:3000/api/blog?id=2
*/
app.delete('/api/blog', (req, res) => {
  const blog = data.find(blog => blog.id === parseInt(req.query.id));
  data.splice(data.indexOf(blog), 1);
  return res.send(`Blog ${blog.id} deleted`)
});

app.listen(port, () => {
  console.log(`App server is started at port ${port}`)
});

/* 
  * I first imported the express module.
  * I then stored the called express function in a variable app.
  * I stored the port number from the environment variable or port 3000 in a variable called port.
  * I executed the .json() middleware function on the express app function to enable sending of data in JSON format.
  * I imported the fileSystem module to enable me write to files.
  * From the app object with the express function I used the listen method and set the port.
*/