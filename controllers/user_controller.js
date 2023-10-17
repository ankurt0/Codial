const User = require('../models/user');

module.exports.profile = function (req, res) {
    User.findById(req.params.id).then((user) => {
        return res.render('profile',
            { title: 'Profile', profileUser: user }
        );
    })

}

module.exports.update = function (req, res) {
    if (req.params.id == req.user.id) {
        User.findByIdAndUpdate(req.params.id, req.body)
            .then(() => {
                return res.redirect('back');
            })
            .catch((err) => {
                console.log("problem in updating User", err);
                return;
            })
    }
    else{
        return res.status(404).send('not eligible to update user');
    }
}

module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('profile');
    }
    return res.render('userSignUp', { title: 'Sign Up' });
}

module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('profile');
    }
    return res.render('userSignIn', { title: 'Sign In' });
}

module.exports.createUser = function (req, res) {
    // console.log(req.body);
    User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
    })
        .then(() => {
            console.log("succesfully created user");
        })
        .catch((err) => {
            console.log("getting some difficulty in registering user", err);
            return;
        })
    return res.redirect('signIn');
}

module.exports.createSession = function (req, res) {
    req.flash('success','Logged In successfully!');
    return res.redirect('/');
}

module.exports.destroySession =async function (req, res,next) {
    await req.logout(function(err) {
        if (err) { console.log("Error in logout ",err); }
    })
    await req.flash('success','You have logged out!');

    return res.redirect('/');
}