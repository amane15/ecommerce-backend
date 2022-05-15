# ecommerce-backend API Documetation

## URL = https://ecomapp-mern.herokuapp.com

### Registration:

#### **POST** /api/users/register

> In the body you have to pass name, email, password. <br/>

```
{
    name:       // at least 3 characters long
    email:      // at least 8 characters long
    password:   // at least 8 characters long
}
```

### Authentication:

#### POST /api/auth/login

> In the body you have to pass email and password. <br/>

```
{
    email:
    password:
}
```

> If email and password is right it will return JSON Web Token. <br/>

### To test the following endpoints authentication is required.

### Once you receive JSON Web Token send that as header named as x-auth-header.

```
x-auth-header: "YOU JSON Web Token"
```

#### **PUT** /api/users/update

> To update user information such as address, name and phone number. <br/> You cannot update email.

```

{
name:       // at least 3 characters long
address:    // at least 10 characters long
phone:      // 10 characters long
}

```

### Products Endpoints:

#### **GET** /api/products

> Returns all the products.

#### **GET** /api/products/id

> Returns product with the given id.

#### **POST** /api/products/add

> As of now only admin is allowed to perform this request.

### Cart Endpoints:

#### **GET** /api/cart

> Return all the products present in the cart.

#### **POST** /api/cart/add

> To add product in the cart.

```
{
    productId:
    quantity:
}
```

> As of now you have to pass quantity.

#### **PUT** /api/cart/deleteProduct

> To delete product with given id from the cart.

```
{
    productId:
}
```

#### **PUT** /api/cart/empty

> Remove all the products in the cart.

### Wishlist Endpoints:

#### **GET** /api/wishlist/

> Return all the products present in the wishlist

#### **POST** /api/wishlist/add

> To add product in the wishlist

```
{
    productId:
}
```

### **PUT** /api/wishlist/deleteProduct

> To delete product with the given id from wishlist.

```
{
    productId:
}
```

### Orders Endpoint:

#### **GET** /api/orders/

> Return all the orders.
