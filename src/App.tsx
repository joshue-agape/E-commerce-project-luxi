import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductList } from '@/components/ProductList';
import { Dashboard } from '@/components/Dashboard';
import { SalesView } from '@/components/SalesView';
import { Cart } from '@/components/Cart';
import { Footer } from '@/components/Footer';
import type { Product } from '@/data/product.data';

interface CartItem extends Product {
    quantity: number;
}

export default function App() {
    const [currentView, setCurrentView] = useState('home');
    const [isCartOpen, setIsCartOpen] = useState(false);

    function getInitialCart(): CartItem[] {
        const saved = localStorage.getItem('cart');
        if (!saved) return [];

        try {
            return JSON.parse(saved);
        } catch {
            return [];
        }
    }

    const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Product) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        );
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const renderContent = () => {
        switch (currentView) {
            case 'home':
                return (
                    <>
                        <Hero onShopNow={() => setCurrentView('products')} />
                        <div className="py-16 bg-white">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="mb-8 flex items-end justify-between">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-zinc-900">
                                            Produits en Vedette
                                        </h2>
                                        <p className="text-zinc-500">Notre sélection du moment</p>
                                    </div>
                                    <button
                                        onClick={() => setCurrentView('products')}
                                        className="text-sm font-medium text-zinc-900 hover:text-zinc-600"
                                    >
                                        Voir tout
                                    </button>
                                </div>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {[0, 1, 2, 3].map((index) => {
                                        const product = [
                                            {
                                                id: 'PROD-001',
                                                name: 'Casque Audio Sans Fil Pro',
                                                category: 'Electronics',
                                                price: 299.99,
                                                originalPrice: 349.99,
                                                image: '/images/photo-1505740420928-5e560c06d30e.jpg',
                                                description: 'Casque audio haute fidélité',
                                                rating: 4.8,
                                                reviews: 124,
                                                inStock: true,
                                                tags: ['Nouveau'],
                                            },
                                            {
                                                id: 'PROD-002',
                                                name: 'Sac en Cuir Italien',
                                                category: 'Fashion',
                                                price: 450.0,
                                                image: '/images/photo-1548036328-c9fa89d128fa.jpg',
                                                description: 'Sac artisanal en cuir',
                                                rating: 4.9,
                                                reviews: 89,
                                                inStock: true,
                                                tags: ['Premium'],
                                            },
                                            {
                                                id: 'PROD-003',
                                                name: 'Lampe Design Scandinave',
                                                category: 'Home',
                                                price: 189.0,
                                                image: '/images/photo-1507473885765-e6ed057f782c.jpg',
                                                description: 'Lampe minimaliste',
                                                rating: 4.7,
                                                reviews: 156,
                                                inStock: true,
                                                tags: ['Design'],
                                            },
                                            {
                                                id: 'PROD-004',
                                                name: 'Montre Connectée Sport',
                                                category: 'Electronics',
                                                price: 399.0,
                                                originalPrice: 449.0,
                                                image: '/images/photo-1523275335684-37898b6baf30.jpg',
                                                description: 'Montre intelligente',
                                                rating: 4.6,
                                                reviews: 203,
                                                inStock: true,
                                                tags: ['Sport'],
                                            },
                                        ][index];
                                        return (
                                            <div
                                                key={product.id}
                                                className="group cursor-pointer"
                                                onClick={() => setCurrentView('products')}
                                            >
                                                <div className="relative aspect-square overflow-hidden bg-zinc-100 mb-4">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    {product.originalPrice && (
                                                        <div className="absolute right-3 top-3 bg-red-600 px-2 py-1 text-xs font-medium text-white">
                                                            Promo
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-xs font-medium text-zinc-500 uppercase">
                                                    {product.category}
                                                </p>
                                                <h3 className="mt-1 text-base font-medium text-zinc-900">
                                                    {product.name}
                                                </h3>
                                                <div className="mt-2 flex items-center gap-2">
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
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        {/* Features Section */}
                        <div className="border-t border-zinc-200 bg-zinc-50 py-16">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                    <div className="text-center">
                                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-zinc-900 text-white">
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="mb-2 font-medium text-zinc-900">
                                            Qualité Garantie
                                        </h3>
                                        <p className="text-sm text-zinc-500">
                                            Tous nos produits sont sélectionnés avec soin
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-zinc-900 text-white">
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="mb-2 font-medium text-zinc-900">
                                            Livraison Rapide
                                        </h3>
                                        <p className="text-sm text-zinc-500">
                                            Expédition sous 24-48h pour tous les articles
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-zinc-900 text-white">
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="mb-2 font-medium text-zinc-900">
                                            Paiement Sécurisé
                                        </h3>
                                        <p className="text-sm text-zinc-500">
                                            Transactions 100% sécurisées et encryptées
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-zinc-900 text-white">
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="mb-2 font-medium text-zinc-900">
                                            Support 24/7
                                        </h3>
                                        <p className="text-sm text-zinc-500">
                                            Assistance client disponible à tout moment
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 'products':
                return <ProductList onAddToCart={addToCart} />;
            case 'dashboard':
                return <Dashboard />;
            case 'sales':
                return <SalesView />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header
                cartCount={cartCount}
                onCartClick={() => setIsCartOpen(true)}
                currentView={currentView}
                onViewChange={setCurrentView}
            />
            <main>{renderContent()}</main>
            <Footer />
            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
            />
        </div>
    );
}
