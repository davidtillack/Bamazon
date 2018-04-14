create database bamazon;

use bamazon;

create table products (
	item_id integer(11) not null,
	product_name varchar(50),
	department_name varchar(50),
	price integer(11),
	stock_quantity integer(11)
);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (1, "grapes", "produce", 2.79, 100);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (2, "almond milk", "produce", 4.00, 50);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (3, "yogurt", "produce", 4.99, 25);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (4, "pants", "clothing", 45.99, 150);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (5, "belt", "accessories", 19.99, 15);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (6, "nerf gun", "toys", 29.99, 200);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (7, "ipad", "electronics", 499.00, 140);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (8, "bowl", "kitchenware", 10.00, 35);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (9, "spoon", "kitchenware", 4.99, 500);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (10, "pen", "office supplies", 1.00, 20);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (11, "rug", "home", 30.00, 80);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (12, "lamp", "home", 50.00, 6);

select * from products;