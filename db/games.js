const { MongoClient, ObjectID } = require('mongodb');

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
    return this._mongo('games', col => {
      return col.insertOne(game)
        .then(r => Promise.resolve(r.insertedId));
    });
  }

  async destroy(id) {
    return this._mongo('games', col => {
      return col.deleteOne({ _id: ObjectID(id) });
    });
  }
};
