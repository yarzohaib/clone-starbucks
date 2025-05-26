// import { getProducts, getSubCategories, getSubSubCategories } from '@/lib/strapi';
// import { Product, SubCategory, SubSubCategory } from '@/lib/types';
// import Image from 'next/image';
// import Link from 'next/link';

// interface ProductPageProps {
//   params: {
//     slug: string; // The subcategory slug from the URL
//   };
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   const { slug } = params;
  
//   // Fetch data from Strapi using your existing functions
//   const products = await getProducts();
//   const subSubCategories = await getSubSubCategories();
//   const subCategories = await getSubCategories();

//   console.log('Fetched data:', {
//     productsCount: products.length,
//     subSubCategoriesCount: subSubCategories.length,
//     subCategoriesCount: subCategories.length
//   });

//   // Convert slug to display title (e.g., "hot-coffee" -> "Hot Coffee")
//   const categoryTitle = slug
//     .split('-')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');

//   // Find the current subcategory based on the slug
//   const currentSubCategory = subCategories.find(subCat => 
//     subCat.slug === slug || 
//     subCat.Name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
//   );

//   console.log('Current subcategory:', currentSubCategory);

//   if (!currentSubCategory) {
//     return (
//       <div className="min-h-screen bg-white p-6">
//         <div className="text-center py-12">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
//           <p className="text-gray-500 mb-4">The category could not be found.</p>
//           <Link href="/menu" className="text-blue-600 hover:text-blue-800">
//             ← Back to Menu
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // Since your strapi functions return empty arrays for relationships,
//   // we'll need to implement a different approach based on naming or other logic
  
//   // For now, let's show all products and group them by sub-sub-categories
//   // You can modify this logic based on how your actual Strapi relationships work
  
//   const groupedProducts = subSubCategories.map(subSubCategory => {
//     // This is a placeholder logic - you'll need to adjust based on your actual data structure
//     // Since the relationships aren't populated in your current strapi.ts functions,
//     // we can either:
//     // 1. Group by naming conventions
//     // 2. Add additional fields to match products to categories
//     // 3. Update the strapi functions to populate relationships properly
    
//     const relatedProducts = products.filter(product => {
//       // Example matching logic - adjust based on your needs
//       return product.Name.toLowerCase().includes(subSubCategory.Name.toLowerCase()) ||
//              subSubCategory.Name.toLowerCase().includes(product.Name.toLowerCase());
//     });

//     return {
//       subSubCategory,
//       products: relatedProducts
//     };
//   }).filter(group => group.products.length > 0);

//   // Fallback: show all products if no grouping works
//   const allProducts = groupedProducts.length === 0 ? products : [];

//   return (
//     <div className="min-h-screen bg-white p-6">
//       {/* Breadcrumb */}
//       <nav className="mb-4">
//         <div className="flex items-center space-x-2 text-sm text-gray-600">
//           <Link href="/menu" className="hover:text-gray-900">
//             Menu
//           </Link>
//           <span>/</span>
//           <span className="text-gray-900">{currentSubCategory.Name}</span>
//         </div>
//       </nav>

//       {/* Page Title */}
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">{currentSubCategory.Name}</h1>

//       {/* Debug info - remove in production */}
//       <div className="mb-4 p-4 bg-gray-100 rounded text-sm">
//         <p>Debug Info:</p>
//         <p>Slug: {slug}</p>
//         <p>Products found: {products.length}</p>
//         <p>SubSubCategories found: {subSubCategories.length}</p>
//         <p>Grouped products: {groupedProducts.length}</p>
//       </div>

//       {/* Grouped Products by Sub-subcategory */}
//       {groupedProducts.length > 0 && groupedProducts.map(({ subSubCategory, products }) => (
//         <div key={subSubCategory.id} className="mb-12">
//           {/* Sub-subcategory Title */}
//           <h2 className="text-xl font-semibold text-gray-800 mb-6">
//             {subSubCategory.Name}
//           </h2>

//           {/* Products Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       ))}

//       {/* Fallback: Show all products */}
//       {allProducts.length > 0 && (
//         <div className="mb-12">
//           <h2 className="text-xl font-semibold text-gray-800 mb-6">All Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {allProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* No Products Found */}
//       {groupedProducts.length === 0 && allProducts.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No products found in this category.</p>
//           <Link href="/menu" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
//             ← Back to Menu
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

// // Product Card Component
// function ProductCard({ product }: { product: Product }) {
//   const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
//   return (
//     <Link
//       href={`/product/${product.slug}`}
//       className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
//     >
//       {/* Product Image */}
//       <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-100">
//         {product.image && product.image.url ? (
//           <Image
//             src={`${STRAPI_URL}${product.image.url}`}
//             alt={product.image.alternativeText || product.Name}
//             fill
//             className="object-cover group-hover:scale-105 transition-transform"
//             sizes="96px"
//           />
//         ) : (
//           <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//             <span className="text-gray-400 text-xs">No Image</span>
//           </div>
//         )}
//       </div>

