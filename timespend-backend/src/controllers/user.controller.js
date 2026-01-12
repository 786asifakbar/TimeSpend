import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { generateToken } from "../utills/generateToken.js";

// REGISTER
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);


        // if (!name || !email || !password) {
        //     return res.status(400).json({ message: "All fields are required" });
        // }

        // const userExists = await User.findOne({ email });
        // if (userExists) {
        //     return res.status(400).json({ message: "User already exists" });
        // }

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        // const user = await User.create({
        //     name,
        //     email,
        //     password: hashedPassword
        // });

        // res.status(201).json({
        //     message: "User registered successfully",
        //     token: generateToken(user._id),
        //     user: {
        //         id: user._id,
        //         name: user.name,
        //         email: user.email
        //     }
        // });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// LOGIN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login successful",
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    registerUser,
    loginUser,

}