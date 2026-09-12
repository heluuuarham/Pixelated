import { useState } from 'react';
import Artwork from './Artwork';
import { type Product } from '@/products';

interface ProductPhotoProps {
  product: Product;
  angle?: number;
  className?: string;
  rounded?: boolean;
}

export default function ProductPhoto({ product, angle = 1, className = '', rounded = true }: ProductPhotoProps) {
  const [failed, setFailed] = useState(false);

  const suffix = angle === 1 ? '' : `-${angle}`;
  const path = `${product.category}/${product.id}${suffix}.jpg`;
  const url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/products/${path}`;

  if (failed) {
    return (
      <Artwork
        palette={product.palette}
        motif={product.motif}
        seed={`${product.id}-${angle}`}
        className={className}
        rounded={rounded}
      />
    );
  }

  return (
    <img
      src={url}
      alt={product.name}
      className={`${className} ${rounded ? 'rounded-sm' : ''}`}
      style={{ objectFit: 'cover', display: 'block', width: '100%', height: '100%' }}
      onError={() => setFailed(true)}
    />
  );
}
