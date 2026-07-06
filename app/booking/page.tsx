"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const services = [
  {
    name: "1 BHK Interior Design",
    price: "₹24,999",
  },
  {
    name: "2/3 BHK Complete Interior",
    price: "₹79,999",
  },
  {
    name: "Modular Kitchen Design",
    price: "₹39,999",
  },
];

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export default function BookingPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [service, setService] = useState("");
  const [slot, setSlot] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");

  const handleBooking = async () => {
    if (!name || !email || !phone || !room || !date || !slot || !service) {
      alert("Please fill all details.");
      return;
    }

    const bookingData = {
      clientName: name,
      clientEmail: email,
      phone,
      room,
      service,
      appointmentDate: `${date} ${slot}`,
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/success");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen bg-stone-100 pt-24 px-6">
      <h1 className="text-5xl font-bold text-center">
        Book Your Consultation
      </h1>

      <div className="flex justify-center gap-4 my-10">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
              step >= item ? "bg-black" : "bg-gray-400"
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      {/* STEP 1 */}

      {step === 1 && (
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                setService(item.name);
                setStep(2);
              }}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:scale-105 duration-300"
            >
              <h2 className="text-2xl font-bold">{item.name}</h2>

              <p className="text-amber-700 text-3xl mt-4">{item.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* STEP 2 */}

      {step === 2 && (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="border rounded p-3 w-full mb-4"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="border rounded p-3 w-full mb-4"
          />

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="border rounded p-3 w-full mb-4"
          />

          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Room Type"
            className="border rounded p-3 w-full mb-4"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded p-3 w-full mb-4"
          />

          <button
            onClick={() => setStep(3)}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Continue
          </button>
        </div>
      )}

      {/* STEP 3 */}

      {step === 3 && (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Select Time Slot
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSlot(time)}
                className={`p-4 rounded-xl border ${
                  slot === time ? "bg-green-600 text-white" : "bg-white"
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          {slot && (
            <div className="text-center mt-10">
              <h3 className="text-2xl font-bold">
                Booking Summary
              </h3>

              <p className="mt-4">
                <b>Name:</b> {name}
              </p>

              <p>
                <b>Service:</b> {service}
              </p>

              <p>
                <b>Date:</b> {date}
              </p>

              <p>
                <b>Time:</b> {slot}
              </p>

              <button
                onClick={handleBooking}
                className="mt-8 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
              >
                Confirm Booking
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}