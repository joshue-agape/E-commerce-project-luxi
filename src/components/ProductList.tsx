import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Grid, List } from 'lucide-react';
import { products, categories, type Product } from '@/data/product.data';

interface ProductListProps {
    onAddToCart: (product: Product) => void;
}

export function ProductList({ onAddToCart }: ProductListProps) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('featured');

    const filteredProducts =
        selectedCategory === 'all'
            ? products
            : products.filter((p) => p.category === selectedCategory);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    return (
        <div className="min-h-screen bg-zinc-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-zinc-900">Nos Produits</h1>
                    <p className="text-zinc-500">Découvrez notre sélection premium</p>
                </div>

                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                    selectedCategory === category.id
                                        ? 'bg-zinc-900 text-white'
                                        : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
                                }`}
                            >
                                {category.name}
                                <span
                                    className={`ml-2 ${selectedCategory === category.id ? 'text-zinc-300' : 'text-zinc-400'}`}
                                >
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="h-4 w-4 text-zinc-400" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
                            >
                                <option value="featured">En vedette</option>
                                <option value="price-asc">Prix croissant</option>
                                <option value="price-desc">Prix décroissant</option>
                                <option value="rating">Meilleures notes</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-1 border border-zinc-200 rounded-lg bg-white p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`flex h-8 w-8 items-center justify-center rounded ${
                                    viewMode === 'grid'
                                        ? 'bg-zinc-100 text-zinc-900'
                                        : 'text-zinc-400'
                                }`}
                            >
                                <Grid className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`flex h-8 w-8 items-center justify-center rounded ${
                                    viewMode === 'list'
                                        ? 'bg-zinc-100 text-zinc-900'
                                        : 'text-zinc-400'
                                }`}
                            >
                                <List className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {sortedProducts.length === 0 ? (
                    <div className="flex h-64 flex-col items-center justify-center text-center">
                        <p className="text-lg font-medium text-zinc-900">Aucun produit trouvé</p>
                        <p className="text-zinc-500">Essayez une autre catégorie</p>
                    </div>
                ) : (
                    <div
                        className={`grid gap-6 ${
                            viewMode === 'grid'
                                ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                : 'grid-cols-1'
                        }`}
                    >
                        {sortedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={onAddToCart}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
