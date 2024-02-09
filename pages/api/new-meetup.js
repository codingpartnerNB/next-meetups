import { MongoClient } from "mongodb";

async function handler(req, res){
    if(req.method === 'POST'){
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://nehab:T9DcXVDbTd82KCTP@cluster0.q4j14gt.mongodb.net/meetups');

        const db = client.db();
        const meetupsCollection = db.collection('meetupsdb');

        const result = await meetupsCollection.insertOne(data);
        // console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;