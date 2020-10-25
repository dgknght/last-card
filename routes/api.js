const express = require('express');
const router = express.Router();
const { MongoClient, ObjectID } = require('mongodb');

async function fetchGames() {
  const client = new MongoClient(process.env.MONGODB_URL, { useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db(process.env.MONGODB_DATABASE);
    const collection = database.collection('games');
    const cursor = collection.find({}, { limit: 100 });
    return await cursor.toArray()
  } finally {
    client.close();
  }
}

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/games', (req, res) => {
  fetchGames()
    .then(games => res.json(games))
    .catch(err => {
      console.dir(err);
      res.status(500).json({error: err.message})
    });
});

async function findGame(id) {
  const client = new MongoClient(process.env.MONGODB_URL, { useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db(process.env.MONGODB_DATABASE);
    const collection = database.collection('games');
    return await collection.findOne({ _id: ObjectID(id) });
  } finally {
    client.close();
  }
}

router.get('/games/:id', (req, res) => {
  findGame(req.params.id)
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

async function createGame(game) {
  const client = new MongoClient(process.env.MONGODB_URL, { useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db(process.env.MONGODB_DATABASE);
    const collection = database.collection('games');
    const result = await collection.insert(game);
    return result.insertedId;
  } finally {
    client.close();
  }
}

router.post('/games', (req, res) => {
  const game = req.body;
  createGame(game).then(id => {
    game.id = id;
    res.status(201).json(game);
  });
});

router.patch('/games/:id', (req, res, next) => {
  res.json({message: 'not implemented'});
});

router.delete('/games/:id', (req, res, next) => {
  res.json({message: 'not implemented'});
});

router.use((err, req, res, next) => {
  console.error('api error', err);
  res.status(500).json({ error: err.message || err.toString()});
});

module.exports = router;
