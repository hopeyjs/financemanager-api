// import model
const User = require("../../model/user");


// create Income
exports.createIncome = async (req, res) => {
// find user
const user = await User.findById({_id: req.params.id})
if (!user) {
    return res.json({
        error: "No user found."
    })
}

// push income into array
user.incomes.push(req.body)

user.save();
return res.json({
    user
})
}

// get Incomes
exports.getIncomes = async (req, res) => {
    // find user
const user = await User.findById({_id: req.params.id})
if (!user) {
    return res.json({
        error: "No user found."
    })
}

return res.json({
    income: user.incomes
})
}