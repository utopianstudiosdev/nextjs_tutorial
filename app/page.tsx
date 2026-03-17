import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {IEvent} from "@/database/event.model";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const Page = async() => {
    //const  response = await fetch(`${BASE_URL}/api/events`);
    const response = await fetch(`${BASE_URL}/api/events`);
    const {events} = await response.json();
    console .log("###Events####"+events);
    console .log("###Events.length####"+events.length);
    return (
        <section><h1 className="text-center">The hub for every dev <br/>event you can&#39;t miss.</h1>
            <p className="text-center m-4">Hackathon, meetups and conferences, All in one place.</p>
            <ExploreBtn/>
            <div className={"mt-20 space-y-7 "}>

                <h3>Featured Events</h3>
                <ul className="events list-none">{events && events.length>0 && events.map((event: IEvent)=>(
                    <li key={event.title}> <EventCard{...event}/></li>
                ))}</ul>

            </div>

        </section>

)
}
export default Page
