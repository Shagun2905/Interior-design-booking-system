import { NextResponse } from "next/server";

const services = [
  {
    id: 1,
    name: "1 BHK Interior Design",
    description: "Complete Interior Design",
    durationMinutes: 120,
    price: 24999,
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
  },
  {
    id: 2,
    name: "2/3 BHK Complete Interior",
    description: "Luxury Home Interiors",
    durationMinutes: 180,
    price: 79999,
    imageUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
  },
  {
    id: 3,
    name: "Modular Kitchen",
    description: "Modern Indian Kitchen",
    durationMinutes: 90,
    price: 39999,
    imageUrl:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
  },
];

export async function GET() {
  return NextResponse.json(services);
}