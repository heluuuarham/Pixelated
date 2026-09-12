import { useState } from 'react';
import Artwork from './Artwork';
import { type Product } from '@/products';

interface ProductPhotoProps {
  product: Product;
  angle?: number;        // 1 = main photo, 2/3/4 = extra angles
  className?: string;
  rounded?: boolean;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function ProductPhoto({ product, angle = 1, className = '', rounded = true }: ProductPhotoProps) {
  const [failed, setFailed] = useState(false);

  const slug = slugify(product.name);
  const suffix = angle === 1 ? '' : `-${angle}`;
  const path = `${product.category}/${slug}${suffix}.jpg`;
  const url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/products/${path}`;

  if (failed) {
    // No real photo uploaded yet (or it 404'd) — fall back to the
    // existing generated placeholder art, exactly as before.
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
