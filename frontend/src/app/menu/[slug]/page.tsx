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

type MenuDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Main content component
async function MenuContent({ slug }: { slug: string }) {
  const categories = await getCategories();
  const subCategories = await getSubCategories();
  const subSubCategories = await getSubSubCategories();

  // Find the current subcategory by slug
  const currentSubCategory = subCategories.find(subCat => subCat.slug === slug);

  // Handle case where subcategory is not found
  if (!currentSubCategory) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">Subcategory not found</p>
      </div>
    );
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