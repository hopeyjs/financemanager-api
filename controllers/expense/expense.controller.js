// import model
const User = require("../../model/user");


// create expense
exports.createExpense = async (req, res) => {
// find user
const user = await User.findById({_id: req.params.id})
if (!user) {
    return res.json({
        error: "No user found."
    })
}

// push expense into array
user.expenses.push(req.body)

user.save();
return res.json({
    user
})
}

// get expenses
exports.getExpenses = async (req, res) => {
    // find user
const user = await User.findById({_id: req.params.id})
if (!user) {
    return res.json({
        error: "No user found."
    })
}

return res.json({
    expenses: user.expenses
})
}