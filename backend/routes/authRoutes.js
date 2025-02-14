import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from 'express';
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        res.status(401).json({ message: 'User already exist' })
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
        res.json({ token, message: 'User registered' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
        res.json({ token, message: 'login success' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
router.post('/check', async (req, res) => {
    const { token } = req.body;
    try {
        const userid = jwt.verify(token, process.env.JWT_SECRET);
        console.log("userid",userid)
        if (userid) {
            res.json({islogined: true})
        }
        else res.json({islogined: false})
    } catch (error) {
        res.json({islogined: false})
    }

});
export default router;