// // app/menu/page.tsx
// import MenuNavigation from "@/components/MenuNavigation";
// import MenuLoader from "@/components/MenuLoader";
// import { getCategories, getSubCategories } from "@/lib/strapi";
// import Menu from "@/components/Menu";
// import { Suspense } from "react";

// // Main content component
// async function MenuContent() {
//   const categories = await getCategories();
//   const subCategories = await getSubCategories();

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-[256px_1fr] lg:grid-cols-[380px_1fr] h-screen bg-white pt-10">
//       {/* Left Sidebar */}
//       <div className="hidden md:block bg-white text-black p-6">
//         <br /><br />
//         <MenuNavigation categories={categories} subCategories={subCategories} />
//         {/* Your sidebar components will go here */}
//       </div>

//       {/* Right Main Content */}
//       <div className="p-8 overflow-y-auto">
//         <br /><br />
//         <Menu />
//         {/* Your main content components will go here */}
//       </div>
//     </div>
//   );
// }

// export default async function MenuPage() {
//   return (
//     <Suspense fallback={<MenuLoader />}>
//       <MenuContent />
//     </Suspense>
//   );
// }





// app/menu/page.tsx
import MenuNavigation from "@/components/MenuNavigation";
import MenuLoader from "@/components/MenuLoader";
import { getCategories, getSubCategories } from "@/lib/strapi";
import Menu from "@/components/Menu";
import { Suspense } from "react";

// Configure revalidation - 1 hour = 3600 seconds
export const revalidate = 3600;

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Our Menu - Browse All Categories',
    description: 'Explore our complete menu with all food and beverage categories',
  };
}

// Main content component
async function MenuContent() {
  // These API calls are now cached and will revalidate every hour
  const [categories, subCategories] = await Promise.all([
    getCategories(),
    getSubCategories()
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[256px_1fr] lg:grid-cols-[380px_1fr] h-screen bg-white pt-10">
      {/* Left Sidebar */}
      <div className="hidden md:block bg-white text-black p-6">
        <br /><br />
        <MenuNavigation categories={categories} subCategories={subCategories} />
      </div>

      {/* Right Main Content */}
      <div className="p-8 overflow-y-auto">
        <br /><br />
        <Menu />
      </div>
    </div>
  );
}

export default async function MenuPage() {
  return (
    <Suspense fallback={<MenuLoader />}>
      <MenuContent />
    </Suspense>
  );
}