const express = require('express');
const router = express.Router();

// TODO: Replace this with proper database storage
const games = [
  {id: 1, name: 'Game 1'},
  {id: 2, name: 'Other Game'}
];

router.get('/games', (req, res) => {
  res.json(games);
});

router.get('/games/:id', (req, res) => {
  const game = games.find(g => g.id == req.params.id);
  if (game) {
    res.json(game);
  } else {
    res.status(404).json({ message: 'not found' });
  }
});

router.post('/games', (req, res) => {
  res.json({message: 'not implemented'});
});

router.patch('/games/:id', (req, res, next) => {
  res.json({message: 'not implemented'});
});

router.delete('/games/:id', (req, res, next) => {
  res.json({message: 'not implemented'});
});

module.exports = router;
