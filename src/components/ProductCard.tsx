import { ShoppingBag, Star, Check } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/data/product.data';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const [isAdded, setIsAdded] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleAddToCart = () => {
        onAddToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
    };

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    return (
        <div className="group relative flex flex-col bg-white border border-zinc-200 transition-all hover:shadow-lg">
            <div className="relative aspect-square overflow-hidden bg-zinc-100">
                {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
                    </div>
                )}
                <img
                    src={product.image}
                    alt={product.name}
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                />

                <div className="absolute left-3 top-3 flex flex-col gap-2">
                    {product.tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-zinc-900 px-2 py-1 text-xs font-medium text-white"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {discount && (
                    <div className="absolute right-3 top-3 bg-red-600 px-2 py-1 text-xs font-medium text-white">
                        -{discount}%
                    </div>
                )}

                <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all ${
                        isAdded
                            ? 'bg-green-600 text-white'
                            : 'bg-white text-zinc-900 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-zinc-900 hover:text-white'
                    }`}
                >
                    {isAdded ? (
                        <>
                            <Check className="h-4 w-4" />
                            Ajouté
                        </>
                    ) : (
                        <>
                            <ShoppingBag className="h-4 w-4" />
                            Ajouter au panier
                        </>
                    )}
                </button>
            </div>

            <div className="flex flex-1 flex-col p-4">
                <p className="mb-1 text-xs font-medium text-zinc-500 uppercase tracking-wide">
                    {product.category}
                </p>
                <h3 className="mb-2 text-base font-medium text-zinc-900 line-clamp-2">
                    {product.name}
                </h3>

                <div className="mb-3 flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                    i < Math.floor(product.rating)
                                        ? 'fill-amber-400 text-amber-400'
                                        : 'text-zinc-300'
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-zinc-500">({product.reviews})</span>
                </div>

                <div className="mt-auto flex items-center gap-2">
                    <span className="text-lg font-semibold text-zinc-900">
                        {product.price.toFixed(2)} €
                    </span>
                    {product.originalPrice && (
                        <span className="text-sm text-zinc-400 line-through">
                            {product.originalPrice.toFixed(2)} €
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
