-- CreateEnum
CREATE TYPE "Role" AS ENUM ('customer', 'admin');

-- CreateTable
CREATE TABLE "SalesOrder" (
    "salesorder_id" SERIAL NOT NULL,
    "salesorder_no" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "order_status" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "shipping_cost" DOUBLE PRECISION NOT NULL,
    "sub_total" DOUBLE PRECISION NOT NULL,
    "is_verified" BOOLEAN NOT NULL,
    "image_payment" TEXT NOT NULL,

    CONSTRAINT "SalesOrder_pkey" PRIMARY KEY ("salesorder_id")
);

-- CreateTable
CREATE TABLE "SalesOrderDetail" (
    "salesorder_detail_id" SERIAL NOT NULL,
    "salesorder_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "item_price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "SalesOrderDetail_pkey" PRIMARY KEY ("salesorder_detail_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'customer',
    "address" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,
    "province_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Warehouse" (
    "warehouse_id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,
    "province_id" INTEGER NOT NULL,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("warehouse_id")
);

-- CreateTable
CREATE TABLE "Item" (
    "item_id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "package_weight" INTEGER NOT NULL,
    "stock_item" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "feedback_id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateTable
CREATE TABLE "ItemImage" (
    "item_image_id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "ItemImage_pkey" PRIMARY KEY ("item_image_id")
);

-- CreateTable
CREATE TABLE "WarehouseItem" (
    "warehouse_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "WarehouseItem_pkey" PRIMARY KEY ("warehouse_id","item_id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "cartId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cartId")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "cartId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("cartId","itemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "SalesOrder" ADD CONSTRAINT "SalesOrder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrderDetail" ADD CONSTRAINT "SalesOrderDetail_salesorder_id_fkey" FOREIGN KEY ("salesorder_id") REFERENCES "SalesOrder"("salesorder_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrderDetail" ADD CONSTRAINT "SalesOrderDetail_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemImage" ADD CONSTRAINT "ItemImage_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseItem" ADD CONSTRAINT "WarehouseItem_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "Warehouse"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseItem" ADD CONSTRAINT "WarehouseItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("cartId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;
