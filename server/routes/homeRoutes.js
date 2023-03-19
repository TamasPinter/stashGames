// get games from database, include images, descriptions, top 5 scores

const router = require('express').Router();
const { Game, User, HighScore1, HighScore2, HighScore3, HighScore4 } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const gameData = await Game.findAll({
            include: [
                {
                    model: HighScore1,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: HighScore2,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: HighScore3,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: HighScore4,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });
        const games = gameData.map((game) => game.get({ plain: true }));
        res.render('homepage', {
            games,
            logged_in: req.session.logged_in,
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//if user clicks on a game, check if theyre logged in, if so, render game page
router.get('/game/:id', withAuth, async (req, res) => {
     try {
        const gameData = await Game.findByPk(req.params.id, {
            include: [
                {
                    model: HighScore1,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: HighScore2,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: HighScore3,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: HighScore4,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        }),
        game = gameData.get({ plain: true });
        res.render('game', {
            game,
            logged_in: req.session.logged_in,
        });
     }
        catch (err) {
            res.status(500).json(err);
        }
});

//if user clicks on a game, if not logged in redirect to login page
router.get('/game/:id', async (req, res) => {
    try {
        const gameData = await Game.findByPk(req.params.id, {
            include: [
                {
                    model: HighScore1,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: HighScore2,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: HighScore3,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: HighScore4,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        }),
        game = gameData.get({ plain: true });
        res.render('login', {
            game,
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// user clicks on profile page, check if logged in, if so, render profile page, if not, redirect to login page
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            
            include: [
                {
                    model: HighScore1,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: HighScore2,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: HighScore3,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: HighScore4,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: Game,
                    attributes: ['name', 'description', 'image'],
                }
            ],
        });
        const user = userData.get({ plain: true });
        res.render('profile', {
            user,
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// user clicks on profile page, if not logged in, redirect to login page
router.get('/profile', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            
            include: [
                {
                    model: HighScore1,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: HighScore2,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: HighScore3,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: HighScore4,
                    attributes: ['score', 'user_id', 'game_id'],
                },
                {
                    model: Game,

                    attributes: ['name', 'description', 'image'],
                }
            ],
        });
        const user = userData.get({ plain: true });
        res.render('login', {
            user,
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// if user clicks on login, take them to login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
});

module.exports = router;