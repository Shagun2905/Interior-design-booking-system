import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";

export async function GET() {
  try {
    await connectDB();

    await Service.deleteMany({});

    await Service.insertMany([
      {
        name: "1 BHK Interior Design",
        description: "Complete interior design for a 1 BHK apartment.",
        durationMinutes: 120,
        price: 24999,
        imageUrl:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
      },
      {
        name: "2/3 BHK Complete Home Interior",
        description: "Premium interior package for complete homes.",
        durationMinutes: 180,
        price: 79999,
        imageUrl:
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600",
      },
      {
        name: "Modular Kitchen Design",
        description: "Modern modular kitchen planning.",
        durationMinutes: 90,
        price: 39999,
        imageUrl:
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600",
      },
    ]);

    return NextResponse.json({
      success: true,
      message: "Services inserted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to insert services",
      },
      {
        status: 500,
      }
    );
  }
}