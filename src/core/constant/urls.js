const base = 'http://localhost:7200/api/v1';
export const urls = Object.freeze({
  base,
  user: {
    register: base + '/register',
    login: base + '/login',
    update: base + '/update'
  },
  foodCategory: {
    create: base + '/category/addCategory',
    get: base + '/category/getCategory',
    update: base + '/category/updateCategory/:id',
    delete: base + '/category/deleteCategory/:id'
  },
  item: {
    create: base + '/item/addItem',
    get: base + '/item/getItems',
    update: base + '/item/updateItem/:id',
    delete: base + '/item/deleteItem/:id'
  },
  modifier: {
    create: base + '/modifier/addModifier',
    get: base + '/modifier/getModifiers',
    update: base + '/modifier/updateModifier/:id',
    delete: base + '/modifier/deleteModifier/:id'
  },
  ingredient: {
    create: base + '/ingredient/addIngredient',
    get: base + '/ingredient/getIngredients',
    update: base + '/ingredient/updateIngredient/:id',
    delete: base + '/ingredient/deleteIngredient/:id'
  },
  expenseType: {
    create: base + '/expenseType/addExpenseType',
    get: base + '/expenseType/getExpenseTypes',
    update: base + '/expenseType/updateExpenseType/:id',
    delete: base + '/expenseType/softDeleteExpenseType/:id'
  },
  expense: {
    create: base + '/expense/addExpense',
    get: base + '/expense/getExpenses',
    update: base + '/expense/updateExpense/:id',
    delete: base + '/expense/deleteExpense/:id'
  },
  order: {
    create: base + '/order/addorder',
    get: base + '/order/getorders',
    getbyid: base + '/order/fetchOrder/:id'
  },
  customer: {
    create: base + '/customer/addCustomer',
    get: base + '/customer/getCustomers',
    getbyid: base + '/customer/fetchCustomer/:id'
  },
  payment: {
    create: base + '/payment/addPayment',
    get: base + '/payment/getPayments',
    getbyid: base + '/payment/fetchPayment/:id'
  },
  invoice: {
    create: base + '/invoice/addInvoice',
    get: base + '/invoice/getInvoices',
    getbyid: base + '/invoice/fetchInvoice/:id',
    getbyorderid: base + '/invoice/fetchInvoiceByOrderId/:id'
  }
});
