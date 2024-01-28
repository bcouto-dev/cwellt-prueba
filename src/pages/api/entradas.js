import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

    let doc = await req.db.collection('cwellt').find().toArray()
    console.log(doc);
    res.json(doc);
});


/*Maneja los POST y nos faltaría que maneje los update en caso de que haya otro con el mismo nombre por ejemplo*/
handler.post(async (req, res) => {
  try{
    let data = req.body
    data = JSON.parse(data);
    /*Ya nos permite tratar tanto los nuevos como sobreescribir los antiguos*/
    let doc = await req.db.collection('cwellt').updateOne({ date: data.date },{ $set: data },{ upsert: true }
    );
    res.json({ message: 'ok' });
  }catch(e){
    console.log(e);
    res.json({ message: 'error' });
  }
  
})

/*Este estaría incompleto, sería para manejar los delete*/
handler.delete(async (req, res) => {
  try{
    const { date } = req.query;
    const result = await req.db.collection('cwellt').findOneAndDelete({ date: date });
    if (result.deletedCount === 1) {
      res.json({ message: 'ok' });
    } else {
      res.status(404).json({ message: 'Entry not found' });
    }
  }catch(e){
    console.log(e);
    res.json({ message: 'error' });
  }
})

export default handler;