import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js'

// S'identifier
export const signin = async (req, res) => {
    const {email, password} = req.body; //  destructuring

    try {
        // Or not destructuration const existingUser = await User.findOne({ email: req.body.email })
        const existingUser = await User.findOne({ email });
        // if no existingUser
        if(!existingUser) return res.status(404).json({message: "User doesn't exist"})  

        //bcrypt to compare the hashed password and see if they're the same
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        // if no isPasswordCorrect
        if(!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials'})

        const token = jwt.sign({ email: existingUser.email, id:existingUser._id }, 'test', { expiresIn: '1h' } )
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: `Something went wrong ${error}`})
        console.log(error);
    }
}
// S'inscrire
export const signup = async (req, res) => {
    const {email, password, firstName, lastName, confirmPassword } = req.body; // destructuring

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({message: "User already exist"}) 
        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match"})

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`})

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' } )

        res.status(200).json({ result, token })

        
    } catch (error) {
        res.status(500).json({ message: `Something went wrong ${error}`})
        
    }
}