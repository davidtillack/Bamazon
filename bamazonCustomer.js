// Required packages
var mysql = require("mysql");

var inquirer = require("inquirer");

// Set the mysql connection
var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "bamazon"
});

// Initial function to run and display to the user what is in the database
function init() {
  connection.query("SELECT * FROM products", function(error, response) {
    if (error) throw error;
    console.log("");
    console.log("Welcome to the Bamazon store!");
    console.log(
      "-----------------------------------------------------------------------------------------"
    );
    console.log("Below you will see Bamazon's products");
    console.log("Bamazon's products are listed in the following order: ");
    console.log(
      "Item Number | Product Name | Department Name | Price | Stock Quantity"
    );
    console.log(
      "-----------------------------------------------------------------------------------------"
    );
    console.log("");
    for (var i = 0; i < response.length; i++) {
      var itemID = response[i].item_id;
      var productName = response[i].product_name;
      var departmentName = response[i].department_name;
      var price = "$" + response[i].price.toFixed(2);
      var quantity = response[i].stock_quantity;
      console.log(
        itemID +
          " | " +
          productName +
          " | " +
          departmentName +
          " | " +
          price +
          " | " +
          quantity
      );
      console.log(
        "-----------------------------------------------------------------------------------------"
      );
    }
    // Prompt the user and ask what they would like to do ...
    inquirer
      .prompt([
        {
          name: "userOrder",
          type: "input",
          message: "Pick the item number of the product you wish to purchase",
          validate: function(value) {
            if (
              isNaN(value) === false &&
              parseInt(value) <= response.length &&
              parseInt(value) > 0
            ) {
              return true;
            } else {
              return false;
            }
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "Pick a quantity of the item you wish to purchase",
          validate: function(value) {
            if (isNaN(value)) {
              return false;
            } else {
              return true;
            }
          }
        }
      ])
      .then(function(input) {
        console.log(
          "You selected a quantity of " +
            input.quantity +
            " of the product with item number " +
            input.userOrder
        );
        console.log("Processing your order now...");
        // Set new variables based on the user order
        var newItem = input.userOrder - 1;
        var newAmount = parseInt(input.quantity);
        var newTotal = parseFloat(
          (response[newItem].price * newAmount).toFixed(2)
        );
        var newAmountLeft = parseFloat(
          (response[newItem].stock_quantity - newAmount).toFixed(2)
        );

        // Check the stock, if it can be done then complete order and update stock... otherwise ask user again
        if (response[newItem].stock_quantity >= newAmount) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              { stock_quantity: response[newItem].stock_quantity - newAmount },
              { item_id: input.userOrder }
            ],
            function(error, result) {
              if (error) throw error;
              console.log(
                "Your order has been successfully placed! Your total charge is $" +
                  newTotal.toFixed(2) +
                  "."
              );
              console.log(
                "The total amount of this product left is " +
                  newAmountLeft +
                  "."
              );
              askUser();
            }
          );
        } else {
          console.log(
            "Insufficient amount in stock. Cannot fulfill your order."
          );
          askUser();
        }
      });
  });
}

// Call the function to run
init();

// Ask user if they'd like to buy something else after making a transaction
function askUser() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Would you like to order something else?",
        choices: ["sure", "nah"]
      }
    ])
    .then(inputs => {
      if (inputs.choice === "sure") {
        init();
      } else {
        connection.end();
      }
    });
}
