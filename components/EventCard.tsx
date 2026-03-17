import React from 'react'
import Link from "next/link";
import Image from "next/image";
interface Props{
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

const EventCard = ({title,image,slug,location,date,time}:Props) => {
    return (
        <Link href={`/events/${slug}`} id={"events-card"}>
        <Image src={image} className="poster" width={410} height={300}  alt={title}></Image>
            <div className={"flex flex-row space-x-2"}>
                <Image src={"/icons/pin.svg"} alt="location" width={14} height={14}  />
                <p>{location}</p>
            </div>
            <p className={"title"}>{title}</p>
            <div>
                <div className="datetime space-x-2">
                    <div className="flex space-x-2">
                        <Image src={"/icons/calendar.svg"} alt="date" width={14} height={14}  />
                        <p>{date}</p>
                    </div>
                    <div className="flex space-x-2">
                        <Image src={"/icons/clock.svg"} alt="time" width={14} height={14}  />
                        <p>{time}</p>
                    </div>

                </div>
            </div>
                    </Link>
    )
}
export default EventCard
