const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// login
// create a new user, username, password, email required
// get user info, username/location/email/profile picture/scores from games
// update user info, location/profile picture
// delete user

// login check if username and password match
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.email }});
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email, please try again! '});
            return;
        };
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password, please try again! '});
            return;
        };
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in! '});
        });
    }
    catch (err) {
        res.status(400).json(err);
    };
});

// create a new user, username, password, email required
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    }
    catch (err) {
        res.status(400).json(err);
    };
});

// get user info, username/location/email/profile picture/scores from games
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
        });
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// update user info, location/profile picture
router.put('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id,
            },
        });
        if (!userData[0]) {
            res.status(404).json({ message: 'No user found with this id! '});
            return;
        };
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// delete user
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id! '});
            return;
        };
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    };
});
