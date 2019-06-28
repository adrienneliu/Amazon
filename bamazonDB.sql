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
VALUES ("Spaghetti", "Italian", 7.50, 50), 

    ("Sashimi", "Japanese", 17.99, 15),
    ("Kit-Kat", "Sweets", 0.75, 100), 
    ("Hot Dog", "American", 1.50, 100), 
    ("Steak", "American", 27.99, 55),
    ("Curry Katsu", "Japanese", 13.50, 65),
    ("Pancake", "American", 3.50, 50), 
    ("Blueberry Pancake", "American", 5.50, 50), 
    ("Joey Tacos", "Mexican", 1.50, 8),
    ("Chloe Hot Pot", "Chinese", 18.99, 20),
    -- ("Shabu Shabu", "Japanese", 23, 20), 
    -- ("Reg Biryani", "Indian", 10.00, 35),
    -- ("Esar's Mom's Biryani", "Indian", 999, 1),
    -- ("Mac and Cheese", "American", 6.00, 100),
    -- ("XLB", "Chinese", 6.00, 100),
    -- ("Green Curry", "Thai", 7.00, 30)

    ;

    --     ("Musubi", "Hawaiian", 1.00, 100),
    -- ("Pho", "Vietnamese", 7.50, 50),
    -- ("Sui Mai 3pc", "Chinese", 0.75, 100), 
    -- ("Ice Cream", "Sweets", 2.99, 100), 
    -- ("Chocolate Cake 1pc", "Sweets", 1.50, 50),
    -- ("Banh Mi", "Vietnamese", 4.00, 75), 
    -- ("Loco Moco", "Hawaiian", 8.00, 100),
    --     ("Lasagna", "Italian", 7.50, 50),
    -- ("Tonkatsu Ramen", "Japanese", 6.99, 35),
    --     ("Robot Bibimbap", "Korean", 12.50, 70), 
    -- ("Kimbap", "Korean", 1.50, 100),