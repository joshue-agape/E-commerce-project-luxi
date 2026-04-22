import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import type { Product } from '@/data/product.data';

interface CartItem extends Product {
    quantity: number;
}

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQuantity: (productId: string, quantity: number) => void;
    onRemoveItem: (productId: string) => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl">
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <ShoppingBag className="h-5 w-5 text-zinc-600" />
                            <h2 className="text-lg font-semibold text-zinc-900">Votre Panier</h2>
                            <span className="flex h-6 min-w-6 items-center justify-center bg-zinc-900 px-2 text-xs font-medium text-white">
                                {itemCount}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex h-10 w-10 items-center justify-center text-zinc-500 hover:text-zinc-900"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {items.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-center">
                                <ShoppingBag className="mb-4 h-16 w-16 text-zinc-200" />
                                <p className="text-lg font-medium text-zinc-900">
                                    Votre panier est vide
                                </p>
                                <p className="text-sm text-zinc-500">
                                    Ajoutez des produits pour commencer
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 border-b border-zinc-100 pb-4"
                                    >
                                        <div className="h-20 w-20 shrink-0 overflow-hidden bg-zinc-100">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <h3 className="text-sm font-medium text-zinc-900 line-clamp-2">
                                                {item.name}
                                            </h3>
                                            <p className="mt-1 text-sm text-zinc-500">
                                                {item.category}
                                            </p>
                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            onUpdateQuantity(
                                                                item.id,
                                                                item.quantity - 1,
                                                            )
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center border border-zinc-200 hover:bg-zinc-50"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            onUpdateQuantity(
                                                                item.id,
                                                                item.quantity + 1,
                                                            )
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center border border-zinc-200 hover:bg-zinc-50"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-medium">
                                                        {(item.price * item.quantity).toFixed(2)} €
                                                    </span>
                                                    <button
                                                        onClick={() => onRemoveItem(item.id)}
                                                        className="text-zinc-400 hover:text-red-600"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="border-t border-zinc-200 px-6 py-4">
                            <div className="mb-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Sous-total</span>
                                    <span className="font-medium">{total.toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Livraison</span>
                                    <span className="font-medium">Gratuite</span>
                                </div>
                                <div className="flex justify-between border-t border-zinc-100 pt-2 text-base">
                                    <span className="font-medium">Total</span>
                                    <span className="font-semibold">{total.toFixed(2)} €</span>
                                </div>
                            </div>
                            <button className="w-full bg-zinc-900 py-3 text-sm font-medium text-white hover:bg-zinc-800">
                                Passer la commande
                            </button>
                            <button
                                onClick={onClose}
                                className="mt-2 w-full border border-zinc-200 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
                            >
                                Continuer les achats
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
