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

#### Create product

Creates a new product.

* **URL**

  `/products`

* **Method:**

  `POST`

* **Data Params**

  **Required:**

    `name=[string]`

    `description=[string]`

    `price=[number]`

    `deliveryPrice=[number]`


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ "id": "60710c576561d8001e3b6050" }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "name should not be empty"
            ],
            "error": "Bad Request"
        }

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "description should not be emp
            ],
            "error": "Bad Request"
        }

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "price must not be less than 0",
                "price must be a number conforming to the specified constraints"
            ],
            "error": "Bad Request"
        }

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "deliveryPrice must not be less than 0",
                "deliveryPrice must be a number conforming to the specified constraints"
            ],
            "error": "Bad Request"
        }

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "Unexpected token } in JSON at position 117"
            ],
            "error": "Bad Request"
        }

* **Sample Call:**

        curl -k -X POST -H "Content-Type: application/json" -d '{
            "name": "test product",
            "description": "this is a test product",
            "price": 234.50,
            "deliveryPrice": 3.5
        }' http://localhost:5000/products


#### Get list of products

Gets a list of all products. If a name is passed, it gets all products matching the specified name (exact match).

* **URL**

  `/products`

* **Method:**

  `GET`

*  **URL Params**

  **Optional:**

      `name=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

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

* **Error Response:**

  * **Code:** 401<br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "name should not be empty"
            ],
            "error": "Bad Request"
        }

* **Sample Call:**

        curl -k -X GET -H "Content-Type: application/json" http://localhost:5000/products

        curl -k -X GET -H "Content-Type: application/json" https://localhost:5000/products?name=test%20product

#### Get one product

Gets the product that matches the specified ID

* **URL**

  `/products/{id}`

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

        {
            "id": "60710c576561d8001e3b6050",
            "name": "test product",
            "description": "this is a test product",
            "price": 234.5,
            "deliveryPrice": 3.5
        }

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ "statusCode": 404, "message": "Not Found" }`

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "id must be a mongodb id"
            ],
            "error": "Bad Request"
        }

* **Sample Call:**

        curl -k -X GET -H "Content-Type: application/json" https://localhost:5000/products/60710c576561d8001e3b6050

#### Update a product

Updates a product.

* **URL**

  `/products/{id}`

* **Method:**

  `PUT`

* **Data Params**

   **Optional:**

      `name=[string]`

      `description=[string]`

      `price=[number]`

      `deliveryPrice=[number]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ` `


* **Error Response:**

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "name should not be empty"
            ],
            "error": "Bad Request"
        }

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "description should not be emp
            ],
            "error": "Bad Request"
        }

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "price must not be less than 0",
                "price must be a number conforming to the specified constraints"
            ],
            "error": "Bad Request"
        }

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "deliveryPrice must not be less than 0",
                "deliveryPrice must be a number conforming to the specified constraints"
            ],
            "error": "Bad Request"
        }

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "id must be a mongodb id"
            ],
            "error": "Bad Request"
        }

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "Unexpected token } in JSON at position 88"
            ],
            "error": "Bad Request"
        }

* **Sample Call:**

        curl -k -X PIT -H "Content-Type: application/json" -d '{
            "price": 123.4,
            "deliveryPrice": 2.3
        }' http://localhost:5000/products/60710c576561d8001e3b6050

#### Delete a product

Deletes a product and its options.

* **URL**

  `/products/{id}`

* **Method:**

  `DELETE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ` `


* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ "statusCode": 404, "message": "Not Found" }`

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "id must be a mongodb id"
            ],
            "error": "Bad Request"
        }

* **Sample Call:**

        curl -k -X DELETE -H "Content-Type: application/json" https://localhost:5000/products/60710c576561d8001e3b6050

#### Create an option

Adds a new product option to the specified product.

* **URL**

  `/products/{id}/options`

* **Method:**

`POST`

  * **Data Params**

  **Required:**

    `name=[string]`

    `description=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ "id": "607518aee85d45001ebd72ee" }`

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ "statusCode": 404, "message": "Not Found" }`

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "productId must be a mongodb id"
            ],
            "error": "Bad Request"
        }

