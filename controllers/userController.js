const asyncHandler = require("express-async-handler");
const User = require("../modules/userModule");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// @desc Register Users
// @route POST api/users/register
// @access public
const registerUser = asyncHandler(
    async (req,res,next) => {
        const {username,email,password} = req.body;

        if (!username || !email || !password) {
            res.status(400);
            throw new Error("All fields are required!");
        }

        const userAvailable = await User.findOne({email});

        if (userAvailable) {
            res.status(400);
            throw new Error("User already registered")
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            username,
            email,
            password:hashedPassword
        });

        console.log({user});

        if (user) {
            return res.status(201)
            .json({
                message: "Registration Successful",
                _id: user.id,
                email: user.email
            });
        }else{
            res.status(400);
            throw new Error("Registration Failed");
        }
    }
)

// @desc Login Users
// @route POST api/users/login
// @access public
const loginUser = asyncHandler(
    async (req,res,next) => {

        const {email,password} = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are required!");
        }
        const user = await User.findOne({email});

        if (user && bcrypt.compare(password,user.password)) {
            const accessToken = jwt.sign(
                {
                    user:{
                        id:user.id,
                        email:user.email,
                        username: user.username
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "15m"
                }
            )

            return res.status(200)
            .json({
                message: "Login Successful",
                accessToken
            })
        }else{
            res.status(401);
            throw new Error("Email or password is not valid!");
        }

    }
)

// @desc Current User Info
// @route GET api/users/current
// @access private
const currentUser = asyncHandler(
    async (req,res,next) => {
        const user = req.user;
        return res.status(200)
            .json({
                message: "Reached Current User",
                user
            });
    }
)


module.exports = {
    registerUser,
    loginUser,
    currentUser,
}