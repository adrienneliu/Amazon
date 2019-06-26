DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL (10,20),
    stock_quantity INTEGER(100),
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Spaghetti", "Italian", 7.50, 50), 
    ("Lasagna", "Italian", 7.50, 50),
    ("Tonkatsu Ramen", "Japanese", 6.99, 35),
    ("Sashimi", "Japanese", 17.99, 15),
    ("Kit-Kat", "Sweets", 0.75, 100), 
    ("Hot Dog", "American", 1.50, 100), 
    ("Steak", "American", 27.99, 55),
    ("Katsu", "Japanese", 13.50, 65),
    ("Pancake", "American", 3.50, 50), 
    ("Blueberry Pancake", "American", 5.50, 50), 
    ("Joey Tacos", "Mexican", 1.50, 8)

    ;