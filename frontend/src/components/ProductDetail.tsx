
// // components/ProductDetail.tsx
// 'use client';

// import React, { useState } from 'react';
// //import Image from 'next/image';
// import ProductBreadcrumb from './ProductBreadcrumb';
// import ProductHero from './ProductHero';
// import SizeSelector from './SizeSelector';
// import ProductDescription from './ProductDescription';
// import FixedBottomBar from './FixedBottomBar';
// import { Product, SubSubCategory } from '@/lib/types';

// interface ProductDetailProps {
//   product: Product;
//   subSubCategory?: SubSubCategory;
//   isDrinkCategory: boolean;
// }

// export interface SizeOption {
//   id: string;
//   name: string;
//   volume: string;
//   calories: number;
//   selected: boolean;
// }

// const ProductDetail: React.FC<ProductDetailProps> = ({ 
//   product, 
//   subSubCategory,
//   isDrinkCategory 
// }) => {
//   // Size options for drinks
//   const sizeOptions: SizeOption[] = [
//     { id: 'short', name: 'Short', volume: '8 fl oz', calories: product.calories || 5, selected: false },
//     { id: 'tall', name: 'Tall', volume: '12 fl oz', calories: Math.round((product.calories || 5) * 1.5), selected: false },
//     { id: 'grande', name: 'Grande', volume: '16 fl oz', calories: Math.round((product.calories || 5) * 2), selected: true },
//     { id: 'venti', name: 'Venti', volume: '20 fl oz', calories: Math.round((product.calories || 5) * 2.5), selected: false }
//   ];

//   const [selectedSize, setSelectedSize] = useState<SizeOption>(
//     sizeOptions.find(size => size.selected) || sizeOptions[2]
//   );

//   const handleSizeChange = (size: SizeOption) => {
//     setSelectedSize(size);
//   };

//   // // Calculate the current price based on selected size (for drinks)
//   // const getCurrentPrice = () => {
//   //   if (!isDrinkCategory) {
//   //     return product.price || 0;
//   //   }
    
//   //   // Price multiplier based on size
//   //   const sizeMultipliers = {
//   //     'short': 0.85,
//   //     'tall': 1.0,
//   //     'grande': 1.15,
//   //     'venti': 1.3
//   //   };
    
//   //   const multiplier = sizeMultipliers[selectedSize.id as keyof typeof sizeMultipliers] || 1.0;
//   //   return Math.round((product.price || 0) * multiplier * 100) / 100; // Round to 2 decimal places
//   // };



//   // // Get current product name with size (for drinks)
//   // const getCurrentProductName = () => {
//   //   if (!isDrinkCategory) {
//   //     return product.Name; // Changed from product.name to product.Name
//   //   }
//   //   return `${selectedSize.name} ${product.Name}`; // Changed from product.name to product.Name
//   // };

//   return (
//     <div className="min-h-screen bg-white pb-32 ">
//       {/* Breadcrumb */}
//       <ProductBreadcrumb 
//         product={product}
//         subSubCategory={subSubCategory}
//       /><br/>

//       {/* Hero Section */}
//       <ProductHero 
//         product={product}
//         selectedSize={selectedSize}
//       />

//       {/* Content */}
//       <div className="max-w-7xl mx-auto px-4 py-8 relative top-10 ">
//         {/* Size Selector - Only for drinks */}
//         {isDrinkCategory && (
//           <SizeSelector 
//             sizes={sizeOptions}
//             selectedSize={selectedSize}
//             onSizeChange={handleSizeChange}
//           />
//         )}

//         {/* Store Availability Notice - Only for non-drinks */}
//         {!isDrinkCategory && (
//           <div className="h-20 w-screen flex items-center justify-center bg-transparent rounded-lg mb-6">
//             <div className="flex items-center text-gray-300">
//               <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//               </svg>
//               <span className="text-sm font-medium">
//                 Select a store to view availability
//               </span>
//             </div>
//           </div>
//         )}

//         {/* Product Description */}
//         <ProductDescription 
//           product={product}
//           selectedSize={selectedSize}
//           isDrinkCategory={isDrinkCategory}
//         />
//       </div>

//       {/* Fixed Bottom Bar - NOW WITH PROPS! */}
//       <FixedBottomBar 
//         // productId={product.id?.toString() || product.documentId || ''}
//         // productName={getCurrentProductName()}
//         // productPrice={getCurrentPrice()}
//         // productImage={product.image?.url || ''}
//       />
//     </div>
//   );
// };

// export default ProductDetail;












// components/ProductDetail.tsx
'use client';

import React, { useState } from 'react';
//import Image from 'next/image';
import ProductBreadcrumb from './ProductBreadcrumb';
import ProductHero from './ProductHero';
import SizeSelector from './SizeSelector';
import ProductDescription from './ProductDescription';
import FixedBottomBar from './FixedBottomBar';
import { Product, SubSubCategory } from '@/lib/types';

interface ProductDetailProps {
  product: Product;
  subSubCategory?: SubSubCategory;
  isDrinkCategory: boolean;
}

export interface SizeOption {
  id: string;
  name: string;
  volume: string;
  calories: number;
  selected: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  subSubCategory,
  isDrinkCategory 
}) => {
  // Size options for drinks
  const sizeOptions: SizeOption[] = [
    { id: 'short', name: 'Short', volume: '8 fl oz', calories: product.calories || 5, selected: false },
    { id: 'tall', name: 'Tall', volume: '12 fl oz', calories: Math.round((product.calories || 5) * 1.5), selected: false },
    { id: 'grande', name: 'Grande', volume: '16 fl oz', calories: Math.round((product.calories || 5) * 2), selected: true },
    { id: 'venti', name: 'Venti', volume: '20 fl oz', calories: Math.round((product.calories || 5) * 2.5), selected: false }
  ];

  const [selectedSize, setSelectedSize] = useState<SizeOption>(
    sizeOptions.find(size => size.selected) || sizeOptions[2]
  );

  const handleSizeChange = (size: SizeOption) => {
    setSelectedSize(size);
  };

  return (
    <div className="min-h-screen bg-white pb-32 ">
      {/* Breadcrumb */}
      <ProductBreadcrumb 
        product={product}
        subSubCategory={subSubCategory}
      /><br/>

      {/* Hero Section */}
      <ProductHero 
        product={product}
        selectedSize={selectedSize}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 relative top-10 ">
        {/* Size Selector - Only for drinks */}
        {isDrinkCategory && (
          <SizeSelector 
            sizes={sizeOptions}
            selectedSize={selectedSize}
            onSizeChange={handleSizeChange}
          />
        )}

        {/* Store Availability Notice - Only for non-drinks */}
        {!isDrinkCategory && (
          <div className="h-20 w-screen flex items-center justify-center bg-transparent rounded-lg mb-6">
            <div className="flex items-center text-gray-300">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">
                Select a store to view availability
              </span>
            </div>
          </div>
        )}

        {/* Product Description */}
        <ProductDescription 
          product={product}
          selectedSize={selectedSize}
          isDrinkCategory={isDrinkCategory}
        />
      </div>

      {/* Fixed Bottom Bar */}
      <FixedBottomBar />
    </div>
  );
};

export default ProductDetail;