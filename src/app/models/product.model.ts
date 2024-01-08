export interface Category {
  id: string;
  name: string;
  image?: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

export interface NewProduct extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProduct extends Partial<NewProduct> {}
