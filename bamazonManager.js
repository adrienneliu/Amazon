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

//global variable
var productID;
var finalProduct; 

var newName; 
var newCuisine; 
var newPrice; 
var newQuantity;

//ask the user what they want to do from manager view point
function prompt() {
    inquirer.prompt([
        {
            type: "list",
            name: "userchoice",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
        }
    ]).then(function (response) {
        //console.log(response.userchoice);

        switch (response.userchoice) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                productAdd();
                break;
            case "Quit":
                connection.end();
                break;

        }
    })
}

//If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
function viewProducts() {
    console.log("You made it!");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        } console.log(table.toString());
        prompt();
    });
}

//If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
function lowInventory() {
    console.log("Where are we now?");
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;

        //console.log(res);

        //table 
        var table = new Table({
            head: ['ID', 'Item', 'Cuisine', 'Price', 'Quantity']
            , colWidths: [15, 25, 25, 15, 15]
        })
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        } console.log(table.toString());
        prompt();
    });
}


//If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {
    console.log("yay, third time is the charm!");
    // var query = connection.query("INSERT INTO products SET ?", )
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the item you'd like to restock?",
            name: "userPick",
            filter: Number
        },
        {
            type: "input",
            message: "How many do you want to add?",
            name: "amount",
            filter: Number
        }
    ]).then(function (result) {
        console.log(result.userPick);
        console.log(result.amount);
        productID = result.userPick;

        //grabbing the number that users put for id and quantity and using it for the next function 
        var query = "SELECT * FROM products WHERE item_id = ?";
        connection.query(query, [productID], function (err, res) {
            if (err) throw err;
            
            console.log(res);

            finalProduct = res[0].stock_quantity + result.amount;
            console.log("Total: " + finalProduct);

            updateProduct(productID, finalProduct);
            })
    })
}

function updateProduct(productID, finalProduct) {
    console.log("Take me here");
    var query = connection.query("UPDATE products SET ? WHERE ?",
    [
        {
            stock_quantity: finalProduct
        }, 
        {
            item_id: productID
        }
    ], function(err, res) {
            if (err) throw err; 
            console.log("SHOW ME");
            // console.log(res);
            viewProducts();
    })
}

//If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
function productAdd() {
    console.log("And here we are");
    inquirer.prompt([
        {
            type: "input",
            message: "What food do you want to add to the menu?", 
            name: "name"
        },
        {
            type: "input",
            message: "What kind of cuisine is it?",
            name: "cuisine"
        },
        {
            type: "input",
            message: "How much does it cost?",
            name: "price",
            filter: Number
        },
        {
            type: "input", 
            message: "How many do we have?", 
            name: "quantity",
            filter: Number
        }
    ]).then(function(response){
        console.log(response);
        newName = response.name; 
        newCuisine = response.cuisine; 
        newPrice = response.price; 
        newQuantity = response.quantity;

        //console.log("quan: " + response.quantity)
        newProduct(newName, newCuisine, newPrice, newQuantity);
    })
}

function newProduct(){
    console.log("time to add");
    var query = connection.query("INSERT INTO products SET ?", 
    {
        product_name: newName,
        department_name: newCuisine,
        price: newPrice,
        stock_quantity: newQuantity 
    }, function(err, res) {
        if (err) throw err; 
        // console.log(res);
        viewProducts();
    })
}