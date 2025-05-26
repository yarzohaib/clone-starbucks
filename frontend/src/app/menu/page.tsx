
import MenuNavigation from "@/components/MenuNavigation";
import { getCategories,  getSubCategories } from "@/lib/strapi";
import Menu from "@/components/Menu";

export default async function MenuPage() {
const categories = await getCategories();
const subCategories = await getSubCategories();

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
        <Menu />
        {/* Your main content components will go here */}
      </div>
    </div>
  );
}




