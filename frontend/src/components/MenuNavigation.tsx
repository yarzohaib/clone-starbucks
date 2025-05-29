import { getCategories, getSubCategories } from '@/lib/strapi';
import { Category, SubCategory } from '@/lib/types';
import Link from 'next/link';

interface MenuNavigationProps {
  categories: Category[];
  subCategories: SubCategory[];
}

export default function MenuNavigation({ categories, subCategories }: MenuNavigationProps) {
  // Group subcategories by category
  const groupedData = categories.map(category => ({
    category,
    subCategories: subCategories.filter(sub => {
      // Adjust this logic based on how your categories and subcategories are related in Strapi
      // You might need to add a category relationship field to your subcategories
      
      // Temporary grouping logic - replace with actual relationship logic
      if (category.Name === 'Drinks') {
        return ['Hot Coffee', 'Cold Coffee', 'Hot Tea', 'Cold Tea', 'Refreshers', 
                'Frappuccino', 'Hot Chocolate', 'Bottled Beverages'].some(name => 
                sub.Name.toLowerCase().includes(name.toLowerCase()));
      }
      if (category.Name === 'Food') {
        return ['Breakfast', 'Bakery', 'Treats', 'Lunch', 'Snacks'].some(name => 
                sub.Name.toLowerCase().includes(name.toLowerCase()));
      }
      if (category.Name === 'At Home Coffee') {
        return ['Whole Bean', 'VIA Instant', 'Shopping Bag'].some(name => 
                sub.Name.toLowerCase().includes(name.toLowerCase()));
      }
      return false;
    })
  }));

  return (
    <div className="flex bg-white">
      {/* Left empty column */}
      <div className="w-20 lg:w-33 bg-transparent"></div>
      
      {/* Navigation content */}
      <nav className="w-64 bg-white p-6 font-sans">
        {groupedData.map(({ category, subCategories }) => (
          
          <div key={category.id} className="mb-8">
              
            {/* Category Header */}
            <div className="mb-4">
             
              <h2 className="text-xl font-bold text-gray-900 Leading-loose">
                {category.Name}
              </h2>
            </div>
            
            {/* Subcategory Links */}
            <div className="space-y-3">
              {subCategories.map((subCategory) => (
                <div key={subCategory.id}>
                  <Link 
                    href={`/menu/${subCategory.Name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 text-base leading-loose"
                  >
                    {subCategory.Name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}

// Server component version that fetches data directly
export async function MenuNavigationServer() {
  const categories = await getCategories();
  const subCategories = await getSubCategories();

  return <MenuNavigation categories={categories} subCategories={subCategories} />;
}

// If you want to use this in your main layout, you can also create a version that accepts the data as props
export function MenuNavigationClient({ categories, subCategories }: MenuNavigationProps) {
  return <MenuNavigation categories={categories} subCategories={subCategories} />;
}