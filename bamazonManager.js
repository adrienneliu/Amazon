var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');

//connect to mysql workbench
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    password: "password",
    database: "bamazon"
});

//table 
var table = new Table({
    head: ['ID', 'Item', 'Cuisine', 'Price', 'Quantity']
    , colWidths: [15, 25, 25, 15, 15]
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    prompt();
});

function prompt() {
    inquirer.prompt([
        {
            type: "list", 
            name: "userchoice",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function(response) {
        console.log(response.userchoice);

        switch(response.userchoice) {
            case "View Products for Sale":
                viewProducts();
            break;
            case "View Low Inventory":

            break; 
            case "Add to Inventory" : 

            break; 
            case "Add New Product":

            break;

        }
    })
}

function viewProducts() {
    console.log("You made it!");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }console.log(table.toString());
        prompt();
    })
}   