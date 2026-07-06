import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">

        <h1 className="text-2xl font-bold">
          HomeAura Interiors
        </h1>

        <nav className="space-x-8">

          <Link href="/">Home</Link>

          <Link href="/portfolio">Portfolio</Link>

          <Link href="/booking">Booking</Link>
          <Link href="/admin/login">Admin</Link>

        </nav>

      </div>
    </header>
  );
}