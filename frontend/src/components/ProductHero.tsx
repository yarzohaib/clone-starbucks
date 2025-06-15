// components/ProductHero.tsx
import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { SizeOption } from './ProductDetail';

interface ProductHeroProps {
  product: Product;
  selectedSize: SizeOption;
}

const ProductHero: React.FC<ProductHeroProps> = ({ 
  product, 
  selectedSize 
}) => {
  return (
    <div className="bg-[#1c3831] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 relative left-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {product.image?.url ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${product.image.url}`}
                  alt={product.image.alternativeText || product.Name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 320px, 384px"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-[#004030] rounded-lg flex items-center justify-center">
                  <span className="text-green-200 text-lg">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 text-center ">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {product.Name}
            </h1>
            
            <div className="text-xl text-bg-[#005137]">
              {selectedSize.calories} calories
              <span className="inline-flex items-center ml-2">
                <svg 
                  className="w-4 h-4" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;