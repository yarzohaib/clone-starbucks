// components/SizeSelector.tsx
import React from 'react';
import { SizeOption } from './ProductDetail';

interface SizeSelectorProps {
  sizes: SizeOption[];
  selectedSize: SizeOption;
  onSizeChange: (size: SizeOption) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ 
  sizes, 
  selectedSize, 
  onSizeChange 
}) => {
  return (
    <div className="mb-12 relative left-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Size options
      </h2><hr/><br/>
      
      <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => onSizeChange(size)}
            className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 min-w-[100px] ${
              selectedSize.id === size.id
                ? 'border-green-700 bg-green-50'
                : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
            }`}
          >
            {/* Cup Icon */}
            <div className={`mb-3 ${
              selectedSize.id === size.id ? 'text-green-700' : 'text-gray-600'
            }`}>
              <svg 
                className={`w-8 h-8 ${
                  size.id === 'short' ? 'w-6 h-6' :
                  size.id === 'tall' ? 'w-7 h-7' :
                  size.id === 'grande' ? 'w-8 h-8' :
                  'w-9 h-9'
                }`}
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M2 21h18v-2H2v2zM20 8H4V6h16v2zM17.5 3h-11L5 5v1h14V5l-1.5-2zM6 7v8a2 2 0 002 2h8a2 2 0 002-2V7H6z"/>
              </svg>
            </div>
            
            {/* Size Name */}
            <span className={`font-medium text-sm ${
              selectedSize.id === size.id ? 'text-green-700' : 'text-gray-900'
            }`}>
              {size.name}
            </span>
            
            {/* Volume */}
            <span className="text-xs text-gray-500 mt-1">
              {size.volume}
            </span>
          </button>
        ))}
      </div><br/><br/>
    </div>
  );
};

export default SizeSelector;