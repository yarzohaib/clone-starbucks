// import Hero from "@/components/Hero";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gray-100 flex">
//       {/* Left empty column - hidden on mobile */}
//       <div className="hidden md:block w-10 bg-transparent"></div>
      
//       {/* Hero content */}
//       <div className="flex-1">
//         <Hero />
//       </div>
      
//       {/* Right empty column - hidden on mobile */}
//       <div className="hidden md:block w-10 bg-transparent"></div>
//     </main>
//   );
// }







import Hero from "@/components/Hero";

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Welcome - Your Coffee Shop',
    description: 'Discover our premium coffee, delicious food, and warm atmosphere. Your perfect coffee experience awaits.',
    keywords: 'coffee shop, premium coffee, food, cafe, beverages',
  };
}

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