import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import React from "react";
import Head from 'next/head';

const MeetupDetails = (props) => {
  return (
    <React.Fragment>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name='description' content={props.meetupData.description} />
        </Head>
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    </React.Fragment>
  );
};


export async function getStaticPaths(){
    const client = await MongoClient.connect('mongodb+srv://nehab:T9DcXVDbTd82KCTP@cluster0.q4j14gt.mongodb.net/meetups');
    const db = client.db();
    const meetupsCollection = db.collection('meetupsdb');
    
    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray(); //first argument is filter criteria and second is which field we want to extract
    client.close();

    return {
        fallback: 'blocking', //true or blocking -> we will generate error page
                                //with true it will immediately return an empty page and then pull down the dynamically generated content
                                //with blocking user will not see anything until the page was pre-generated and the finished page will be served.
                                //with false it will not generate error page but there is default 404 error page
        paths: meetups.map(meetup=> ({params: {meetupId: meetup._id.toString()}})),
        // paths: [
        //     {
        //         params: {
        //             meetupId: 'm1',
        //         }
        //     },
        //     {
        //         params: {
        //             meetupId: 'm2',
        //         }
        //     },
        //     {
        //         params: {
        //             meetupId: 'm3',
        //         }
        //     }
        // ]
    }
}

export async function getStaticProps(context){
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://nehab:T9DcXVDbTd82KCTP@cluster0.q4j14gt.mongodb.net/meetups');
    const db = client.db();
    const meetupsCollection = db.collection('meetupsdb');
    
    const selectedMeetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId)});
    client.close();

    //image url = https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg
    
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails;
