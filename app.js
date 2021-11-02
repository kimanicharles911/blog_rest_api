const express = require('express');
const app = express();
const port = process.env.PORT || 3000
app.use(express.json());
const fileSystem = require('fs');

/* 
  * I defined a GET route that sends a message indicating to the client they are in the root of the blog.
  * Example test URL: http://localhost:3000  */
app.get('/', (req, res) => {
  return res.send('Root of blog works');
});

/* 
  * I defined a GET route that returns all blogs or specific blogs as per the client's query.
  * I utilized the fs readFile method to get the json data found in the file data.json
  * I then converted the data from the JSON file to normal JS objects and stored it in the variable dataArr since the objects are in an array.
  * The top level if condition is executed when the client wants a specific blog. Hence the blog with the id is looked for with the find array method applied on the dataArr containing all blogs, the result is then stored on the blog variable.
  * The second nested if condition is used for validation purposes. This only occurs only if a blog with that id is not found. 
  Example test URLS: 
  1. http://localhost:3000/api/blogs
  2. http://localhost:3000/api/blogs?id=2 */
app.get('/api/blogs', (req, res) => {
  fileSystem.readFile('data.json', (err, data) => {
    if (err) throw err;
    let dataArr = JSON.parse(data);
    if(req.query.id){
      const blog = dataArr.find(blog => blog.id === parseInt(req.query.id));
      if(!blog){
        return res.status(404).send("That blog doesn't exist");
      }
      // This LOC returns the blog with that id.
      return res.send(blog);
    }
    // This LOC returns all the blogs
    return res.json(dataArr);
  })
});

/* 
  * I defined a POST route that enables creation of a new blog by the client.
  * I created a variable dataArr that will be used to later store the data from the JSON file.
  * I utilized the fs readFile method to get the json data found in the file data.json
  * I converted the data from the JSON file to normal JS objects and stored it in the variable dataArr since the objects are in an array.
  * I destructured the keys in the request body and stored them in the respective variables.
  * I used an if condition that returns an error if a title or body is not passed by the client when creating the blog.
  * If the blog has required fields the blog is added to the dataArr using push.
  * I then utilized the writeFile method to set new values to the data.json file using the dataArr variable. I first converted the dataArr variable to a JSON object with JSON.stringify. The null and number 2 value after passing the data variable are used to make data written to data.json readable.
  * A success message is returned after the blog has been added to the data array.
  * Example test URL: http://localhost:3000/api/blogs/new
      In the body of the request set this as the JSON content
        {
          "title": "this is post 10",
          "body": "this is the body of post 10"
        }
*/
app.post('/api/blogs/new', (req, res) => {
  let dataArr;
  fileSystem.readFile('data.json', (err, data) => {
    if (err) throw err;
    dataArr = JSON.parse(data);
    
    const {title, body} = req.body;
    if(!title || !body){
      return res.status(400).send('Both the title and the body are required.')
    }
    dataArr.push({
      id: dataArr.length + 1,
      title,
      body
    });
    fileSystem.writeFile('data.json', JSON.stringify(dataArr, null, 2), (err) => {
      if(err) throw err;
      return res.status(201).send(`New Blog has been created.`);
    });
  });
});

/* 
  * I defined the PUT method that updates a specific blog.
  * I utilized the fs readFile method to get the json data found in the file data.json
  * I then converted the data from the JSON file to normal JS objects and stored it in the variable dataArr since the objects are in an array.
  * The blog with the id is looked for with the find array method applied on the dataArr containing all blogs, the blog is then stored on the blog variable.
  * We then access the body key and store the body in the request body in this key.
  * I then utilized the writeFile method to set changed values to the data.json file using the dataArr variable. I first converted the dataArr variable to a JSON object with JSON.stringify. The null and number 2 value after passing the data variable are used to make data written to data.json readable.
  * I then return a success message.
  * Example test URL: http://localhost:3000/api/blog?id=2
      In the body of the request set this as the JSON content
        {
          "body": "this is the body of post 10"
        }
*/
app.put('/api/blog', (req, res) => {
  fileSystem.readFile('data.json', (err, data) => {
    if(err) throw err;
    let dataArr = JSON.parse(data);
    if(req.query.id){
      const blog = dataArr.find(blog => blog.id === parseInt(req.query.id));
      blog.body = req.body.body;
      fileSystem.writeFile('data.json', JSON.stringify(dataArr, null, 2), (err) => {
        if(err) throw err;
        return res.send(`Blog ${blog.id} updated.`);
      });
    }
  });
});

/* 
  * I defined the DELETE method that deletes a specific blog.
  * I utilized the fs readFile method to get the json data found in the file data.json
  * I then converted the data from the JSON file to normal JS objects and stored it in the variable dataArr since the objects are in an array.
  * The blog with the id is looked for with the find array method applied on the dataArr containing all blogs, the blog is then stored on the blog variable.
  * If a blog with that id exists I use the splice array method to delete from the dataArr the object in the index similar to that of the blog variable.
  * I then utilized the writeFile method to set the remaining values to the data.json file using the dataArr variable. I first converted the dataArr variable to a JSON object with JSON.stringify. The null and number 2 value after passing the data variable are used to make data written to data.json readable.
  * I then return a success message.
  * If a blog with that id doesn't exist a fail message is returned.
  * Example test URL: http://localhost:3000/api/blog?id=2
*/
app.delete('/api/blog', (req, res) => {
  fileSystem.readFile('data.json', (err, data) => {
    if(err) throw err;
    let dataArr = JSON.parse(data);
    const blog = dataArr.find(blog => blog.id === parseInt(req.query.id));
    if(blog){
      dataArr.splice(dataArr.indexOf(blog), 1);
      fileSystem.writeFile('data.json', JSON.stringify(dataArr, null, 2), (err) => {
        if(err) throw err;
        return res.send(`Blog ${blog.id} deleted`);
      });
    }else{
      return res.send(`No blog with the id ${req.query.id} exists.`);
    }
  });
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