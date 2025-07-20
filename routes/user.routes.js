const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// GET: Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

// POST: Register User
router.post(
    '/register',
    body('email').trim().isEmail().isLength({ min: 13 }).withMessage('Invalid email'),
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: 'Invalid data' });
        }

        const { email, password, username } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            email,
            username,
            password: hashPassword,
        });

        res.json(newUser);
    }
);

// GET: Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// POST: Login
router.post(
    '/login',
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array(), message: 'Invalid data' });
        }

        const { username, password } = req.body;

        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Username or password is incorrect' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Username or password is incorrect' });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                username: user.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hour
        });

        res.send('Logged in');
    }
);

// GET: Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.send('Logged out');
});

module.exports = router;
