// import { useEffect, useState } from 'react';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import React from 'react';
import Head from 'next/head';

const HomePage = (props)=>{
    // const [loadedMeetups, setLoadedMeetups] = useState([]);
    // useEffect(()=>{
    //     setLoadedMeetups(DUMMY_MEETUPS);
    // }, []);
    return (
        <React.Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name='description' content='Browse a list of highly active meetups.' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </React.Fragment>
    );
}

//Should use when data doesn't change frequently
export async function getStaticProps(){
    const client = await MongoClient.connect('mongodb+srv://nehab:T9DcXVDbTd82KCTP@cluster0.q4j14gt.mongodb.net/meetups');
    const db = client.db();
    const meetupsCollection = db.collection('meetupsdb');
    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map(meetup=>({
                id: meetup._id.toString(),
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
            }))
        },
        revalidate: 10
    }
}

//Should use when data changes frequently
// export async function getServerSideProps(context){
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage;