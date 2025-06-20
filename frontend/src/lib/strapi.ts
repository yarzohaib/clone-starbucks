// import { Category, Hero, SubCategory, Product, SubSubCategory } from "./types";

// export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
// if (!STRAPI_URL) {
//   throw new Error('NEXT_PUBLIC_STRAPI_API_URL environment variable is not set');
// }

// /**
//  * Fetches categories from Strapi
//  */
// export async function getCategories(): Promise<Category[]> {
//   const res = await fetch(`${STRAPI_URL}/api/categories?populate=sub_categories`);
//   const json = await res.json();
//   return json.data.map((item: Category) => ({
//     id: item.id,
//     documentId: item.documentId,
//     Name: item.Name,
//     slug: item.slug || null,
//     sub_categories:item.sub_categories,
//   }));
// }

// /**
//  * Fetches subcategories from Strapi
//  */
// export async function getSubCategories(): Promise<SubCategory[]> {
//   const res = await fetch(`${STRAPI_URL}/api/sub-categories?populate=*`);
//   const json = await res.json();
//   return json.data.map((item: SubCategory) => ({
//     id: item.id,
//     documentId: item.documentId,
//     Name: item.Name,
//     slug: item.slug,
//     icon: {
//       id: item.icon.id,
//       documentId: item.icon.documentId,
//       name: item.icon.name,
//       alternativeText: item.icon.alternativeText,
//       caption: item.icon.caption,
//       width: item.icon.width,
//       height: item.icon.height,
//       url: item.icon.url,
//     },
//     category:item.category,
//     sub_sub_category: item.sub_sub_category,
//   }));
// }

// /**
//  * Fetches hero data from Strapi
//  */
// export async function getHero(): Promise<Hero[]> {
//   try {
//     const res = await fetch(`${STRAPI_URL}/api/hero-sections?populate=image`);
    
//     if (!res.ok) {
//       console.error(`HTTP Error: ${res.status} - ${res.statusText}`);
//       return [];
//     }
    
//     const json = await res.json();
//     console.log("Strapi response:", JSON.stringify(json, null, 2));

//     if (!json || !json.data || json.data.length === 0) {
//       console.error("Error: No data returned from Strapi");
//       return [];
//     }

//     return json.data.map((item: Hero) => {
//       console.log("Processing item:", item);

//       return {
//         id: item.id,
//         documentId: item.documentId,
//         Title: item.Title,
//         subtitle: item.subtitle,
//         image: {
//           id: item.image.id,
//           documentId: item.image.documentId,
//           name: item.image.name,
//           alternativeText: item.image.alternativeText,
//           caption: item.image.caption,
//           width: item.image.width,
//           height: item.image.height,
//           url: item.image.url,
//           formats: item.image.formats,
//         },
//       };
//     });
//   } catch (error) {
//     console.error("Error fetching hero data:", error);
//     return [];
//   }
// }

// // Fetches products data from strapi
// export async function getProducts(): Promise<Product[]> {
//   try {
//     const res = await fetch(`${STRAPI_URL}/api/products?populate=*`);
    
//     if (!res.ok) {
//       console.error(`Failed to fetch products: ${res.status} ${res.statusText}`);
//       return [];
//     }

//     const json = await res.json();

//     return json.data.map((item: Product) => ({
//       id: item.id,
//       documentId: item.documentId,
//       Name: item.Name,
//       slug: item.slug,
//       description: item.description,
//       price: item.price,
//       calories: item.calories,
//       image: {
//         id: item.image.id,
//         documentId: item.image.documentId,
//         name: item.image.name,
//         alternativeText: item.image.alternativeText,
//         caption: item.image.caption,
//         width: item.image.width,
//         height: item.image.height,
//         url: item.image.url,
//         formats: item.image.formats,
//       },
//       sub_sub_categories: item.sub_sub_categories,
//     }));
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// }

