<h1 align="center"><a href="https://gittedblogrestapi.herokuapp.com/api/blogs" target="_blank">🌐 blog rest api</a></h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/kimanicharles911/emmethub_nodejs_modules/blob/master/LICENSE.txt" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> This is a basic blog rest-api created using Expressjs. It covers the 4 main http methods. It has two methods of managing data: the best is the one that stores updated data in a JSON file, while the other stores the initializing data in a normal JS variable and when the data is updated the variable does not change however it changes logically and will be proved when you test with http methods. The latter method is covered in the first two commits of this repo. The comments the file app.js allow easy understanding of how it functions.

## Deployed at
* https://gittedblogrestapi.herokuapp.com/api/blogs

##### API Usage
| HTTP method      |   EndPoint   |   Public Access   |   Example   |
| ---- |:---- |:---- |:---- |
| GET     | /api/blogs/    |  TRUE    |  https://gittedblogrestapi.herokuapp.com/api/blogs/    |
| GET     | /api/blogs?id=2    |  TRUE    |  https://gittedblogrestapi.herokuapp.com/api/blogs?id=2    |
| POST     | /api/blogs/new/    |  TRUE    |  https://gittedblogrestapi.herokuapp.com/api/blogs/new/    |
| PUT     | /api/blogs?id=2    |  TRUE    |  https://gittedblogrestapi.herokuapp.com/api/blogs?id=2    |
| DELETE     | /api/blogs?id=2    |  TRUE    |  https://gittedblogrestapi.herokuapp.com/api/blogs?id=2    |

## Setup/Installation Requirements
##### Install Dependencies

```sh
sudo apt install nodejs #(for linux platform)
npm i
```

##### Development Usage

```sh
npm run dev
```

## No Data/JSON returned ?
> If while using the GET endpoint no JSON data is returned it means that someone used the DELETE endpoint to delete all the data provided by this API. Hence you can:
1.Clone this repo and run it locally, that way it will work well with all the original data.
2.or use the data.json file in this repo together with the PUT method to add data to the hosted api. 

## How It Was Built
##### Node
```sh
npm init
npm i express
npm i nodemon --save-dev
```
##### Dependencies
* Node
* Express
* Nodemon

##### Deploy to Heroku
* Add this in package.json
```sh
"engines": {
  "node": "14.15.1"
}
```
* Then run the following terminal commands:
```sh
install heroku
heroku login
touch Procfile
```

* Add this line in the Procfile which will depend with the name of your server file which in my case is app.js:
```sh
web: node app.js
```

* Then run the following terminal commands:
```sh
heroku create
heroku login
touch Procfile
git add . 
git commit -m"first deploy to heroku"
## optional for pushing to github: git push -u origin master
git push heroku master
```

## License and Copyright Information.

This project is MIT licensed see [my MIT LICENSE](https://github.com/kimanicharles911/blog_rest_api/blob/master/LICENSE.txt) for details.<br />
Copyright © 2021 [Charles Kimani & Emmethub](https://github.com/kimanicharles911).

### Author

###### 👤 **Charles Kimani**

* Website: https://emmethub.com/founder
* Github: [@kimanicharles911](https://github.com/kimanicharles911)
* LinkedIn: [@kimanicharles](https://linkedin.com/in/kimanicharles)

#### Show your support

Give a ⭐️ if this project helped you!

***