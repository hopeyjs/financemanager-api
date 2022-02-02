// import model
const User = require('../../model/user');
const Finance = require('../../model/finance');

// import utilities
const crypt = require('../../utils/crypt');
const tokenGen = require('../../utils/tokenGen');



// create user
exports.createUser = async (req, res) => {
  // check for existing user
    const user = await User.findOne({ email: req.body.email });
    
    if(user) {
        return res.json({
            message: `A user with ${ user.email } already exist!, please login instead`
        })
    }

    let userFinance;
    // create finance plan
  await Finance.create({}).then(finance => {
    userFinance = finance._id
  })

  // define new user
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    finance : userFinance,
    securityquestion: req.body.securityquestion,
    securityanswer: await crypt.encrypt(req.body.securityanswer),
    password: await crypt.encrypt(req.body.password),
  };

    User.create(newUser).then(user => {
        return res.json({
            message: 'Registration successful, please proceed to login',
            user,
      })
    }).catch(err => {
        return res.json({
            message: 'an error occured while creating the user, please see error reference below.',
            err
      })
  })
}




// reset user password / ask security question
exports.getSecurityQuestion = async (req, res) => {
    // find user
    const user = await User.findOne({ email: req.body.email });

     if (user) {
       // ask security question
         return res.json({
             question: user.securityqueston
         })
     } else {
        return res.json({
          message: `The requested user with ${user.email} does not exist! please check and try again`,
        });
     }
}

// reset user password
exports.resetPassword = async (req, res) => {
  // find user & compare security answers
    const user = await User.findOne({ _id: req.params.id });

    if (user && await crypt.decrypt(req.body.securityanswer, user.securityanswer)) {
      // reset password
      const update = { password: await crypt.encrypt(req.body.newpassword) };
      Object.assign(user, update);
      user.save();
      return res.json({
          message: 'Password reset is successful. Please login with your new password.',
          data: user,
      });
  } else {
    return res.json({
      message: "specified user does not exist, please check again.",
    });
  }
}

// update user security question and answer
exports.updateSecurityDetails = async (req, res) => {
    try {

  // find user & compare security answers
        const user = await User.findOne({ _id: req.params.id });
        
        if (user) {
          // update security details
          const update = {
            securityquestion: req.body.securityquestion,
            securityanswer: await crypt.encrypt(req.body.securityanswer),
          };
          Object.assign(user, update);
          user.save();
          return res.json({
            message:
              "Security details has been updated. Please note it down as you will need it to reset your password in future.",
            data: user,
          });
        } else {
          return res.json({
            message: "Security details not updated, please try again.",
          });
        }
    } catch (error) {
        return res.json({
            message: 'An error occured',
            error
        })
    }
  
};

exports.getUser = async (req, res) => {
  const user = await User.find({_id: req.params.id});

  return res.json({
    user
  })
}

// login
exports.login = async (req, res) => {
// find user
    let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.json({
      message: "Invalid login Details!",
    });
  }

  await crypt.decrypt(req.body.password, user.password).then( async (info) => {
        if (!info) {
        return res.json({
          message: "Invalid Login Details!",
        });
      }

      let details = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        };
        
      let token = await tokenGen.getToken(details)

      // set auth token
      req.user = token;
      return res.json({
        message: "Login Successful.",
        token,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(501).render({
        status: false,
        message: "Incorrect Username or Password!",
      });
    });
};

// logout
exports.logout = async (req, res) => {
      res.clearCookie("token");
      return res.redirect("/");
}