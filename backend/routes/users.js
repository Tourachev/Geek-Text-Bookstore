const POOL = require('../custom_modules/db-pool');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

var express = require('express');
var router = express.Router();

router.post(
    '/',
    [
        check('fname', 'Please enter a value')
            .not()
            .isEmpty(),
        check('lname', 'Please enter a value')
            .not()
            .isEmpty(),
        check('username', 'Please enter a value')
            .not()
            .isEmpty(),
        check('password', 'Please enter a value')
            .not()
            .isEmpty(),
        check('email', 'Please enter a value')
            .not()
            .isEmpty(),
        check('email', 'Please enter a valid email')
            .not()
            .isEmpty()
            .isEmail(),
        check('password', 'Please enter a password with at least 6 characters')
            .not()
            .isEmpty()
            .isLength({ min: 6 })
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fname, lname, username, email, password } = req.body;

        console.log(req.body);

        //VALIDATE USER EXISTENCE HERE

        try {
            user = {
                fname,
                lname,
                username,
                email,
                password
            };

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            console.log(user.username);
            console.log(user.password);

            POOL.query('INSERT INTO credentials VALUES (userid, password)', [
                toString(user.username),
                toString(user.password)
            ]);

            console.log('sent');
        } catch (err) {
            console.log(err);
        }

        res.send('Good to go bud!');
    }
);

module.exports = router;
