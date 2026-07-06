import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      {
        message: "Date is required",
      },
      {
        status: 400,
      }
    );
  }

  const slots = [
    { time: "10:00 AM", booked: false },
    { time: "11:00 AM", booked: false },
    { time: "12:00 PM", booked: true },
    { time: "01:00 PM", booked: false },
    { time: "02:00 PM", booked: true },
    { time: "03:00 PM", booked: false },
    { time: "04:00 PM", booked: false },
  ];

  return NextResponse.json(slots);
}