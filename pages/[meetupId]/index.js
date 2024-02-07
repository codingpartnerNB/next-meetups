import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
      title="A First Meetup"
      address="Some address 3, 230 Some City"
      description="This is our first meetup"
    />
  );
};


export async function getStaticPaths(){
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: 'm1',
                }
            },
            {
                params: {
                    meetupId: 'm2',
                }
            },
            {
                params: {
                    meetupId: 'm3',
                }
            }
        ]
    }
}

export async function getStaticProps(context){
    const meetupId = context.params.meetupId;
    console.log(meetupId);
    return {
        props: {
            meetupData: {
                id: meetupId,
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
                title: "A First Meetup",
                address: "Some address 3, 230 Some City",
                description: "This is our first meetup"
            }
        }
    }
}

export default MeetupDetails;
