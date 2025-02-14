# Backend for DiNostalgia

This is the backend of DiNostalgia, a web app about dinosaurs for the inner-child of every adult.  The backend is live at:

[DiNostalgia Backend](http://dinostalgia-backend.vercel.app/api): http://dinostalgia-backend.vercel.app 

# Technologies Used

- Express.js – Web framework
- Supabase – Database & authentication
- dotenv – Environment variables
- cors – Security middleware


# API Endpoints

## Dinosaurs

- Endpoint: GET /api/dinosaurs
- Description: Fetches a list of all dinosaurs from the database.
- Response:
```
[
  {
    "id": 1,
    "name": "Tyrannosaurus Rex",
    "imageSrc": "https://www.nhm.ac.uk/resources/nature-online/life/dinosaurs/dinosaur-directory/images/reconstruction/small/aardonyx.jpg"
    "length": 2,
    "weight": 100,
    "typeOfDino": "sauropod",
    "diet": "herbivorous",
    "whenLived": "Early Jurassic",
    "foundIn": "South Africa",
    "namedBy": "Gilmore (1922)",
    "description": "description of dinosaur",
    "price": 19.99,
    "inStock": 10,
    "created_at": "2025-02-07 10:50:14.751454+00",
    "mapLink": "https://www.openstreetmap.org/export/embed.html?bbox=17.92651880532503%2C-33.41861045201499%2C33.74683130532503%2C-22.376498680023815&amp;layer=hot"
  }
]
```
## Orders

- Endpoint: POST /api/orders
- Description: Creates an order in the DB - editing three tables: orders, orderItems, and dinosaurs

- Request body includes an object containing a newOrder object and Cart array.
```
{
	“newOrder”: {
		“first_name“: “Adam”,
      	“last_name“: “Smith”,
      	“address“: “123 Main Street”,
      	“email“: “email@email.com”,
      	“total“: 47.58,
      	“user_id“: “jdas94hq093q50”
	}
	“cart”: [{
        “id“: 1,
        “name“: “t-rex”,
        “price“: 20.34,
        “inStock“: 8,
        “quantity“: 1
	},
	{
        “id“: 2,
        “name“: “brontosaurus”,
        “price“: 12.75,
        “inStock“: 6,
        “quantity“: 2
	}]
}
```
## News

- Endpoint: GET /api/news
- Description: Fetches a list of recent news articles that are related to dinosaurs.
- *Note: Data is coming from NewsAPI.org. Our site fetches information from our backend, which in turn makes an API call to their website.

- Response:

```
{
"status": "ok",
"totalResults": 6589,
-"articles": [
-{
-"source": {
"id": null,
"name": "Forbes"
},
"author": "Ty Roush",
"title": "title of article",
"description": "description of article",
"urlToImage": "url of an image",
"publishedAt": "published date",
"content": "a snippit of the content of the article"
},
```
# Project Structure
```dino-api/

├── dinosaurs/
│   ├── dinosaurs.controller.js
│   ├── dinosaurs.router.js
│   ├── dinosaurs.service.js
├── errors/
│   ├── errorHandler.js
│   ├── index.js
│   ├── methodNotAllowed.js
│   ├── notFound.js
├── news/
│   ├── news.controller.js
│   ├── news.router.js
├── node_moduels/
├── order/
│   ├── orders.controller.js
│   ├── orders.router.js
│   ├── orders.service.js
├── server.js
│.env
│.gitignore
│ package.json
│ package-lock.json
│ README.md
```
# Setup & Installation
## Clone the repository
- git clone 
- cd into directory

## Install dependencies
- npm install

## Create an .env file and add the following variables:
- SUPABASE_URL=
- SUPABASE_ANON_KEY=
- SUPABASE_NEWS_API_KEY=
- SUPABASE_NEWS_API_URL=

## Start the server
npm run start