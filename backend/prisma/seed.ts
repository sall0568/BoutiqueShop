import { PrismaClient, UserRole } from '@prisma/client';
import { PasswordUtil } from '../src/utils/password.util';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create demo store
  const store = await prisma.store.create({
    data: {
      name: 'Boutique Demo',
      address: 'Abidjan, Cocody',
      phone: '+225 07 00 00 00 00',
      email: 'demo@boutique.ci',
      currency: 'XOF',
      taxRate: 18,
    },
  });

  console.log('✅ Store created:', store.name);

  // Create admin user
  const hashedPassword = await PasswordUtil.hash('admin123');
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@demo.ci',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'Demo',
      phone: '+225 07 00 00 00 00',
      role: UserRole.ADMIN,
      storeId: store.id,
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create employee user
  const employeeUser = await prisma.user.create({
    data: {
      email: 'employee@demo.ci',
      password: hashedPassword,
      firstName: 'Employé',
      lastName: 'Demo',
      phone: '+225 07 00 00 00 01',
      role: UserRole.EMPLOYEE,
      storeId: store.id,
    },
  });

  console.log('✅ Employee user created:', employeeUser.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Boissons',
        description: 'Boissons diverses',
        storeId: store.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Alimentaire',
        description: 'Produits alimentaires',
        storeId: store.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Hygiène',
        description: 'Produits d\'hygiène',
        storeId: store.id,
      },
    }),
  ]);

  console.log(`✅ ${categories.length} categories created`);

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Coca-Cola 50cl',
        sku: 'COCA-50',
        barcode: '5449000000996',
        price: 500,
        cost: 350,
        quantity: 100,
        minQuantity: 20,
        unit: 'bouteille',
        categoryId: categories[0].id,
        storeId: store.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Pain de blé',
        sku: 'PAIN-BLE',
        price: 300,
        cost: 200,
        quantity: 50,
        minQuantity: 10,
        unit: 'pièce',
        categoryId: categories[1].id,
        storeId: store.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Savon Lux',
        sku: 'SAVON-LUX',
        barcode: '8712561234567',
        price: 450,
        cost: 300,
        quantity: 75,
        minQuantity: 15,
        unit: 'pièce',
        categoryId: categories[2].id,
        storeId: store.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Riz 5kg',
        sku: 'RIZ-5KG',
        price: 3500,
        cost: 2800,
        quantity: 30,
        minQuantity: 10,
        unit: 'sac',
        categoryId: categories[1].id,
        storeId: store.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Eau minérale 1.5L',
        sku: 'EAU-15L',
        price: 400,
        cost: 250,
        quantity: 120,
        minQuantity: 25,
        unit: 'bouteille',
        categoryId: categories[0].id,
        storeId: store.id,
      },
    }),
  ]);

  console.log(`✅ ${products.length} products created`);

  // Create sample sale
  const sale = await prisma.sale.create({
    data: {
      saleNumber: `VT-${Date.now()}`,
      totalAmount: 1200,
      discount: 0,
      tax: 216,
      finalAmount: 1416,
      paymentMethod: 'CASH',
      customerName: 'Client Demo',
      userId: adminUser.id,
      storeId: store.id,
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 2,
            unitPrice: 500,
            discount: 0,
            subtotal: 1000,
          },
          {
            productId: products[1].id,
            quantity: 1,
            unitPrice: 300,
            discount: 100,
            subtotal: 200,
          },
        ],
      },
    },
  });

  // Update product quantities
  await prisma.product.update({
    where: { id: products[0].id },
    data: { quantity: { decrement: 2 } },
  });

  await prisma.product.update({
    where: { id: products[1].id },
    data: { quantity: { decrement: 1 } },
  });

  console.log('✅ Sample sale created:', sale.saleNumber);

  // Create sample expenses
  const expenses = await Promise.all([
    prisma.expense.create({
      data: {
        description: 'Électricité',
        amount: 25000,
        category: 'Factures',
        userId: adminUser.id,
        storeId: store.id,
      },
    }),
    prisma.expense.create({
      data: {
        description: 'Fournitures de bureau',
        amount: 15000,
        category: 'Fournitures',
        userId: adminUser.id,
        storeId: store.id,
      },
    }),
  ]);

  console.log(`✅ ${expenses.length} expenses created`);

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📝 Demo credentials:');
  console.log('Admin: admin@demo.ci / admin123');
  console.log('Employee: employee@demo.ci / admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });