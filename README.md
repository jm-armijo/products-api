# Products API

This app is a generic API to add and get products from a database. It is made out of two components:
* A MongoDB database
* A NestJS API

## Setup

### Requirements

Docker version >=19.03.8

### Start the apps

Run the following command:
```
bash start.sh
```

### Stop the API only (DB remains up)

Run the following command:
```
bash stop.sh
```

The database is not stopped to prevent accidental data loss. The database components can be stopped and destroyed by using this commands:

```
docker stop products-db
docker rm products-db
docker image rm products-db
```

## Usage

#### Create new product

# `POST /products` - creates a new product.

```
curl -X POST -H "Content-Type: application/json" -d '{
    "name": "prod1",
    "description": "my 1st product",
    "price": 23,
    "deliveryPrice": 3.5
}' http://localhost:5000/products
```
