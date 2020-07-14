const express = require('express');
const router = express.Router();

router.get('/games', (req, res, next) => {
  // Get a list of games
  res.send('ok. here are some games. enjoy');
});

router.post('/games', (req, res, next) => {
  // Create a game
  res.send('ok. I have created the game for you.');
});

router.patch('/games/:id', (req, res, next) => {
  // Update a game (perform the next step)
  res.send('ok. The step has been taken. Here is the current state of the game');
});

router.delete('/games/:id', (req, res, next) => {
  // End a game
  res.send('ok. The game has been closed.');
});

module.exports = router;
