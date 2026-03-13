import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {events} from "@/lib/constants";

const Page = () => {
    return (
        <section><h1 className="text-center">The hub for every dev <br/>event you can&#39;t miss.</h1>
            <p className="text-center m-4">Hackathon, meetups and conferences, All in one place.</p>
            <ExploreBtn/>
            <div className={"mt-20 space-y-7 "}>

                <h3>Featured Events</h3>
                <ul className="events list-none">{events.map(event=>(
                    <li key={event.title}> <EventCard{...event}/></li>
                ))}</ul>

            </div>

        </section>

)
}
export default Page
