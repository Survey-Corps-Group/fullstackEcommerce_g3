const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@surveycorps.com",
      password: "admin",
      address: "1234 Main St",
      full_name: "Test User",
      phone: "555-1234",
      role: "admin",
    },
  });

  // Create an item
  const item = await prisma.item.create({
    data: {
      item_name: "Sample Item",
      price: 19.99,
      description: "A sample item for testing",
      color: "red",
      package_weight: 2,
      stock_item: 50,
    },
  });

  // Create feedback for the item
  await prisma.feedback.create({
    data: {
      item_id: item.item_id,
      rating: 5,
      description: "Great product!",
    },
  });

  // Create an item image
  await prisma.itemImage.create({
    data: {
      item_id: item.item_id,
      image_url: "http://example.com/image.jpg",
    },
  });

  // Create a warehouse
  const warehouse = await prisma.warehouse.create({
    data: {
      city: "Warehouse City",
      province: "Warehouse Province",
    },
  });

  // Link item to warehouse through WarehouseItem
  await prisma.warehouseItem.create({
    data: {
      warehouse_id: warehouse.warehouse_id,
      item_id: item.item_id,
    },
  });

  // Create a sales order
  const salesOrder = await prisma.salesOrder.create({
    data: {
      salesorder_no: "SO12345",
      user_id: user.user_id,
      product: "Sample Product",
      order_status: "processed",
      customer_name: user.full_name,
      shipping_cost: 5.99,
      sub_total: 19.99,
      is_verified: true,
      image_payment: "http://example.com/payment.jpg",
    },
  });

  // Create sales order detail
  await prisma.salesOrderDetail.create({
    data: {
      salesorder_id: salesOrder.salesorder_id,
      item_id: item.item_id,
      item_price: item.price,
      quantity: 1,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
