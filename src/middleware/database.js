import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient('mongodb+srv://database-practice-cwellt:9mpQ1FnweKa0FghJ@cluster0.rdj2tcc.mongodb.net/admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  req.dbClient = client;
  req.db = client.db('cwellt');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;