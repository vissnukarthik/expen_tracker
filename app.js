const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('express');
const { json } = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("this is home")
})
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        msg : "it worked",
        status:"success"
    })
})

const expenses = [
    { id:1, name:"movie",amount:500,desc:"RRR" },
    { id:2, name:"food",amount:200,desc:"dosai"},
    { id:3, name:"shoe",amount:2000,desc:"nike shoe"},
]

const desc = [
    {id:1,detail:"went to inox in cbe with sanjeev  "},
    {id:2,detail:"went Star briyani opposite to KMCH to eat"},
    {id:3,detail:"bought shoe near 100ft road in cbe "}

]

const paymet = [
    {id:1,paymet:"UPI"},
    {id:2,paymet:"cash"},
    {id:3,paymet:"card"}
]

app.post('/api/v1/expense',(req, res) => {
   // console.log(req.body);
    let newExp = req.body
    newExp.id = expenses[expenses.length - 1].id+1;
    console.log(newExp)
    let newPay = {
        id:expenses[expenses.length - 1].id+1,
        paymet:newExp.payment
    }
    expenses.push(newExp);
    paymet.push(newPay);
    res.send("created new expsenses")
    res.status(201),json(newExp)
})

app.delete("/api/v1/expense/:id",(req,res) =>{
    for(let  i =0;i<expenses.length;i++){
        if(expenses[i].id==req.params.id){
            expenses.splice(i,1);
            res.send("deleted expense ");
        }
    }
    
})

app.put('/api/v1/expense/:id',(req,res) =>{
    console.log(req.body)
    for (let i = 0; i < expenses.length; i++) {
        if(expenses[i].id==req.params.id){
            if(req.body.amount) expenses[i].amount = req.body.amount
        }
    }
    res.send("updated")
})

app.get('/api/v1/expense/pay/:id', (req, res) => {
    console.log(req.params)
    let chk = true;

    const detail_exp = expenses.filter( i => ( i.id == req.params.id))[0]
   
    const pay = paymet.filter( i => ( i.id == req.params.id))[0]

    detail_exp["pay"] = pay.paymet;
    res.status(200).json(detail_exp)


    res.status(200).json({
        status:"not found"
    })

})


app.get('/api/v1/expense/detail/:id', (req, res) => {
    console.log(req.params)
    let chk = true;
    for (var i in expenses){
        if(expenses[i].id == req.params.id){

            

            let detail_exp = expenses[i]
            detail_exp.detail = desc[i]["detail"]

            const pay = paymet.filter( i => ( i.id == req.params.id))[0]
            detail_exp["pay"] = pay.paymet;

            res.status(200).json(detail_exp)
            chk = false
        }
    }
    if(chk)      
    res.status(200).json({
        status:"not found"
    })
})

app.get('/api/v1/expense/:id', (req, res) => {
    console.log(req.params)
    let chk = true;
    for (var i in expenses){
        if(expenses[i].id == req.params.id)
            res.status(200).json(expenses[i])
            chk = false
    }
    if(chk)    
        res.status(200).json({
        status:"not found"
    })
})

app.get('/api/v1/expense', (req, res) => {
    res.status(200).json(expenses)
})
app.listen(8080,()=>{
    console.log("server listening")
});