//       {/* Product Name */}
//       <h3 className="text-sm font-medium text-gray-900 text-center leading-loose">
//         {product.Name}
//       </h3>

//       {/* Product Price */}
//       {product.price && (
//         <p className="text-xs text-gray-500 mt-1">
//           ${product.price.toFixed(2)}
//         </p>
//       )}

//       {/* Product Description (optional, truncated) */}
//       {product.description && (
//         <p className="text-xs text-gray-400 mt-1 text-center line-clamp-2">
//           {product.description.length > 50 
//             ? `${product.description.substring(0, 50)}...` 
//             : product.description
//           }
//         </p>
//       )}
//     </Link>
//   );
// }

// // Generate static params for all subcategories
// export async function generateStaticParams() {
//   try {
//     const subCategories = await getSubCategories();
    
//     return subCategories.map((subCategory) => ({
//       slug: subCategory.slug || subCategory.Name.toLowerCase().replace(/\s+/g, '-'),
//     }));
//   } catch (error) {
//     console.error('Error generating static params:', error);
//     return [];
//   }
// }

// -----------------------------------------

// // import { getProducts, getSubCategories, getSubSubCategories } from '@/lib/strapi';
// // import { Product, SubSubCategory } from '@/lib/types';
// // import Image from 'next/image';
// // import Link from 'next/link';


// // interface ProductPageProps {
// //   slug: string; // The subcategory slug from the URL
// // }

// // export default async function ProductPage({ slug }: ProductPageProps) {
// //   // Fetch data from Strapi
// //   const products = await getProducts();
// //   const subSubCategories = await getSubSubCategories();
// //   const sub_Categories = await getSubCategories(); // You need to add this

// //   // Convert slug to display title (e.g., "hot-coffee" -> "Hot Coffee")
// //   const categoryTitle = slug
// //     .split('-')
// //     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// //     .join(' ');

// //   // Find the current subcategory based on the slug
// //   const currentSubCategory = sub_Categories.find(subCat => 
// //     subCat.Name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
// //   );

// //   // Filter sub-subcategories that belong to the current subcategory
// //   const filteredSubSubCategories = subSubCategories.filter(subSubCat => 
// //     subSubCat.products?.documentId === currentSubCategory?.documentId
// //   );

// //   // Group products by sub-subcategory using actual Strapi relationships
// //   const groupedProducts = filteredSubSubCategories.map(subSubCategory => ({
// //     subSubCategory,
// //     products: products.filter(product => {
// //       // Using actual Strapi relationship field name from your screenshot
// //       return product.sub_sub_categories?.some(cat => cat.documentId === subSubCategory.documentId);
// //     })
// //   })).filter(group => group.products.length > 0);

// //   return (
// //     <div className="min-h-screen bg-white p-6">
// //       {/* Breadcrumb */}
// //       <nav className="mb-4">
// //         <div className="flex items-center space-x-2 text-sm text-gray-600">
// //           <Link href="/menu" className="hover:text-gray-900">
// //             Menu
// //           </Link>
// //           <span>/</span>
// //           <span className="text-gray-900">{categoryTitle}</span>
// //         </div><br/>
// //       </nav>

// //       {/* Page Title */}
// //       <h1 className="text-3xl font-bold text-gray-900 mb-8">{categoryTitle}</h1><br/><br/>

// //       {/* Product Groups */}
// //       {groupedProducts.map(({ subSubCategory, products }) => (
// //         <div key={subSubCategory.id} className="mb-12">
// //           {/* Sub-subcategory Title */}
// //           <h2 className="text-xl font-semibold text-gray-800 mb-6">
// //             {subSubCategory.Name}
// //           </h2><br/>

