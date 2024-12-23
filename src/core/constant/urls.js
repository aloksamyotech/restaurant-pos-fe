const base='http://localhost:7200/api/v1';
export const urls = Object.freeze({
    base,
    user: {
        register: base + '/register',
        login: base + '/login',
        update: base + '/update',
    },
    foodCategory: {
        create: base + '/category/addCategory',
        get: base + '/category/getCategory'
    },
    modifier: {
        create: base + '/modifier/addModifier',
        get: base + '/modifier/getModifiers',
        update: base + '/modifier/updateModifier/:id', 
        delete:  base + '/modifier/deleteModifier/:id' 
    },    
    ingredient: {
        create: base + '/ingredient/addIngredient',
        get: base + '/ingredient/getIngredients',
        update: base + '/ingredient/updateIngredient/:id', 
        delete:  base + '/ingredient/deleteIngredient/:id' 
    }, 
    expenseType: {
        create: base + '/expenseType/addExpenseType',
        get: base + '/expenseType/getExpenseTypes',
        update: base + '/expenseType/updateExpenseType/:id', 
        delete:  base + '/expenseType/softDeleteExpenseType/:id' 
    }
    }
);