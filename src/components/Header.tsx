import { useState } from 'react';
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react';

interface HeaderProps {
    cartCount: number;
    onCartClick: () => void;
    currentView: string;
    onViewChange: (view: string) => void;
}

export function Header({ cartCount, onCartClick, currentView, onViewChange }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'Accueil' },
        { id: 'products', label: 'Produits' },
        { id: 'dashboard', label: 'Tableau de Bord' },
        { id: 'sales', label: 'Ventes' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => onViewChange('home')}
                            className="flex items-center gap-2 text-xl font-semibold tracking-tight text-zinc-900"
                        >
                            <div className="flex h-8 w-8 items-center justify-center bg-zinc-900 text-white">
                                <ShoppingBag className="h-5 w-5" />
                            </div>
                            <span>LUXE STORE</span>
                        </button>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onViewChange(item.id)}
                                className={`text-sm font-medium transition-colors ${
                                    currentView === item.id
                                        ? 'text-zinc-900'
                                        : 'text-zinc-500 hover:text-zinc-900'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="flex h-10 w-10 items-center justify-center text-zinc-500 hover:text-zinc-900"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                        <button className="hidden sm:flex h-10 w-10 items-center justify-center text-zinc-500 hover:text-zinc-900">
                            <Heart className="h-5 w-5" />
                        </button>
                        <button className="hidden sm:flex h-10 w-10 items-center justify-center text-zinc-500 hover:text-zinc-900">
                            <User className="h-5 w-5" />
                        </button>
                        <button
                            onClick={onCartClick}
                            className="relative flex h-10 w-10 items-center justify-center text-zinc-500 hover:text-zinc-900"
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-zinc-900 text-xs font-medium text-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex md:hidden h-10 w-10 items-center justify-center text-zinc-500 hover:text-zinc-900"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {isSearchOpen && (
                    <div className="border-t border-zinc-200 py-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Rechercher un produit..."
                                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-zinc-400"
                            />
                        </div>
                    </div>
                )}
            </div>

            {isMenuOpen && (
                <div className="border-t border-zinc-200 md:hidden">
                    <div className="space-y-1 px-4 py-4">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onViewChange(item.id);
                                    setIsMenuOpen(false);
                                }}
                                className={`block w-full rounded-lg px-3 py-2 text-left text-base font-medium ${
                                    currentView === item.id
                                        ? 'bg-zinc-100 text-zinc-900'
                                        : 'text-zinc-600 hover:bg-zinc-50'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
