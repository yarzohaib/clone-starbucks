// components/MenuLoader.tsx
import { Coffee } from "lucide-react";

export default function MenuLoader() {
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-white">
      <div className="animate-spin mb-4">
        <Coffee 
          size={48} 
          className="text-[#00704A]" 
        />
      </div>
      
      <div className="mt-4 flex space-x-1">
        <div className="w-2 h-2 bg-[#00704A] rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-[#00704A] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-[#00704A] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}