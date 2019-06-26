DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL (10,2),
    stock_quantity INTEGER(100),
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Spaghetti", "Pasta", 3, 10), 
    ("Lasagna", "Pasta", 1, 10),
    ("Tonkatsu Ramen", "Noodle", 5, 10),
    ("Sashimi", "Fish", 8, 10),
    ("Kit-Kat", "Sweets", 2, 10), 
    ("Hot Dog", "Meat", 3, 10), 
    ("Steak", "Meat", 7, 10)
    ;