* **Sample Call:**

        curl -k -X POST -H "Content-Type: application/json" -d '{
            "name": "opt1",
            "description": "a description",
        }' http://localhost:5000/products/606fd7419d9e58001e151ff8/options

#### Get list of options for a product

Finds all options for a specified product.

* **URL**

  `/products/{id}/options`

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

        [
            {
                "id": "60751b860ee408001fad027b",
                "productId": "606fb2a11fe8b00029aa09f8",
                "name": "option 1",
                "description": "description option 1"
            },
            {
                "id": "60751b8b0ee408001fad027c",
                "productId": "606fb2a11fe8b00029aa09f8",
                "name": "option 2",
                "description": "description option 2"
            }
        ]

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ "statusCode": 404, "message": "Not Found" }`

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "productId must be a mongodb id"
            ],
            "error": "Bad Request"
        }

* **Sample Call:**

        curl -k -X GET -H "Content-Type: application/json" http://localhost:5000/products/606fd7419d9e58001e151ff8/options

#### Get one option for a product

Finds the specified product option for the specified product.

* **URL**

  `/products/{id}/options/{optionId}`

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

        {
            "id": "60751b860ee408001fad027b",
            "productId": "606fb2a11fe8b00029aa09f8",
            "name": "option 1",
            "description": "description option 1"
        }

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ "statusCode": 404, "message": "Not Found" }`

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "id must be a mongodb id"
            ],
            "error": "Bad Request"
        }

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "productId must be a mongodb id"
            ],
            "error": "Bad Request"
        }

* **Sample Call:**

        curl -k -X GET -H "Content-Type: application/json" http://localhost:5000/products/606fd7419d9e58001e151ff8/options/6070f5e2f02234001e4e5f78

#### Update an option for a product

Updates the specified product option.

* **URL**

  `/products/{id}/options/{optionId}`

* **Method:**

  `PUT`

* **Data Params**

   **Optional:**

    `name=[string]`
  
    `description=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ` `

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ "statusCode": 404, "message": "Not Found" }`

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "id must be a mongodb id"
            ],
            "error": "Bad Request"
        }

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "productId must be a mongodb id"
            ],
            "error": "Bad Request"
        }

* **Sample Call:**

        curl -k -X PUT -H "Content-Type: application/json" -d '{
            "name": "opt1",
            "description": "a description",
        }' http://localhost:5000/products/606fd7419d9e58001e151ff8/options/6070f5e2f02234001e4e5f78

#### Delete an option for a product

Deletes the specified product option.

* **URL**

  `/products/{id}/options/{optionId}`

* **Method:**

  `DELETE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ` `


* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ "statusCode": 404, "message": "Not Found" }`

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "id must be a mongodb id"
            ],
            "error": "Bad Request"
        }

  OR

  * **Code:** 400 <br />
    **Content:**

        {
            "statusCode": 400,
            "message": [
                "productId must be a mongodb id"
            ],
            "error": "Bad Request"
        }

* **Sample Call:**

        curl -k -X DELETE -H "Content-Type: application/json" http://localhost:5000/products/606fd7419d9e58001e151ff8/options/6070f5e2f02234001e4e5f78

# Future work

The following work is required to make this API ready for a production environment:

* Support authentication at least for creating, updating and deleting items.
* Cache requests, particularly those that get the lists of products/options.
* Implement pagination on the requests that return lists of products/options.
* Use certificates signed by Certificate Authority (currentrly provided self-signed certificates to connect to the API).
* Use certificates to connect from the API to the Database (database credentials are stored in this git repository at the moment).
* Complete Unit Tests

These are other features that may be nice to have in the future:
* Sort lists by any field, in any order.
* Filter list of products by any field, not just name.
* Improved search capabilities (ignore case, regex search?)

Also, please note that this API runs in docker containers to facilitate using it for demo purposes. When deployed to a proper production environment it is important to estimate the demand to provide enough capacity: consider using AWS.

### Documentation

Additional documentation can be found [here](documentation/)
