const router = require('express').Router();
const { Game, User, HighScore1, HighScore2, HighScore3, HighScore4 } = require('../../models');
const withAuth = require('../../utils/auth');

// get all game data
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
                },
            ],
        })
        const games = gameData.map((game) => game.get({ plain: true }));
        res.render('game', {
            games,
            logged_in: req.session.logged_in,
        })        
    }
    catch (err) {
        res.status(500).json(err);
    };
});

//user clicks on profile button, take them to profile page
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
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
                    attributes: ['name'],
                },
            ],
        });
        const user = userData.get({ plain: true });
        res.render('profile', {
            ...user,
            logged_in: true,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
})