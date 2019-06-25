//npm packages
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

connection.connect(function(err) {
    if (err) throw err; 
    //console.log("connected as id " + connection.threadId + "\n");
    initial(); 
    connection.end();
});

//what the user sees after starting 
function initial() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err; 

        for (var i = 0; i<res.length; i++) {
            console.log(res[i].item_id + "| " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }

        inquirer.prompt([ 
            {
                type: "input",
                message: "What is the ID of the item you'd like to order?",
                name: "userPick"
            }
        ]).then(function(result) {
            console.log(result.userPick);
        }) 
    })
}