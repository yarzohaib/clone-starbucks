// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { getHero } from "@/lib/strapi";
// import Link from "next/link";


// const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

// export default  async function Hero() {
 
//   const data = await getHero();

//   if (!data || data.length === 0) {
//     return (
//       <section className="p-12 text-center">
//         <h1 className="text-2xl font-semibold">No hero content available.</h1>
//       </section>
//     );
//   }

//   return (
//     <section className="max-w-9xl mx-auto px-6 lg:px-8 space-y-12">
//       {data.map((hero, index) => {
//   const imageUrl = hero.image?.formats?.large?.url ??
//                    hero.image?.formats?.medium?.url ??
//                    hero.image?.formats?.small?.url ??
//                    hero.image?.url;

//   const fullImageUrl = imageUrl?.startsWith('http') 
//     ? imageUrl 
//     : `${STRAPI_URL}${imageUrl?.startsWith('/') ? imageUrl : `/${imageUrl}`}`;

//   const isReversed = index % 2 !== 0;

//   return (
//     <div
//       key={hero.documentId || hero.id}
//       className={` flex flex-col lg:flex-row ${isReversed ? 'lg:flex-row-reverse' : ''} items-center justify-center`}
//     >
//       {/* Left or Right: Image */}
//       <div className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto relative overflow-hidden shadow-md min-h-[400px]">
//         {fullImageUrl ? (
//           <Image
//             src={fullImageUrl}
//             alt={hero.image?.alternativeText || "Hero Image"}
//             fill
//             className="object-cover"
//             priority
//           />
//         ) : (
//           <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//             <p className="text-gray-500">No image available</p>
//           </div>
//         )}
//       </div>

//       {/* Left or Right: Text content */}
//       <div className="w-full lg:w-1/2 bg-[#006241] text-white p-10 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6 h-[400px]">
//         <h1 className="text-4xl font-bold tracking-tight ">{hero.Title}</h1>
//         <p className="text-lg">{hero.subtitle}</p>
//         <Button variant="outline"
//         className="border-white text-black hover:bg-white hover:text-[#006241] px-6 py-2 text-base rounded-full transition justify-items-center" > <Link href="/menu"  > View the menu </Link> </Button>
//       </div>
//     </div>
//   );
// })}

//     </section>
//   );
// }

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getHero } from "@/lib/strapi";
import Link from "next/link";
import React from "react";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export default async function Hero() {
  const data = await getHero();
  
  if (!data || data.length === 0) {
    return (
      <section className="p-12 text-center">
        <h1 className="text-2xl font-semibold">No hero content available.</h1>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-100 p-2.5">
      <div className="h-10 bg-gray-100"></div>
      {data.map((hero, index) => {
        const imageUrl = hero.image?.formats?.large?.url ??
                         hero.image?.formats?.medium?.url ??
                         hero.image?.formats?.small?.url ??
                         hero.image?.url;

        const fullImageUrl = imageUrl?.startsWith('http') 
          ? imageUrl 
          : `${STRAPI_URL}${imageUrl?.startsWith('/') ? imageUrl : `/${imageUrl}`}`;

        const isReversed = index % 2 !== 0;

        return (
          <React.Fragment key={hero.documentId || hero.id}>
            {/* Hero Section */}
            <div className={`w-full flex flex-col lg:flex-row ${isReversed ? "lg:flex-row-reverse" : ""} items-center justify-center bg-white overflow-hidden `}>
              {/* Image Section */}
              <div className="w-full lg:w-1/2 relative min-h-[400px] md:min-h-[500px] lg:min-h-screen">
                {fullImageUrl ? (
                  <Image
                    src={fullImageUrl}
                    alt={hero.image?.alternativeText || "Hero Image"}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
              </div>

              {/* Text Section */}
              <div className="w-full lg:w-1/2 bg-[#006241] text-white flex justify-center items-center px-6 py-10 md:px-10 md:py-16 min-h-[400px] md:min-h-[500px] lg:min-h-screen">
                <div className="text-center space-y-6 max-w-xl">
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-snug">
                    {hero.Title}
                  </h1><br/>
                  <p className="text-base md:text-lg leading-relaxed">
                    {hero.subtitle}
                  </p><br/>
                  <Button
                    variant="outline"
                    className="border-white bg-[#006241] text-white hover:bg-[#005137] hover:text-white px-6 py-2 text-base rounded-full transition"
                  >
                    <Link href="/menu">View the menu</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Spacer between hero sections */}
            {index !== data.length - 1 && (
              <div className="w-full bg-transparent h-10" />
            )}
          </React.Fragment>
        );
      })}
      
      {/* Final bottom spacing */}
      <div className="bg-transparent h-10 w-full"></div>
    </section>
  );
}