var mysql = require("mysql");
var inquirer = require("inquirer");

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
    })
}