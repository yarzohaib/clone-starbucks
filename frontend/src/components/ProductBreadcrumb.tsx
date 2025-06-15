// components/ProductBreadcrumb.tsx
import React from 'react';
import Link from 'next/link';
import { Product, SubSubCategory } from '@/lib/types';

interface ProductBreadcrumbProps {
  product: Product;
  subSubCategory?: SubSubCategory;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ 
  product, 
  subSubCategory 
}) => {
  return (
    <div className="bg-gray-50 py-4 relative left-32">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="text-sm text-gray-600">
          <Link 
            href="/menu" 
            className="hover:text-green-700 transition-colors"
          >
            Menu
          </Link>
          
          {subSubCategory?.sub_category && (
            <>
              <span className="mx-2">/</span>
              <Link 
                href={`/menu/${subSubCategory.sub_category.slug}`}
                className="hover:text-green-700 transition-colors"
              >
                {subSubCategory.sub_category.Name}
              </Link>
            </>
          )}
          
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">
            {product.Name}
          </span>
        </nav>
      </div>
    </div>
  );
};

export default ProductBreadcrumb;