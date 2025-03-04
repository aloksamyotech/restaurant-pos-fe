const base = 'http://localhost:7200/api/v1';
const imageBase = 'http://localhost:7200';
// let base = 'http://165.22.218.55:7200/api/v1'
export const urls = Object.freeze({
  base,
  employee: {
    create: base + '/employee/addEmployee',
    login: base + '/employee/login',
    update: base + '/employee/updateEmployee/:id',
    updatePermissions: base + '/employee/updateEmployeePermissions/:id',
    delete: base + '/employee/deleteEmployee/:id',
    get: base + '/employee/getEmployees',
    getbyid: base + '/employee/fetchEmployee/:id'
  },
  foodCategory: {
    create: base + '/category/addCategory',
    get: base + '/category/getCategory',
    update: base + '/category/updateCategory/:id',
    delete: base + '/category/deleteCategory/:id',
    bulkUpload: base + '/category/bulkUploadCategory',
    image: imageBase
  },
  item: {
    create: base + '/item/addItem',
    get: base + '/item/getItems',
    update: base + '/item/updateItem/:id',
    delete: base + '/item/deleteItem/:id',
    image: imageBase
  },
  modifier: {
    create: base + '/modifier/addModifier',
    get: base + '/modifier/getModifiers',
    update: base + '/modifier/updateModifier/:id',
    delete: base + '/modifier/deleteModifier/:id'
  },
  table: {
    create: base + '/table/addTable',
    get: base + '/table/getTable',
    update: base + '/table/updateTable/:id',
    delete: base + '/table/deleteTable/:id'
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
    getbyid: base + '/order/fetchOrder/:id',
    getorderbycustomerid: base + '/order/getorderbycustomerid/:id'
  },
  customer: {
    create: base + '/customer/addCustomer',
    get: base + '/customer/getCustomers',
    getbyid: base + '/customer/fetchCustomer/:id',
    getCustomerByPhone: base + '/customer/getCustomerByPhone/:id'
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
  },
  kitchen: {
    create: base + '/kitchen/addKitchenOrder',
    get: base + '/kitchen/findAllKitchenOrder',
    getSingleOrder: base + '/kitchen/findAllKitchenOrderById/:id'
  }
});
