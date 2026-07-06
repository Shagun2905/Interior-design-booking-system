"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface Booking {
  _id: string;
  clientName: string;
  clientEmail: string;
  phone: string;
  room: string;
  service: string;
  appointmentDate: string;
  status: string;
  createdAt?: string;
}

export default function AdminPage() {

  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
  const admin = localStorage.getItem("admin");

  if (!admin) {
    router.push("/admin/login");
    return;
  }

  fetchBookings();
}, [router]);

  useEffect(() => {
    const result = bookings.filter(
      (booking) =>
        booking.clientName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        booking.clientEmail
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        booking.service
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredBookings(result);
  }, [search, bookings]);

  async function fetchBookings() {
    try {
      const response = await fetch("/api/booking");

      const data = await response.json();

      if (data.success) {
        setBookings(data.bookings);
        setFilteredBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteBooking(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/booking/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Booking Deleted Successfully");
        fetchBookings();
      } else {
        alert("Delete Failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateStatus(
    id: string,
    status: string
  ) {
    try {
      const response = await fetch(
        `/api/booking/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchBookings();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="flex justify-between items-center mb-8">
        <p>Total Bookings: {bookings.length}</p>
        <p>Filtered Bookings: {filteredBookings.length}</p>
        <h1 className="text-4xl font-bold">
          Home Aura Admin Dashboard
        </h1>
        <button
  onClick={() => {
    localStorage.removeItem("admin");
    router.push("/admin/login");
  }}
  className="bg-red-600 text-white px-5 py-2 rounded-lg"
>
  Logout
</button>

        <input
          type="text"
          placeholder="Search bookings..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg px-4 py-2 w-72"
        />

      </div>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow-lg p-6">

          <p className="text-gray-500">
            Total Bookings
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {bookings.length}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">

          <p className="text-gray-500">
            Confirmed Bookings
          </p>

          <h2 className="text-4xl font-bold mt-3 text-green-600">
            {
              bookings.filter(
                (booking) =>
                  booking.status === "Confirmed"
              ).length
            }
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">

          <p className="text-gray-500">
            Estimated Revenue
          </p>

          <h2 className="text-4xl font-bold mt-3 text-blue-600">
            ₹{bookings.length * 25000}
          </h2>

        </div>

      </div>

      {/* Booking Table */}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-black text-white">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Room
              </th>

              <th className="p-4 text-left">
                Service
              </th>

              <th className="p-4 text-left">
                Appointment
              </th>

              <th className="p-4 text-center">
                Status
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>            
            {loading ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center p-8 text-lg"
                >
                  Loading bookings...
                </td>
              </tr>
            ) : filteredBookings.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center p-8 text-lg"
                >
                  No Bookings Found
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    {booking.clientName}
                  </td>

                  <td className="p-4">
                    {booking.clientEmail}
                  </td>

                  <td className="p-4">
                    {booking.phone}
                  </td>

                  <td className="p-4">
                    {booking.room}
                  </td>

                  <td className="p-4">
                    {booking.service}
                  </td>

                  <td className="p-4">
                    {booking.appointmentDate}
                  </td>

                  <td className="p-4 text-center">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        updateStatus(
                          booking._id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg px-3 py-2"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Completed">
                        Completed
                      </option>
                    </select>
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() =>
                        deleteBooking(booking._id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      <div className="mt-10 text-center text-gray-500">
        Home Aura Interior Design Admin Dashboard
      </div>

    </main>
  );
}