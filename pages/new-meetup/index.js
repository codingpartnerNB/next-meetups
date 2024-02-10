import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import React from 'react';
import Head from 'next/head';

const NewMeetupPage = ()=>{

    const router = useRouter();

    const addMeetupHandler = async(enteredMeetupData)=>{
        console.log(enteredMeetupData);
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        router.push('/');
    }

    return (
        <React.Fragment>
            <Head>
                <title>Add a new Meetup</title>
                <meta name='description' content='Add your own meetups to create networking opportunities.' />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </React.Fragment>
    );
}

export default NewMeetupPage;