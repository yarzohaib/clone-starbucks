// // app/menu/[slug]/[product]/page.tsx
// import React from 'react';
// import { notFound } from 'next/navigation';
// import { getProductBySlug, getSubSubCategories } from '@/lib/strapi';
// import ProductDetail from '@/components/ProductDetail';

// interface ProductPageProps {
//   params: Promise<{
//     slug: string;
//     product: string;
//   }>;
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   // ✅ CORRECT - Await the entire params object first
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
import { notFound } from 'next/navigation';
import { getProductBySlug, getSubSubCategories, getProducts } from '@/lib/strapi';
import ProductDetail from '@/components/ProductDetail';
import { unstable_cache } from 'next/cache';
import { Suspense } from 'react';
import MenuLoader from '@/components/MenuLoader';

interface ProductPageProps {
  params: Promise<{
    slug: string;
    product: string;
  }>;
}

// Configure revalidation - 1 hour = 3600 seconds
export const revalidate = 3600;

// Generate static params for all product slugs
export async function generateStaticParams() {
  try {
    const products = await getProducts();
    
    return products.map((product) => ({
      product: product.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { product: productSlug } = await params;
  
  try {
    const product = await getProductBySlug(productSlug);
    
    if (!product) {
      return {
        title: 'Product Not Found',
      };
    }

    return {
      title: `${product.Name} - Menu`,
      description: product.description || `${product.Name} - View details and pricing`,
    };
  } catch (error) {
    return {
      title: 'Product',error
    };
  }
}

// Create a cached function for getting product with its category context
const getProductWithContext = unstable_cache(
  async (productSlug: string) => {
    const [product, subSubCategories] = await Promise.all([
      getProductBySlug(productSlug),
      getSubSubCategories()
    ]);

    if (!product) {
      return null;
    }

    // Find the sub-subcategory this product belongs to
    const productSubSubCategory = subSubCategories.find(subSubCat => 
      subSubCat.products?.some(p => p.documentId === product.documentId)
    );

    // Determine if it's a drink category (has size options)
    const isDrinkCategory = productSubSubCategory?.sub_category?.category?.slug === 'hot-coffee' || 
                           productSubSubCategory?.sub_category?.category?.slug === 'cold-coffee' ||
                           productSubSubCategory?.sub_category?.category?.slug === 'drinks';

    return {
      product,
      productSubSubCategory,
      isDrinkCategory
    };
  },
  ['product-with-context'], // base cache key
  {
    revalidate: 3600, // 1 hour
    tags: ['products', 'sub-sub-categories'] // Will invalidate when either changes
  }
);

// Main content component
async function ProductContent({ productSlug }: { productSlug: string }) {
  const productData = await getProductWithContext(productSlug);

  // Handle case where product is not found
  if (!productData) {
    notFound(); // This will show your 404 page
  }

  const { product, productSubSubCategory, isDrinkCategory } = productData;

  return (
    <ProductDetail 
      product={product}
      subSubCategory={productSubSubCategory}
      isDrinkCategory={isDrinkCategory}
    />
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product: productSlug } = await params;

  return (
    <Suspense fallback={<MenuLoader />}>
      <ProductContent productSlug={productSlug} />
    </Suspense>
  );
}