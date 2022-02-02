// import model
const User = require("../../model/user");
const Finance = require("../../model/finance");


// create expense category
exports.createCategory = async (req, res) => {
// find user
const user = await User.findById({_id: req.params.id})
if (!user) {
    return res.json({
        error: "No user found."
    })
}
// console.log(user.finance)
// find user's finance and push category into expenses
const userFinance = Finance.findOne({_id: new ObjectId("61fb0aadac6117ba86981d98")});
// console.log(userFinance)
return res.json({
    userFinance
})
}

// get expense categories
exports.getCategories = async (req, res) => {
    
}

// update expense category
exports.updateCategory = async (req, res) => {
    
}

// delete expense category
exports.Category = async (req, res) => {
    
}


exports.getUserFinance = async (req, res) => {
    const userFinance = await Finance.find({_id: req.params.id});

    return res.json({
        userFinance
    })
}