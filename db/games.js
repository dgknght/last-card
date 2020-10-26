const { MongoClient, ObjectID } = require('mongodb');

module.exports = class Games {
  async _mongo(f) {
    const client = new MongoClient(process.env.MONGODB_URL, { useUnifiedTopology: true });
    try {
      await client.connect();
      const database = client.db(process.env.MONGODB_DATABASE);
      return await f(database);
    } finally {
      client.close();
    }
  }

  async search() {
    return this._mongo(db => {
      const collection = db.collection('games');
      const cursor = collection.find({}, { limit: 100, sort: { name: 1 } });
      return cursor.toArray()
    });
  }

  async find(id) {
    return this._mongo(db => {
      const collection = db.collection('games');
      return collection.findOne({ _id: ObjectID(id) });
    });
  }

  async create(game) {
    return this._mongo(db => {
      const collection = db.collection('games');
      return collection.insertOne(game)
        .then(r => Promise.resolve(r.insertedId));
    });
  }
};
