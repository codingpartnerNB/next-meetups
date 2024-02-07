// import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some address 3, 230 Some City',
        description: 'This is our first meetup',
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some address 7, 292 Some City',
        description: 'This is our second meetup',
    },
];

const HomePage = (props)=>{
    // const [loadedMeetups, setLoadedMeetups] = useState([]);
    // useEffect(()=>{
    //     setLoadedMeetups(DUMMY_MEETUPS);
    // }, []);
    return <MeetupList meetups={props.meetups} />;
}

//Should use when data doesn't change frequently
export async function getStaticProps(){
    return {
        props: {
            meetups: DUMMY_MEETUPS
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