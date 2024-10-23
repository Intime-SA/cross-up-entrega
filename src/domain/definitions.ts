export interface Product {
  title: string;
  shooter: {
    id: string;
    name: string;
    images: string[];
    regularPrice: number;
    promotionalPrice: number | null;
    shortDescription: string;
  };
  products: Array<{
    id: string;
    name: string;
    images: string[];
    regularPrice: number;
    promotionalPrice: number | null;
    availableStock: number;
    shortDescription: string;
  }>;
  description: string;
  offerExpirationTime: number;
}

export interface ProductListProps {
  initialProducts: Product[];
}

export interface RelatedProduct {
  id: string;
  name: string;
  images: string[];
  regularPrice: number;
  promotionalPrice: number | null;
  availableStock: number;
  shortDescription: string;
}

export interface ProductCardProps {
  product: {
    title: string;
    shooter: {
      name: string;
      images: string[];
      regularPrice: number;
      promotionalPrice: number | null;
      shortDescription: string;
    };
    products: RelatedProduct[];
    description: string;
    offerExpirationTime: number;
  };
}

export interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

export interface RelatedProductsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  addedProduct: {
    name: string;
    image: string;
    price: number;
  };
  relatedProducts: RelatedProduct[];
}