// export async function getSubSubCategories(): Promise<SubSubCategory[]> {
//   const res = await fetch(`${STRAPI_URL}/api/sub-sub-categories?populate[products][populate]=*&populate[sub_category][populate]=*`);//sub-sub-categories?populate[products][populate]=*
//   const json = await res.json();
//   return json.data.map((item: SubSubCategory) => ({
//     id: item.id,
//     documentId: item.documentId,
//     Name: item.Name,
//     sub_category: item.sub_category,
//     products: item.products ,
//   }));
// }


// /**
//  * Fetches a single product by slug from Strapi
//  */
// export async function getProductBySlug(slug: string): Promise<Product | null> {
//   try {
//     const res = await fetch(`${STRAPI_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`);
    
//     if (!res.ok) {
//       console.error(`Failed to fetch product: ${res.status} ${res.statusText}`);
//       return null;
//     }

//     const json = await res.json();
    
//     if (!json.data || json.data.length === 0) {
//       return null;
//     }

//     const item = json.data[0];
//     return {
//       id: item.id,
//       documentId: item.documentId,
//       Name: item.Name,
//       slug: item.slug,
//       description: item.description,
//       price: item.price,
//       calories: item.calories,
//       image: {
//         id: item.image.id,
//         documentId: item.image.documentId,
//         name: item.image.name,
//         alternativeText: item.image.alternativeText,
//         caption: item.image.caption,
//         width: item.image.width,
//         height: item.image.height,
//         url: item.image.url,
//         formats: item.image.formats,
//       },
//       sub_sub_categories: item.sub_sub_categories,
//     };
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return null;
//   }
// }






import { unstable_cache } from 'next/cache';
import { Category, Hero, SubCategory, Product, SubSubCategory } from "./types";

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
if (!STRAPI_URL) {
  throw new Error('NEXT_PUBLIC_STRAPI_API_URL environment variable is not set');
}

/**
 * Fetches categories from Strapi with caching
 */
export const getCategories = unstable_cache(
  async (): Promise<Category[]> => {
    const res = await fetch(`${STRAPI_URL}/api/categories?populate=sub_categories`, {
      next: { revalidate: 3600 } // 1 hour
    });
    const json = await res.json();
    return json.data.map((item: Category) => ({
      id: item.id,
      documentId: item.documentId,
      Name: item.Name,
      slug: item.slug || null,
      sub_categories: item.sub_categories,
    }));
  },
  ['categories'],
  {
    revalidate: 3600,
    tags: ['categories']
  }
);

/**
 * Fetches subcategories from Strapi with caching
 */
export const getSubCategories = unstable_cache(
  async (): Promise<SubCategory[]> => {
    const res = await fetch(`${STRAPI_URL}/api/sub-categories?populate=*`, {
      next: { revalidate: 3600 } // 1 hour
    });
    const json = await res.json();
    return json.data.map((item: SubCategory) => ({
      id: item.id,
      documentId: item.documentId,
      Name: item.Name,
      slug: item.slug,
      icon: {
        id: item.icon.id,
        documentId: item.icon.documentId,
        name: item.icon.name,
        alternativeText: item.icon.alternativeText,
        caption: item.icon.caption,
        width: item.icon.width,
        height: item.icon.height,
        url: item.icon.url,
      },
      category: item.category,
      sub_sub_category: item.sub_sub_category,
    }));
  },
  ['sub-categories'],
  {
    revalidate: 3600,
    tags: ['sub-categories']
  }
);

/**
 * Fetches hero data from Strapi with caching
 */
