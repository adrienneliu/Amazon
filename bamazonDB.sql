DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price INTEGER (10,2),
    stock_quantity INTEGER(100),
    PRIMARY KEY(id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("FrixOn", "Stationary", 3, 10), 
    ("Pentel", "Stationary", 1, 10);