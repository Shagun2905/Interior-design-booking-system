import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

const images = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900",
  "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900",
];

export default function Portfolio() {
  return (
    <>
      <Navbar />

      <main className="pt-24 max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center mb-12">
          Our Portfolio
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className="rounded-2xl shadow-lg hover:scale-105 duration-300"
            />
          ))}

        </div>

      </main>

      <Footer />

    </>
  );
}