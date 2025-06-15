// components/ProductDescription.tsx
import React from 'react';
import { Product } from '@/lib/types';
import { SizeOption } from './ProductDetail';

interface ProductDescriptionProps {
  product: Product;
  selectedSize: SizeOption;
  isDrinkCategory: boolean;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ 
  product, 
  isDrinkCategory 
}) => {
  return (
    <div className="space-y-8 w-screen lg:h-60 bg-[#1c3831]">
        <div className='relative left-16 top-8 bottom-8'>
      {/* Nutrition Badge */}
      <div className="inline-block ">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
          ★ {isDrinkCategory ? '100' : '200'}★ item
        </span>
      </div>

      {/* Product Description */}
      {product.description && (
        <div className="text-white text-lg leading-relaxed max-w-3xl">
          <p>{product.description}</p>
        </div>
      )}

      {/* Nutritional Information */}
      <div className=" rounded-lg p-6 max-w-md">
        <button className="mt-4 text-green-700 hover:text-green-800 font-medium text-sm border border-green-700 hover:border-green-800 rounded-full px-4 py-2 transition-colors">
          Full nutrition & ingredients list
        </button>
      </div>

      {/* Store Selection Note */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md">
        <div className="flex items-center text-green-800">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">
            Select a store to view availability
          </span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductDescription;