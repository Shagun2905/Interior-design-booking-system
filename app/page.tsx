import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Link from "next/link";

const services = [
  {
    name: "1 BHK Interior Design",
    price: "₹24,999",
    description: "Modern interiors for compact apartments.",
  },
  {
    name: "2/3 BHK Complete Home",
    price: "₹79,999",
    description: "Premium home interiors with modular furniture.",
  },
  {
    name: "Modular Kitchen",
    price: "₹39,999",
    description: "Elegant and space-saving kitchen designs.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-24">

        {/* Hero */}

        <section className="bg-stone-100 py-24">

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

            <div>

              <h1 className="text-6xl font-bold leading-tight">
                Beautiful Interiors
                <br />
                For Every Home
              </h1>

              <p className="mt-6 text-lg text-gray-600">
                HomeAura Interiors creates luxury Indian homes with
                modern designs and affordable pricing.
              </p>

              <Link
                href="/booking"
                className="inline-block mt-8 bg-black text-white px-8 py-4 rounded-xl"
              >
                Book Consultation
              </Link>
              <div className="flex gap-4 mt-8">

  

  <Link
    href="/portfolio"
    className="border-2 border-black px-8 py-4 rounded-lg hover:bg-black hover:text-white transition"
  >
    View Portfolio
  </Link>

</div>

            </div>

            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900"
              className="rounded-3xl shadow-xl"
            />

          </div>

        </section>

        {/* Services */}

        <section className="max-w-7xl mx-auto py-20 px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {services.map((service) => (

              <div
                key={service.name}
                className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition"
              >

                <h3 className="text-2xl font-bold">
                  {service.name}
                </h3>

                <p className="mt-4 text-gray-600">
                  {service.description}
                </p>

                <p className="text-3xl font-bold text-amber-700 mt-6">
                  {service.price}
                </p>

              </div>

            ))}

          </div>

        </section>

      </main>

      <Footer />

    </>
  );
}