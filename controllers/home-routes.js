const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id
    },
    attributes: [
      'id',
      'instrument',
      'brand_name',
      'price',
      'url',
    ],
       include: [
         {
           model: User,
           attributes:['id','email']
         }
     ]
  })
  .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

// route to login.handlebars page
router.get('/login', (req, res) => {
    if (req.session.loggedin) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

  module.exports = router;