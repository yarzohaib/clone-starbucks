
import MenuNavigation from "@/components/MenuNavigation";
import MenuDetail from "@/components/MenuDetail";
import { getCategories, getProducts, getSubCategories, getSubSubCategories } from "@/lib/strapi";

export default async function MenuDetailPage({ params }: { params: { slug: string } }) {
const categories = await getCategories();
const subCategories = await getSubCategories();
const subSubCategories = await getSubSubCategories();
const products= await getProducts();
const { slug } = params;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[256px_1fr] h-screen bg-white pt-10 ">
      {/* Left Sidebar */}
      <div className="hidden md:block bg-white text-black p-6 ">
        <br/><br/>
        <MenuNavigation categories={categories} subCategories={subCategories} />
        {/* Your sidebar components will go here */}
      </div>

      {/* Right Main Content */}
      <div className="p-8 overflow-y-auto">
        <br/><br/>
        <MenuDetail subCategories={subCategories} subSubCategories={subSubCategories} products={products} slug={slug} />
        {/* Your main content components will go here */}
      </div>
    </div>
  );
}




