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

Example request:

```
curl -k -X POST -H "Content-Type: application/json" -d '{
    "name": "test product",
    "description": "this is a test product",
    "price": 234.50,
    "deliveryPrice": 3.5
}' http://localhost:5000/products
```

Example response:
```
{
    "id": "60710c576561d8001e3b6050"
}
```

#### Get all products

`GET /products` - gets all products.

Example request:

```
curl -k -X GET -H "Content-Type: application/json" http://localhost:5000/products
```

Example response:
```
[
    {
        "id": "606fde248fd452001e807013",
        "name": "test",
        "description": "my 1st product",
        "price": 23,
        "deliveryPrice": 3.5
    },
    {
        "id": "606fe1f680b2db001f97fde1",
        "name": "test1",
        "description": "test description",
        "price": 32,
        "deliveryPrice": 3.3
    },
    {
        "id": "60710c576561d8001e3b6050",
        "name": "test product",
        "description": "this is a test product",
        "price": 234.5,
        "deliveryPrice": 3.5
    }
]
```

#### Get products by name

`GET /products?name={name}` - finds all products matching the specified name.

Example request:

```
curl -k -X GET -H "Content-Type: application/json" https://localhost:5000/products?name=test%20product
```

Example response:
```
[
    {
        "id": "60710c576561d8001e3b6050",
        "name": "test product",
        "description": "this is a test product",
        "price": 234.5,
        "deliveryPrice": 3.5
    }
]
```

#### Get product by id

`GET /products/{id}` - gets the project that matches the specified ID - ID is a GUID.

Example request:
```
curl -k -X GET -H "Content-Type: application/json" https://localhost:5000/products/60710c576561d8001e3b6050
```

Example response:
```
{
    "id": "60710c576561d8001e3b6050",
    "name": "test product",
    "description": "this is a test product",
    "price": 234.5,
    "deliveryPrice": 3.5
}
```

#### Update a product

`PUT /products/{id}` - updates a product.

Example request:

```
curl -k -X PIT -H "Content-Type: application/json" -d '{
    "price": 123.4,
    "deliveryPrice": 2.3
}' http://localhost:5000/products/60710c576561d8001e3b6050
```

Example response (empty):
```
```

#### Delete a product

`DELETE /products/{id}` - deletes a product and its options.

Example request:
```
curl -k -X DELETE -H "Content-Type: application/json" https://localhost:5000/products/60710c576561d8001e3b6050
```

Example response (empty):
```
```

#### Create an option

`POST /products/{id}/options` - adds a new product option to the specified product.

```
curl -k -X POST -H "Content-Type: application/json" -d '{
    "name": "opt1",
    "description": "a description",
}' http://localhost:5000/products/606fd7419d9e58001e151ff8/options
```

#### Get all options for a product

# `GET /products/{id}/options` - finds all options for a specified product.

```
curl -k -X GET -H "Content-Type: application/json" http://localhost:5000/products/606fd7419d9e58001e151ff8/options
```

#### Get option by id for a product

# `GET /products/{id}/options/{optionId}` - finds the specified product option for the specified product.

```
curl -k -X GET -H "Content-Type: application/json" http://localhost:5000/products/606fd7419d9e58001e151ff8/options/6070f5e2f02234001e4e5f78
```

#### Update an option for a product

# `PUT /products/{id}/options/{optionId}` - updates the specified product option.

```
curl -k -X PUT -H "Content-Type: application/json" -d '{
    "name": "opt1",
    "description": "a description",
}' http://localhost:5000/products/606fd7419d9e58001e151ff8/options/6070f5e2f02234001e4e5f78
```

#### Delete an option for a product

`DELETE /products/{id}/options/{optionId}` - deletes the specified product option.

```
curl -k -X DELETE -H "Content-Type: application/json" http://localhost:5000/products/606fd7419d9e58001e151ff8/options/6070f5e2f02234001e4e5f78
```
