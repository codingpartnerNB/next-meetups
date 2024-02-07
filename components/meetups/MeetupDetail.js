
const MeetupDetail = (props)=>{
    return(
        <section className="text-center">
            <img src={props.image} alt={props.title} className="w-full rounded-md" />
            <h1 className="font-bold text-3xl my-4">{props.title}</h1>
            <address className="my-3">{props.address}</address>
            <p>{props.description}</p>
        </section>
    );
}

export default MeetupDetail;