import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import {v2 as cloudinary} from "cloudinary";

export async function GET(
    request: Request,
    context: { params: Promise<{ slug: string }> }
) {
  try {

    console.log("GET method invoked");

    const { slug } = await context.params; // ✅ FIX

    await connectDB();

    const event = await Event.findOne({ slug });
    if (!event) {
      return NextResponse.json(
          { message: "Event not found" },
          { status: 404 }
      );
    }

    return NextResponse.json(
        { message: "Event fetched successfully", event },
        { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
        { message: "Event fetching failed", error: e },
        { status: 500 }
    );
  }
}