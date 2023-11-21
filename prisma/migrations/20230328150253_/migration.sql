CREATE TABLE salesorder (
    salesorder_id INTEGER PRIMARY KEY,
    salesorder_no VARCHAR,
    user_id INTEGER,
    product VARCHAR,
    order_status VARCHAR,
    customer_name VARCHAR,
    shipping_cost DECIMAL(10, 2),
    sub_total DECIMAL(10, 2),
    is_verified BOOLEAN,
    image_payment varchar
);

CREATE TABLE salesorder_detail (
    salesorder_detail_id INTEGER PRIMARY KEY,
    salesorder_id INTEGER,
    item_id INTEGER,
    item_price DECIMAL(10, 2),
    quantity INTEGER,
    FOREIGN KEY (salesorder_id) REFERENCES salesorder(salesorder_id),
    FOREIGN KEY (item_id) REFERENCES item(item_id)
);

CREATE TABLE user (
    user_id INTEGER PRIMARY KEY,
    username VARCHAR,
    email VARCHAR,
    password VARCHAR,
    address VARCHAR,
    full_name VARCHAR,
    phone VARCHAR,
    role VARCHAR
);

CREATE TABLE item (
    item_id INTEGER PRIMARY KEY,
    feedback_id INTEGER,
    item_name VARCHAR,
    price DECIMAL(10, 2),
    description VARCHAR,
    color VARCHAR,
    package_weight INTEGER,
    stock_item INTEGER,
    FOREIGN KEY (feedback_id) REFERENCES feedback(feedback_id)
);

CREATE TABLE feedback (
    feedback_id INTEGER PRIMARY KEY,
    item_id INTEGER,
    rating INTEGER,
    description VARCHAR,
    FOREIGN KEY (item_id) REFERENCES item(item_id)
);

CREATE TABLE item_image (
    item_image_id INTEGER PRIMARY KEY,
    item_id INTEGER,
    image_url VARCHAR,
    FOREIGN KEY (item_id) REFERENCES item(item_id)
);

CREATE TABLE warehouse (
    warehouse_id INTEGER PRIMARY KEY,
    item_id INTEGER,
    city VARCHAR,
    province VARCHAR,
    FOREIGN KEY (item_id) REFERENCES item(item_id)
);

CREATE TABLE warehouse_item (
    warehouse_id INTEGER,
    item_id INTEGER,
    PRIMARY KEY (warehouse_id, item_id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id),
    FOREIGN KEY (item_id) REFERENCES item(item_id)
);
