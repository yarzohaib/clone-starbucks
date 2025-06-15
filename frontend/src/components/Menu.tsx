import { getCategories, getSubCategories } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';


export default async function MenuPage() {
  // Fetch data from Strapi
  const categories = await getCategories();
  const subCategories = await getSubCategories();

  // Group subcategories by category 
  const groupedData = categories.map(category => ({
    category,
    subCategories: subCategories.filter(sub =>
      //filter logic based on how categories and subcategories are related in Strapi
      sub.Name.toLowerCase().includes(category.Name.toLowerCase()) ||
      category.Name === 'Drinks' && ['Hot Coffee', 'Cold Coffee', 'Hot Tea', 'Cold Tea', 'Refreshers', 'Frappuccino', 'Hot Chocolate, Lemonades & More', 'Bo     ttled Beverages'].some(drink => sub.Name.includes(drink)) ||
      category.Name === 'Food' && ['Breakfast', 'Snacks', 'Treats', 'Lunch'].some(food => sub.Name.includes(food)) ||
      category.Name === 'At Home Coffee' && ['Whole Bean', 'VIA Instant', 'Shopping Bag'].some(Coffee => sub.Name.includes(Coffee))
    )
  }));

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Menu</h1><br /><br />

      {groupedData.map(({ category, subCategories }) => (
        <div key={category.id} className="mb-12">
          {/* Category Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {category.Name}
          </h2><br /><hr /><br />

          {/* Subcategories Grid */}
          <div className="grid grid-cols-2 gap-6">
            {subCategories.map((subCategory) => (
              <Link
                key={subCategory.id}
                href={`/menu/${subCategory.slug}`}
                className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {/* Icon */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${subCategory.icon.url}`}
                    alt={subCategory.icon.alternativeText || subCategory.Name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                {/* Name */}
                <span className="text-gray-800 font-medium text-lg leading-tight">
                  {'\u00A0'}{'\u00A0'}{subCategory.Name}
                </span>
              </Link>
            ))}
          </div><br />
        </div>
      ))}

      {/* Fallback if no data */}
      {groupedData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No menu items available at the moment.</p>
        </div>
      )}
    </div>
  );
}