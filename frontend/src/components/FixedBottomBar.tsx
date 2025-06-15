// components/FixedBottomBar.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

const FixedBottomBar: React.FC = () => {
  const handleAddToOrder = () => {
    // Add your cart logic here
    console.log('Adding to order...');
  };

  return (
    <>
      {/* Fixed Bottom Container */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Store Selection */}
            <div className="flex-1 relative left-36">
              <div className="text-sm text-gray-600 mb-1">
                For item availability
              </div>
              <Button 
                variant="default" 
                className="flex items-center text-left bg-[#006241] text-white px-4 py-2 rounded-lg hover:bg-green-900 transition-colors h-auto"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-sm">Choose a store</div>
                </div>
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>

            {/* Add to Order Button */}
            <div className="ml-4">
              <Button
                onClick={handleAddToOrder}
                className="w-30 bg-[#006241] hover:bg-green-800 text-white font-medium py-3 px-8 rounded-full transition-colors shadow-lg"
              >
                Add to Order
              </Button>
            </div>

            {/* Cart Icon with Badge */}
            <div className="ml-4 relative ">
              <Button variant="ghost" size="icon" className="p-2  text-gray-600 hover:text-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6m-1 4H8" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind fixed bar */}
      <div className="h-28"></div>
    </>
  );
};

export default FixedBottomBar;





// // components/FixedBottomBar.tsx
// 'use client';

// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { useCart } from '@/contexts/CartContext';
// import { useRouter } from 'next/navigation';

// interface FixedBottomBarProps {
//   productId?: string;
//   productName?: string;
//   productPrice?: number;
//   productImage?: string;
// }

// const FixedBottomBar: React.FC<FixedBottomBarProps> = ({ 
//   productId, 
//   productName, 
//   productPrice, 
//   productImage 
// }) => {
//   const { addToCart, cartItemsCount } = useCart();
//   const router = useRouter();

//   const handleAddToOrder = () => {  
//     if (productId && productName && productPrice) {
//       addToCart({
//         id: productId,
//         name: productName,
//         price: productPrice,
//         image: productImage || '',
//       });
//     } 
//   };

//   const handleCartClick = () => {
//     console.log('🛒 Cart button clicked!');
//     router.push('/menu/cart');
//   };

//   const isDisabled = !productId || !productName || !productPrice;

//   return (
//     <>
      
//       {/* Fixed Bottom Container */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             {/* Store Selection */}
//             <div className="flex-1 relative left-36">
//               <div className="text-sm text-gray-600 mb-1">
//                 For item availability
//               </div>
//               <Button 
//                 variant="default" 
//                 className="flex items-center text-left bg-[#006241] text-white px-4 py-2 rounded-lg hover:bg-green-900 transition-colors h-auto"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                 </svg>
//                 <div>
//                   <div className="font-medium text-sm">Choose a store</div>
//                 </div>
//                 <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </Button>
//             </div>

//             {/* Add to Order Button */}
//             <div className="ml-4">
//               <Button
//                 onClick={handleAddToOrder}
//                 onMouseDown={() => console.log('🖱️ Button mouse down')}
//                 onMouseUp={() => console.log('🖱️ Button mouse up')}
//                 disabled={isDisabled}
//                 className={`w-30 font-medium py-3 px-8 rounded-full transition-colors shadow-lg relative z-10 ${
//                   isDisabled 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-[#006241] hover:bg-green-800 text-white cursor-pointer'
//                 }`}
//                 style={{ pointerEvents: 'auto' }} // Force pointer events
//               >
//                 Add to Order
//               </Button>
//             </div>

//             {/* Cart Icon with Badge */}
//             <div className="ml-4 relative">
//               <Button 
//                 variant="ghost" 
//                 size="icon" 
//                 className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
//                 onClick={handleCartClick}
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6m-1 4H8" />
//                 </svg>
//                 {cartItemsCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
//                     {cartItemsCount}
//                   </span>
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Spacer to prevent content from being hidden behind fixed bar */}
//       <div className="h-28"></div>
//     </>
//   );
// };

// export default FixedBottomBar;