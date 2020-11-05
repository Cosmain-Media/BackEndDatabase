const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");


// firstName
// lastName
// email
// password
// favoritedVideos

exports.createUser = async (req, res) => {
    await bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            favoritedVideos: []
        });
        user
            .save()
            .then(result => {
                res.status(201).json({
                    message: "User created!",
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                });
            });
    });
};

exports.userLogin = (req, res) => {
    let fetchedUser;
    console.log(req.body.email);
    User.findOne({ email: req.body.email })
        .then(user => {
            //console.log(req.body.password) ;
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            });
        })
        .catch(err => {
            console.log(err.message);
            return res.status(401).json({
                message: "Invalid authentication credentials!"
            });
        });
};

exports.getUser = (req, res, next) => {
    const userId = req.params.id;
    // Find function, returns array of all videos of this type
    User.findById( userId ,
        (err, success) => {
            if (err) {
                console.log(err.message);
            }
            console.log('success');
        })
        .then(user => {res.status(200).json(user);})
        .catch(err => console.log(err.message)); // Sending videos to front end of this type
}