// import Link from "next/link"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"

// export default function Navbar() {
//   return (
//     <nav className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 left-0 z-50">
//       <div className="max-w-7xl mx-auto pl-4 sm:pl-6 lg:pl-8 pr-0 relative">
//         <div className="flex items-center justify-between h-24 w-full">
//           {/* Logo Section */}
//           <div className="flex-shrink-0 ml-8 absolute left-10">
//             <Link href="/">
//               <Image
//                 src="/starbucks-icon.svg"
//                 alt="Starbucks Logo"
//                 width={48}
//                 height={48}
//                 className="w-12 h-12"
//               />
//             </Link>
//           </div>

//           {/* Navigation Section - Absolutely positioned */}
//           <div className="hidden md:block absolute left-32">
//             <div className="flex items-center gap-x-12">
//               <Link
//                 href="/menu"
//                 className="text-gray-700 hover:text-[#00704A] font-bold text-sm tracking-wide uppercase transition-colors duration-200"
//               >
//                 MENU
//               </Link>
//               <Link
//                 href="/rewards"
//                 className="text-gray-700 hover:text-[#00704A] font-bold text-sm tracking-wide uppercase transition-colors duration-200"
//               >
//                 REWARDS
//               </Link>
//               <Link
//                 href="/gift-cards"
//                 className="text-gray-700 hover:text-[#00704A] font-bold text-sm tracking-wide uppercase transition-colors duration-200"
//               >
//                 GIFT CARDS
//               </Link>
//             </div>
//           </div>

//           {/* Right side - Find Store and Sign In buttons */}
//           <div className="flex items-center gap-x-6 absolute right-0">
//             <Button
//               variant="ghost"
//               className="hidden sm:flex items-center gap-x-2 text-black hover:text-[#006241] font-medium text-sm px-4 py-2"
//             >
//               <svg
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="text-gray-600"
//               >
//                 <path
//                   d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
//                   fill="currentColor"
//                 />
//               </svg>
//               <span>Find a store</span>
//             </Button>

//             <Button
//               variant="outline"
//               className="hidden sm:inline-flex border-black text-black hover:bg-gray-50 font-medium text-sm px-6 py-2 rounded-full"
//             >
//               Sign in
//             </Button>

//             <Button className="hidden sm:inline-flex bg-black text-white hover:bg-gray-800 font-medium text-sm px-6 py-2 rounded-full">
//               Join now
//             </Button>

//             {/* Mobile menu button */}
//             <button className="md:hidden p-2">
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="text-gray-700"
//               >
//                 <path
//                   d="M3 12h18M3 6h18M3 18h18"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }




"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto pl-4 sm:pl-6 lg:pl-8 pr-0 relative">
        <div className="flex items-center justify-between h-24 w-full">
          {/* Logo Section */}
          <div className="flex-shrink-0 ml-8 absolute left-10">
            <Link href="/">
              <Image
                src="/starbucks-icon.svg"
                alt="Starbucks Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </Link>
          </div>

          {/* Navigation Section - Absolutely positioned */}
          <div className="hidden md:block absolute left-33">
            <div className="flex items-center gap-x-12">
              <Link
                href="/menu"
                className={`text-gray-700 hover:text-[#00704A] font-bold text-sm tracking-wide uppercase transition-colors duration-200 pb-6 border-b-2 ${
                  isActive("/menu") ? "border-[#00704A] text-[#00704A]" : "border-transparent"
                }`}
              >
                MENU
              </Link>
              <Link
                href="/rewards"
                className={`text-gray-700 hover:text-[#00704A] font-bold text-sm tracking-wide uppercase transition-colors duration-200 pb-6 border-b-2 ${
                  isActive("/rewards") ? "border-[#00704A] text-[#00704A]" : "border-transparent"
                }`}
              >
                REWARDS
              </Link>
              <Link
                href="/gift-cards"
                className={`text-gray-700 hover:text-[#00704A] font-bold text-sm tracking-wide uppercase transition-colors duration-200 pb-6 border-b-2 ${
                  isActive("/gift-cards") ? "border-[#00704A] text-[#00704A]" : "border-transparent"
                }`}
              >
                GIFT CARDS
              </Link>
            </div>
          </div>

          {/* Right side - Find Store and Sign In buttons */}
          <div className="flex items-center gap-x-6 absolute left-290">
            <Button
              variant="ghost"
              className="hidden sm:flex items-center gap-x-2 text-black hover:text-[#006241] font-medium text-sm px-4 py-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-600"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="currentColor"
                />
              </svg>
              <span>Find a store</span>
            </Button>

            <Button
              variant="outline"
              className="hidden w-20 sm:inline-flex border-black text-black hover:bg-gray-50 font-medium text-sm px-6 py-2 rounded-full"
            >
              Sign in
            </Button>

            <Button className="hidden w-24 sm:inline-flex bg-black text-white hover:bg-gray-800 font-medium text-sm px-6 py-2 rounded-full">
              Join now
            </Button>

            {/* Mobile menu button */}
            <button className="md:hidden p-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-700"
              >
                <path
                  d="M3 12h18M3 6h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
