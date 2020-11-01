const { MongoClient, ObjectID } = require('mongodb');
const { Player } = require('../models/player');
const { unserializeGame } = require('../models/game');
const { unserializeCard } = require('../models/card');

module.exports = class Games {
  // either _mongo('collection_name', f) or _mongo(f)
  async _mongo(collection, f) {
    if (f == null) {
      f = collection;
      collection = null;
    }
    const client = new MongoClient(process.env.MONGODB_URL, { useUnifiedTopology: true });
    try {
      await client.connect();
      const database = client.db(process.env.MONGODB_DATABASE);
      const arg = collection == null ? database : database.collection(collection);
      return await f(arg);
    } finally {
      client.close();
    }
  }

  async search() {
    return this._mongo('games', col => {
      const cursor = col.find({}, { limit: 100, sort: { name: 1 } });
      return cursor.toArray()
    });
  }

  async find(id) {
    return this._mongo('games', col => {
      return col.findOne({ _id: ObjectID(id) });
    });
  }

  async create(game) {
    game.status = 'unstarted';
    return this._mongo('games', col => {
      return col.insertOne(game)
        .then(r => Promise.resolve(r.insertedId));
    });
  }

  async join(id, player) {
    const data = await this.find(id);
    const game = unserializeGame(data);
    let players;
    if (typeof player === 'Array') {
      players = player;
    } else {
      players = [player];
    }
    players.forEach(p => game.addPlayer(new Player(p)));
    const serialized = game.serialize();

    await this._mongo('games', col => {
      return col.updateOne({ _id: game._id }, { $set: serialized });
    });
    return Promise.resolve(serialized);
  }

  async start(id) {
    const data = await this.find(id);
    const game = unserializeGame(data);
    game.start();
    await this._mongo('games', col => {
      return col.updateOne({ _id: game._id }, { $set: game.serialize() });
    });
    return Promise.resolve(game.serialize());
  }

  async playCard(id, card) {
    const data = await this.find(id);
    const game = unserializeGame(data);
    game.playCard(unserializeCard(card));
    const serialized = game.serialize();

    await this._mongo('games', col => {
      return col.updateOne({ _id: game._id }, { $set: serialized });
    });
    return Promise.resolve(serialized);
  }

  async destroy(id) {
    return this._mongo('games', col => {
      return col.deleteOne({ _id: ObjectID(id) });
    });
  }
};
