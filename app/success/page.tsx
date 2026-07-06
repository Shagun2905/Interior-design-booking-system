export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          🎉 Booking Confirmed!
        </h1>

        <p className="text-lg text-gray-600">
          Thank you for choosing <b>Home Aura Interiors</b>.
        </p>

        <p className="mt-2 text-gray-500">
          Our design consultant will contact you shortly.
        </p>

        <a
          href="/"
          className="inline-block mt-8 bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}