const { MongoClient, ObjectID } = require('mongodb');

module.exports = {
  fetchGames: async function() {
    const client = new MongoClient(process.env.MONGODB_URL, { useUnifiedTopology: true });
    try {
      await client.connect();
      const database = client.db(process.env.MONGODB_DATABASE);
      const collection = database.collection('games');
      const cursor = collection.find({}, { limit: 100, sort: { name: 1 } });
      return await cursor.toArray()
    } finally {
      client.close();
    }
  },

  findGame: async function(id) {
    const client = new MongoClient(process.env.MONGODB_URL, { useUnifiedTopology: true });
    try {
      await client.connect();
      const database = client.db(process.env.MONGODB_DATABASE);
      const collection = database.collection('games');
      return await collection.findOne({ _id: ObjectID(id) });
    } finally {
      client.close();
    }
  },

  createGame: async function(game) {
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
};
