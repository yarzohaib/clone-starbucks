// // app/menu/[slug]/[product]/page.tsx
// import React from 'react';
// import { notFound } from 'next/navigation';
// import { getProductBySlug, getSubSubCategories } from '@/lib/strapi';
// import ProductDetail from '@/components/ProductDetail';

// interface ProductPageProps {
//   params: {
//     slug: string;
//     product: string;
//   };
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   const { product: productSlug } = await params;
  
//   try {
//     // Fetch the specific product and sub-subcategories
//     const [product, subSubCategories] = await Promise.all([
//       getProductBySlug(productSlug),
//       getSubSubCategories()
//     ]);

//     if (!product) {
//       notFound();
//     }

//     // Find the sub-subcategory this product belongs to
//     const productSubSubCategory = subSubCategories.find(subSubCat => 
//       subSubCat.products?.some(p => p.documentId === product.documentId)
//     );

//     // Find the parent category to determine if it's drinks (has size options)
//     const isDrinkCategory = productSubSubCategory?.sub_category?.category?.slug === 'hot-coffee' || 
//                            productSubSubCategory?.sub_category?.category?.slug === 'cold-coffee' ||
//                            productSubSubCategory?.sub_category?.category?.slug === 'drinks';

//     return (
//       <ProductDetail 
//         product={product}
//         subSubCategory={productSubSubCategory}
//         isDrinkCategory={isDrinkCategory}
//       />
//     );
//   } catch (error) {
//     console.error('Error fetching product data:', error);
//     notFound();
//   }
// }

// app/menu/[slug]/[product]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug, getSubSubCategories } from '@/lib/strapi';
import ProductDetail from '@/components/ProductDetail';

interface ProductPageProps {
  params: Promise<{
    slug: string;
    product: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // ✅ CORRECT - Await the entire params object first
  const { product: productSlug } = await params;
  
  try {
    // Fetch the specific product and sub-subcategories
    const [product, subSubCategories] = await Promise.all([
      getProductBySlug(productSlug),
      getSubSubCategories()
    ]);

    if (!product) {
      notFound();
    }

    // Find the sub-subcategory this product belongs to
    const productSubSubCategory = subSubCategories.find(subSubCat => 
      subSubCat.products?.some(p => p.documentId === product.documentId)
    );

    // Find the parent category to determine if it's drinks (has size options)
    const isDrinkCategory = productSubSubCategory?.sub_category?.category?.slug === 'hot-coffee' || 
                           productSubSubCategory?.sub_category?.category?.slug === 'cold-coffee' ||
                           productSubSubCategory?.sub_category?.category?.slug === 'drinks';

    return (
      <ProductDetail 
        product={product}
        subSubCategory={productSubSubCategory}
        isDrinkCategory={isDrinkCategory}
      />
    );
  } catch (error) {
    console.error('Error fetching product data:', error);
    notFound();
  }
}