export const getHero = unstable_cache(
  async (): Promise<Hero[]> => {
    try {
      const res = await fetch(`${STRAPI_URL}/api/hero-sections?populate=image`, {
        next: { revalidate: 3600 } // 1 hour
      });
      
      if (!res.ok) {
        console.error(`HTTP Error: ${res.status} - ${res.statusText}`);
        return [];
      }
      
      const json = await res.json();
      console.log("Strapi response:", JSON.stringify(json, null, 2));

      if (!json || !json.data || json.data.length === 0) {
        console.error("Error: No data returned from Strapi");
        return [];
      }

      return json.data.map((item: Hero) => {
        console.log("Processing item:", item);

        return {
          id: item.id,
          documentId: item.documentId,
          Title: item.Title,
          subtitle: item.subtitle,
          image: {
            id: item.image.id,
            documentId: item.image.documentId,
            name: item.image.name,
            alternativeText: item.image.alternativeText,
            caption: item.image.caption,
            width: item.image.width,
            height: item.image.height,
            url: item.image.url,
            formats: item.image.formats,
          },
        };
      });
    } catch (error) {
      console.error("Error fetching hero data:", error);
      return [];
    }
  },
  ['hero'],
  {
    revalidate: 3600,
    tags: ['hero']
  }
);

/**
 * Fetches products data from strapi with caching
 */
export const getProducts = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      const res = await fetch(`${STRAPI_URL}/api/products?populate=*`, {
        next: { revalidate: 3600 } // 1 hour
      });
      
      if (!res.ok) {
        console.error(`Failed to fetch products: ${res.status} ${res.statusText}`);
        return [];
      }

      const json = await res.json();

      return json.data.map((item: Product) => ({
        id: item.id,
        documentId: item.documentId,
        Name: item.Name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        calories: item.calories,
        image: {
          id: item.image.id,
          documentId: item.image.documentId,
          name: item.image.name,
          alternativeText: item.image.alternativeText,
          caption: item.image.caption,
          width: item.image.width,
          height: item.image.height,
          url: item.image.url,
          formats: item.image.formats,
        },
        sub_sub_categories: item.sub_sub_categories,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },
  ['products'],
  {
    revalidate: 3600,
    tags: ['products']
  }
);

/**
 * Fetches sub-sub-categories from Strapi with caching
 */
export const getSubSubCategories = unstable_cache(
  async (): Promise<SubSubCategory[]> => {
    const res = await fetch(`${STRAPI_URL}/api/sub-sub-categories?populate[products][populate]=*&populate[sub_category][populate]=*`, {
      next: { revalidate: 3600 } // 1 hour
    });
    const json = await res.json();
    return json.data.map((item: SubSubCategory) => ({
      id: item.id,
      documentId: item.documentId,
      Name: item.Name,
      sub_category: item.sub_category,
      products: item.products,
    }));
  },
  ['sub-sub-categories'],
  {
    revalidate: 3600,
    tags: ['sub-sub-categories']
  }
);

/**
 * Fetches a single product by slug from Strapi with caching
 */
export const getProductBySlug = unstable_cache(
  async (slug: string): Promise<Product | null> => {
    try {
      const res = await fetch(`${STRAPI_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`, {
        next: { revalidate: 3600 } // 1 hour
      });
      
      if (!res.ok) {
        console.error(`Failed to fetch product: ${res.status} ${res.statusText}`);
        return null;
      }

      const json = await res.json();
      
      if (!json.data || json.data.length === 0) {
        return null;
      }

      const item = json.data[0];
      return {
        id: item.id,
        documentId: item.documentId,
        Name: item.Name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        calories: item.calories,
        image: {
          id: item.image.id,
          documentId: item.image.documentId,
          name: item.image.name,
          alternativeText: item.image.alternativeText,
          caption: item.image.caption,
          width: item.image.width,
          height: item.image.height,
          url: item.image.url,
          formats: item.image.formats,
        },
        sub_sub_categories: item.sub_sub_categories,
      };
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  },
  ['product-by-slug'],
  {
    revalidate: 3600,
    tags: ['products']
  }
);

/**
 * Optional: Function to manually revalidate all cache tags
 * Useful for webhooks when content changes in Strapi
 */
export async function revalidateAllMenuData() {
  const { revalidateTag } = await import('next/cache');
  
  revalidateTag('categories');
  revalidateTag('sub-categories');
  revalidateTag('sub-sub-categories');
  revalidateTag('products');
  revalidateTag('hero');
}