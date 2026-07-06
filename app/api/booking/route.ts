import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

// GET ALL BOOKINGS
export async function GET() {
  try {
    await connectDB();

    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        bookings,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET Bookings Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch bookings",
      },
      {
        status: 500,
      }
    );
  }
}

// CREATE BOOKING
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const booking = await Booking.create({
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      phone: body.phone,
      room: body.room,
      service: body.service,
      appointmentDate: body.appointmentDate,
    });

    return NextResponse.json(
      {
        success: true,
        booking,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Create Booking Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Booking Failed",
      },
      {
        status: 500,
      }
    );
  }
}