const Expenses = require('../models/expense');

exports.getExpenses = async (req,res,next)=>{
    const expenses = await Expenses.find();
    try{
        // res.send(expenses)
        return res.status(200).json({
            success: true,
            count : expenses.length,
            data:expenses
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            error:'server error'
        })
    }
}

exports.postExpenses = async (req,res)=>{
    const expense = new Expenses({
        name: req.body.name,
        amount: req.body.amount,
        desc: req.body.desc
    })
    expense.save((err)=>{
        if (err) {
            // res.send(err);
            res.status(400).
            json({ message: 'error' });
        } else {
            res.status(200).json({ message: 'expense created' });
        }
    })
}

exports.addExpense = async (req, res, next) => {
    try {
      const { name, amount, desc } = req.body;
      console.log(name, amount, desc);
      const expense = await Expenses.create(req.body);
  
      res.status(201).json({
        success: true,
        data: expense
      })
    } catch (err) {
      if (err.name == 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
          success: false,
          error: messages
        });
      } else {
        return res.status(500).json({
          success: false,
          error: "Server error"
        })
      }
    }
  }

exports.getExpensesById = async (req,res)=>{
    const expense = await Expenses.findById(req.params.id);
    console.log(expense)
    try{
        // res.send(expenses)
        return res.status(200).json({
            success: true,
            data:expense
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            error:'server error'
        })
    }
}

exports.deleteExpensesById = async (req,res)=>{
    try{
        const expense = await Expenses.findById(req.params.id);
        if(!expense){
            return res.status(404).json({
                success: false,
                error:'no expense found'
            })
        }
        await expense.delete();

        return res.status(200).json({
            success: true,
            data: {}
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            error:'server error'
        })
    }
}

exports.UpdateExpense = async (req, res) => {
    console.log(first)
}

exports.getExpensesByName = async (req,res,next)=>{
    const expense = await Expenses.find({name:req.params.name});
    console.log(req.params.id)
    try{
        // res.send(expenses)
        return res.status(200).json({
            success: true,
            data:expense
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            error:'server error'
        })
    }
}

exports.loggerFunc = (req, res,next)=>{
    console.log("logging")
    console.log(req.method, req.url,next)
    next();
}

exports.checkAdmin = (req, res,next)=>{
    const isAdmin =  false;
    if(!isAdmin){
            res.status(401).json({
                message:"unAuthorized access"
        })
    }
    next();
}


