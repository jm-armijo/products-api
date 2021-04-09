# Products API

This app is a generic API to add and get products from a database. It is made out of two components:
* A MongoDB database
* A NestJS API

## Setup

### Requirements

Docker version >=19.03.8

### Start apps

Run the following command:
```
bash start.sh
```

### Stop apps

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

### Security

The API uses secure connections for all endpoints: the path to the certificate and its key specified through environment variables (see below).

The certificate provided is self-signed, which means that curl must be used with option `-k` (insecure).


### Environment variables

The API uses Environment Variables to control its behaviour. These variables are specified in the `env.list` files in the `api` and `db` directories (one file per component).

Any changes to these variables will take effect after the components (i.e. db and/or api) are restarted.


## Usage

#### Create new product

`POST /products` - creates a new product.

```
curl -k -X POST -H "Content-Type: application/json" -d '{
    "name": "prod1",
    "description": "my 1st product",
    "price": 23,
    "deliveryPrice": 3.5
}' http://localhost:5000/products
```

#### Get all products

`GET /products` - gets all products.

```
curl -k -X GET -H "Content-Type: application/json" http://localhost:5000/products
```

#### Get products by name

`GET /products?name={name}` - finds all products matching the specified name.

```
curl -k -X GET -H "Content-Type: application/json" http://localhost:5000/products?name=name
```

#### Get product by id

`GET /products/{id}` - gets the project that matches the specified ID - ID is a GUID.

```
curl -k -X GET -H "Content-Type: application/json" http://localhost:5000/products/606fd7419d9e58001e151ff8
```
