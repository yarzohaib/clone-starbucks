import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex">
      {/* Left empty column - hidden on mobile */}
      <div className="hidden md:block w-10 bg-transparent"></div>
      
      {/* Hero content */}
      <div className="flex-1">
        <Hero />
      </div>
      
      {/* Right empty column - hidden on mobile */}
      <div className="hidden md:block w-10 bg-transparent"></div>
    </main>
  );
}