import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import {v2 as cloudinary} from "cloudinary";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        let event;
        const formData = await req.formData();
        try{
            event = Object.fromEntries(formData.entries());
        }catch (e) {
            return NextResponse.json({message:'Invalid JSON data format'},{status:400});
        }


        const file = formData.get("image") as File;

        if(!file){
            return NextResponse.json({message:'Image file is required.'},{status: 401});
        }
        const arraybuffer = await file.arrayBuffer();
        const buffer  = Buffer.from(arraybuffer);
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'image', folder: 'DevEvent' },
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            ).end(buffer); // or whatever stream you’re uploading
        });
        event.image = (uploadResult as {secure_url: string}).secure_url;

        const createdEvent = await Event.create(event);

        return NextResponse.json({message:'Successfully created events',event:createdEvent}, {status:201});
    }catch (e) {
        console.error(e);
        return NextResponse.json({message:'Event creation failed', error:e instanceof Error ? e.message : 'unknown error'},{status:500});
    }

}

export async function GET() {
    try{
        await connectDB();

        const events = await Event.find().sort({createdAt: -1});
        return NextResponse.json({message: 'Event fetched successfuly', events},{status:200})
    }catch (e) {
            return NextResponse.json({message: 'Event fetching failed', error:e},{status:500});
    }
}