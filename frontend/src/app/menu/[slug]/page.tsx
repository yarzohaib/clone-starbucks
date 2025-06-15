// // app/menu/[slug]/page.tsx
// import MenuNavigation from "@/components/MenuNavigation";
// import MenuDetail from "@/components/MenuDetail";
// import MenuLoader from "@/components/MenuLoader";
// import {
//   getCategories,
//   getSubCategories,
//   getSubSubCategories,
// } from "@/lib/strapi";
// import { Suspense } from "react";

// type MenuDetailPageProps = {
//   params: Promise<{
//     slug: string;
//   }>;
// };

// // Main content component
// async function MenuContent({ slug }: { slug: string }) {
//   const categories = await getCategories();
//   const subCategories = await getSubCategories();
//   const subSubCategories = await getSubSubCategories();

//   // Find the current subcategory by slug
//   const currentSubCategory = subCategories.find(subCat => subCat.slug === slug);

//   // Handle case where subcategory is not found
//   if (!currentSubCategory) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-xl text-gray-600">Subcategory not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-[256px_1fr] h-screen bg-white pt-10">
//       {/* Left Sidebar */}
//       <div className="hidden md:block bg-white text-black p-6">
//         <br />
//         <br />
//         <MenuNavigation
//           categories={categories}
//           subCategories={subCategories}
//         />
//       </div>

//       {/* Right Main Content */}
//       <div className="p-8 overflow-y-auto">
//         <br />
//         <br />
//         <MenuDetail
//           subCategory={currentSubCategory}
//           subSubCategories={subSubCategories}
//         />
//       </div>
//     </div>
//   );
// }

// export default async function MenuDetailPage({ params }: MenuDetailPageProps) {
//   const { slug } = await params;

//   return (
//     <Suspense fallback={<MenuLoader />}>
//       <MenuContent slug={slug} />
//     </Suspense>
//   );
// }




// app/menu/[slug]/page.tsx
import MenuNavigation from "@/components/MenuNavigation";
import MenuDetail from "@/components/MenuDetail";
import MenuLoader from "@/components/MenuLoader";
import {
  getCategories,
  getSubCategories,
  getSubSubCategories,
} from "@/lib/strapi";
import { Suspense } from "react";
import { notFound } from "next/navigation";

type MenuDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Configure revalidation - 1 hour = 3600 seconds
export const revalidate = 3600;

// Generate static params for all subcategory slugs
export async function generateStaticParams() {
  try {
    const subCategories = await getSubCategories();
    
    return subCategories.map((subCat) => ({
      slug: subCat.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: MenuDetailPageProps) {
  const { slug } = await params;
  
  try {
    const subCategories = await getSubCategories();
    const currentSubCategory = subCategories.find(subCat => subCat.slug === slug);
    
    if (!currentSubCategory) {
      return {
        title: 'Menu Not Found',
      };
    }

    return {
      title: `${currentSubCategory.Name} - Menu`,
      description: `Browse our ${currentSubCategory.Name} menu items`,
    };
  } catch (error) {
    return {
      title: 'Menu',error
    };
  }
}

// Main content component
async function MenuContent({ slug }: { slug: string }) {
  // These API calls are now cached and will revalidate every hour
  const [categories, subCategories, subSubCategories] = await Promise.all([
    getCategories(),
    getSubCategories(),
    getSubSubCategories()
  ]);

  // Find the current subcategory by slug
  const currentSubCategory = subCategories.find(subCat => subCat.slug === slug);

  // Handle case where subcategory is not found
  if (!currentSubCategory) {
    notFound(); // This will show your 404 page
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[256px_1fr] h-screen bg-white pt-10">
      {/* Left Sidebar */}
      <div className="hidden md:block bg-white text-black p-6">
        <br />
        <br />
        <MenuNavigation
          categories={categories}
          subCategories={subCategories}
        />
      </div>

      {/* Right Main Content */}
      <div className="p-8 overflow-y-auto">
        <br />
        <br />
        <MenuDetail
          subCategory={currentSubCategory}
          subSubCategories={subSubCategories}
        />
      </div>
    </div>
  );
}

export default async function MenuDetailPage({ params }: MenuDetailPageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<MenuLoader />}>
      <MenuContent slug={slug} />
    </Suspense>
  );
}