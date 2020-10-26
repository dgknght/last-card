const express = require('express');
const router = express.Router();
const Games = require('../db/games');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/games', (req, res) => {
  new Games().search()
    .then(games => res.json(games))
    .catch(err => {
      console.dir(err);
      res.status(500).json({error: err.message})
    });
});

router.get('/games/:id', (req, res) => {
  new Games().find(req.params.id)
    .then(game => {
      if (game == null) {
        res.status(404).json({ message: 'not found' });
      } else {
        res.json(game);
      }
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ message: e })
    });
});

router.post('/games', (req, res) => {
  const game = req.body;
  new Games().create(game).then(id => {
    game.id = id;
    res.status(201).json(game);
  });
});

router.patch('/games/:id', (req, res, next) => {
  res.json({message: 'not implemented'});
});

router.delete('/games/:id', (req, res, next) => {
  new Games().destroy(req.params.id)
    .then(r => res.status(204).json())
});

router.use((err, req, res, next) => {
  console.error('api error', err);
  res.status(500).json({ error: err.message || err.toString()});
});

module.exports = router;
