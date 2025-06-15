import React from 'react';
import Image from 'next/image';
import { SubCategory, SubSubCategory} from '@/lib/types';
import Link from 'next/link';

interface MenuDetailProps {
  subCategory: SubCategory;
  subSubCategories: SubSubCategory[];
}

const MenuDetail: React.FC<MenuDetailProps> = ({ 
  subCategory, 
  subSubCategories
}) => {
  // Filter sub-subcategories that belong to this subcategory
  const filteredSubSubCategories = subSubCategories.filter(
    subSubCat => subSubCat.sub_category?.documentId === subCategory.documentId
  );

  // Get products for a specific sub-subcategory
  const getProductsForSubSubCategory = (subSubCategoryId: string) => {
    // Find the sub-subcategory and return its products
    const subSubCategory = filteredSubSubCategories.find(
      subSubCat => subSubCat.documentId === subSubCategoryId
    );
    return subSubCategory?.products || [];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-6">
        <Link href={'/menu'}>Menu</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{subCategory.Name}</span>
      </nav><br/>

      {/* Main Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-12">
        {subCategory.Name}
      </h1><br/><br/>

      {/* Sub-subcategories and their products */}
      {filteredSubSubCategories.map((subSubCategory, subSubIndex) => {
        const categoryProducts = getProductsForSubSubCategory(subSubCategory.documentId);
        
        if (categoryProducts.length === 0) return null;

        return (
          <div key={subSubCategory.documentId} className="mb-16">
            {/* Sub-subcategory title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {subSubCategory.Name}
            </h2><br/><hr/><br/>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {categoryProducts.map((product, productIndex) => (
                <Link 
                  key={product.documentId} 
                  href={`/menu/${subCategory.slug}/${product.slug}`}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  {/* Product image with lazy loading */}
                  <div className="relative w-24 h-24 mb-4 overflow-hidden rounded-full bg-green-800 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {product.image?.url && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${product.image.url}`}
                        alt={product.image.alternativeText || product.Name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="96px"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        // Conditional loading: priority for first few, lazy for others
                        {...(subSubIndex === 0 && productIndex < 4 
                          ? { priority: true } 
                          : { loading: "lazy" as const }
                        )}
                      />
                    )}
                    
                    {/* Fallback when no image */}
                    {!product.image?.url && (
                      <div className="w-full h-full flex items-center justify-center text-white text-xs">
                        No Image
                      </div>
                    )}
                  </div><br/>

                  {/* Product name */}
                  <h3 className="text-lg font-medium text-gray-900 leading-tight max-w-40">
                    {product.Name}
                  </h3><br/><br/>
{/*       
                  {product.price && (
                    <p className="text-sm text-gray-600 mt-1">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                   */}
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {/* Empty state */}
      {filteredSubSubCategories.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default MenuDetail;