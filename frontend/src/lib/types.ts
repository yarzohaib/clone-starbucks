export interface Category {
    id: number;
    documentId: string;
    Name: string;
    slug: string|null;
    sub_categories: SubCategory 
}

export interface Hero {
  id: number;
  documentId: string;
  Title: string;
  subtitle: string;
  image: ImageData;
}

interface ImageFormat {
  url: string;
  width: number;
  height: number;
  size: number;
  mime: string;
}

export interface ImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  url: string;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}

export interface SubCategory {
  id: number;
  documentId: string;
  Name: string;
  slug: string;
  icon: ImageData;
  category: Category
  sub_sub_category: SubSubCategory[]
}

export interface Product {
  id: number;
  documentId: string;
  Name: string;
  slug: string;
  description: string | null;
  price: number | null;
  calories: number | null;
  image: ImageData;
  sub_sub_categories: SubSubCategory;
}

export interface SubSubCategory {
    id: number;
    documentId: string;
    Name: string;
    sub_category: SubCategory;
    products: Product[];
}