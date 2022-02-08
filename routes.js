const express = require('express');
const app = express();

// import controllers
const AuthController = require('./controllers/authentication/auth.controller');
const ExpenseController = require('./controllers/expense/expense.controller');
const IncomeController = require('./controllers/income/income.controller');

// import middlewares

// check api status
app.get('/api', (req, res) => {
    return res.send("server is up and running");
})

// auth
app.post('/user', AuthController.createUser);
app.get('/users', AuthController.getUser);
app.get('/user/:id', AuthController.getUser);
app.post('/user/passwordreset/', AuthController.getSecurityQuestion);
app.patch('/user/passwordreset/:id', AuthController.resetPassword);
app.patch('/user/updatesecuritydetails/:id', AuthController.updateSecurityDetails);
app.post('/login', AuthController.login);
app.post('/logout', AuthController.logout);

// expense routes
app.post('/user/:id/expense', ExpenseController.createExpense);
app.get('/user/:id/expenses', ExpenseController.getExpenses);

// expense routes
app.post('/user/:id/income', IncomeController.createIncome);
app.get('/user/:id/incomes', IncomeController.getIncomes);

module.exports = app