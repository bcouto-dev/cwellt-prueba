import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

    let doc = await req.db.collection('cwellt').find().toArray()
    console.log(doc);
    res.json(doc);
});

handler.post(async (req, res) => {
    let data = req.body
    data = JSON.parse(data);
    //let doc = await req.db.collection('cwellt').insertOne({date: new Date(data.date)}, {$set:data}, {upsert: true})
    /*Ya nos permite tratar tanto los nuevos como sobreescribir los antiguos*/
    let doc = await req.db.collection('cwellt').updateOne({ date: data.date },{ $set: data },{ upsert: true }
    );
   
  res.json({ message: 'ok' });
  
})

export default handler;