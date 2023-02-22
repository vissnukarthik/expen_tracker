const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('express');
const { json } = require('body-parser');
const { default: mongoose } = require('mongoose');

const { getExpenses ,postExpenses,getExpensesById,getExpensesByName,addExpense,deleteExpensesById, checkAdmin, loggerFunc} = require('./controllrer/expense');

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


mongoose.connect("mongodb://0.0.0.0:27017/exp_track",{
    useNewurlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/api/v1/expenses',getExpenses)

app.post('/api/v1/expenses',loggerFunc,addExpense)

app.get('/api/v1/expenses/:id',getExpensesById)
app.get('/api/v1/expenses/name/:name',getExpensesByName)

app.delete('/api/v1/expenses/:id',deleteExpensesById)


app.get('/', (req, res) => {
    res.send("this is home")
})
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        msg : "it worked",
        status:"success"
    })
})


app.listen(3000,()=>{
        console.log("server listening")
    });