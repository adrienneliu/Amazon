//npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');
var chalk = require("chalk");

const chalkAnimation = require('chalk-animation');



//table 
var table = new Table({
    head: ['ID', 'Item', 'Cuisine', 'Price', 'Quantity']
    , colWidths: [15, 25, 25, 15, 15]
});

//connect to mysql workbench
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId + "\n");
    initialDisplay();

});

//input we need to grab
var quantityFinal;
var productID;

//what the user sees after starting 
function initialDisplay() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        //insert story line here ... REPLACE WORDS
        console.log("\n WHAT DO YOU WANNA EAT \n");

        for (var i = 0; i < res.length; i++) {
            // console.log(res[i].item_id + "| " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);

            // table is an Array, so you can `push`, `unshift`, `splice` and friends
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(table.toString());
        prompt();
    });
}

//ask the user what they want to order and how many
function prompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the item you'd like to order?",
            name: "userPick",
            filter: Number
        },
        {
            type: "input",
            message: "How many do you want?",
            name: "amount",
            filter: Number
        }
    ]).then(function (result) {
        //console.log(result.userPick);
        //console.log(result.amount);
        productID = result.userPick;


        //grabbing the number that users put for id and quantity and using it for the next function 
        var query = "SELECT * FROM products WHERE item_id = ?";
        connection.query(query, [productID], function (err, res) {
            if (err) throw err;

            quantityFinal = res[0].stock_quantity - result.amount;

            if (quantityFinal < 0) {
                console.log("Sorry, we ran out!");
                prompt();
            } else {
                console.log("You ordered " + result.amount + " " + (chalk.blue(res[0].product_name)) + ".\n Thank you, that wil be $" + (chalk.green(result.amount * res[0].price)) + "."
                );
                updateProduct(quantityFinal, productID);
            }

        })
    })
}

//update the table to show users have made a purchase
function updateProduct(quantityFinal, productID) {
    // console.log(productID);
    // console.log(quantityFinal);

    var query = connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: quantityFinal
            },
            {
                item_id: productID
            }
        ], function (err, res) {
            if (err) throw err;
            readDisplay();
        }
    );
}

function readDisplay() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
//new table to discard old data and push new updated quantities
        table = new Table({
            head: ['ID', 'Item', 'Cuisine', 'Price', 'Quantity']
            , colWidths: [15, 25, 25, 15, 15]
        });

        for (var i = 0; i < res.length; i++) {

            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );

        }
        console.log(table.toString());
        connection.end();
        chalkAnimation.glitch("Thanks for your purchase!");

    })
}