// //           {/* Products Grid */}
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {products.map((product) => (
// //               <Link
// //                 key={product.id}
// //                 href={`/product/${product.slug}`}
// //                 className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
// //               >
// //                 {/* Product Image */}
// //                 <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-100">
// //                   <Image
// //                     src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${product.image.url}`}
// //                     alt={product.image.alternativeText || product.Name}
// //                     fill
// //                     className="object-cover group-hover:scale-105 transition-transform"
// //                     sizes="96px"
// //                   />
// //                 </div>

// //                 {/* Product Name */}
// //                 <h3 className="text-sm font-medium text-gray-900 text-center leading-loose">
// //                   {product.Name}
// //                 </h3>

// //                 {/* Product Price (optional) */}
// //                 {product.price && (
// //                   <p className="text-xs text-gray-500 mt-1">
// //                     ${product.price.toFixed(2)}
// //                   </p>
// //                 )}
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //       ))}

// //       {/* No Products Found */}
// //       {groupedProducts.length === 0 && (
// //         <div className="text-center py-12">
// //           <p className="text-gray-500">No products found in this category.</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // // Alternative version that accepts all data as props (for client components)
// // export function ProductPageClient({ 
// //   slug, 
// //   products, 
// //   subSubCategories 
// // }: { 
// //   slug: string;
// //   products: Product[];
// //   subSubCategories: SubSubCategory[];
// // }) {
// //   const categoryTitle = slug
// //     .split('-')
// //     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// //     .join(' ');

// //   const groupedProducts = subSubCategories.map(subSubCategory => ({
// //     subSubCategory,
// //     products: products.filter(product => {
// //       return product.Name.toLowerCase().includes(subSubCategory.Name.toLowerCase()) ||
// //              (subSubCategory.Name === 'Brewed Coffee' && 
// //               ['Blonde Roast', 'Medium Roast', 'Dark Roast', 'Decaf Roast', 'Caffe Misto'].some(name => 
// //                 product.Name.includes(name)));
// //     })
// //   })).filter(group => group.products.length > 0);

// //   return (
// //     <div className="min-h-screen bg-white p-6">
// //       <nav className="mb-4">
// //         <div className="flex items-center space-x-2 text-sm text-gray-600">
// //           <Link href="/menu" className="hover:text-gray-900">
// //             Menu
// //           </Link>
// //           <span>/</span>
// //           <span className="text-gray-900">{categoryTitle}</span>
// //         </div>
// //       </nav>

// //       <h1 className="text-3xl font-bold text-gray-900 mb-8">{categoryTitle}</h1>

// //       {groupedProducts.map(({ subSubCategory, products }) => (
// //         <div key={subSubCategory.id} className="mb-12">
// //           <h2 className="text-xl font-semibold text-gray-800 mb-6">
// //             {subSubCategory.Name}
// //           </h2>

// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {products.map((product) => (
// //               <Link
// //                 key={product.id}
// //                 href={`/product/${product.slug}`}
// //                 className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
// //               >
// //                 <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden bg-gray-100">
// //                   <Image
// //                     src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${product.image.url}`}
// //                     alt={product.image.alternativeText || product.Name}
// //                     fill
// //                     className="object-cover group-hover:scale-105 transition-transform"
// //                     sizes="80px"
// //                   />
// //                 </div>

// //                 <h3 className="text-sm font-medium text-gray-900 text-center leading-tight">
// //                   {product.Name}
// //                 </h3>

// //                 {product.price && (
// //                   <p className="text-xs text-gray-500 mt-1">
// //                     ${product.price.toFixed(2)}
// //                   </p>
// //                 )}
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //       ))}

// //       {groupedProducts.length === 0 && (
// //         <div className="text-center py-12">
// //           <p className="text-gray-500">No products found in this category.</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

import { SubSubCategory, Product, SubCategory } from '@/lib/types';
import { STRAPI_URL } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';

interface MenuDetailProps {
  subCategories: SubCategory[];
  subSubCategories: SubSubCategory[];
  products: Product[];
  slug: string;
}

export default function MenuDetail({ 
  subCategories, 
  subSubCategories, 
  products, 
  slug 
}: MenuDetailProps) {
  // Find the current subcategory based on slug
  const currentSubCategory = subCategories.find(subCat => subCat.slug === slug);

  if (!currentSubCategory) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Category not found</h1>
      </div>
    );
  }

  // Filter sub-sub-categories that belong to this subcategory
  const filteredSubSubCategories = subSubCategories.filter(subSubCat => {
    // Check if the current subcategory has this sub-sub-category in its relations
    return currentSubCategory.sub_sub_category?.some((relation: SubSubCategory) => 
      relation.id === subSubCat.id || relation.documentId === subSubCat.documentId
    );
  });          

  // Group products by sub-sub-category
  const groupedProducts = filteredSubSubCategories.map(subSubCat => {
    const categoryProducts = products.filter(product => 
      product.sub_sub_categories?.some(cat => cat.id === subSubCat.id)
    );
    return {
      ...subSubCat,
      products: categoryProducts
    };
  }).filter(group => group.products.length > 0); // Only show categories with products

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/menu" className="hover:text-gray-900">Menu</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{currentSubCategory.Name}</span>
      </nav>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        {currentSubCategory.Name}
      </h1>

      {/* Products grouped by sub-sub-categories */}
      <div className="space-y-12">
        {groupedProducts.map((group) => (
          <div key={group.id} className="space-y-6">
            {/* Sub-sub-category title */}
            <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {group.Name}
            </h2>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {group.products.map((product) => (
                <div key={product.id} className="flex flex-col items-center text-center group">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 mb-3 rounded-full overflow-hidden bg-green-900 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {product.image?.url ? (
                      <Image
                        src={`${STRAPI_URL}${product.image.url}`}
                        alt={product.image.alternativeText || product.Name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {product.Name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Name */}
                  <h3 className="text-sm font-medium text-gray-900 leading-tight max-w-20">
                    {product.Name}
                  </h3>

                  {/* Optional: Price */}
                  {product.price && (
                    <p className="text-xs text-gray-600 mt-1">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {groupedProducts.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-600 mb-2">No products found</h2>
          <p className="text-gray-500">
            There are currently no products available in this category.
          </p>
        </div>
      )}
    </div>
  );
}
