import { ArrowRight } from 'lucide-react';

interface HeroProps {
    onShopNow: () => void;
}

export function Hero({ onShopNow }: HeroProps) {
    return (
        <section className="relative overflow-hidden bg-zinc-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid min-h-150 items-center gap-8 lg:grid-cols-2">
                    <div className="flex flex-col justify-center py-12 lg:py-0">
                        <span className="mb-4 text-sm font-medium tracking-wide text-zinc-500 uppercase">
                            Collection 2024
                        </span>
                        <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                            L'Excellence
                            <br />
                            <span className="text-zinc-500">à Votre Portée</span>
                        </h1>
                        <p className="mb-8 max-w-lg text-lg leading-relaxed text-zinc-600">
                            Découvrez notre sélection premium de produits soigneusement choisis pour
                            leur qualité exceptionnelle et leur design intemporel.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={onShopNow}
                                className="group inline-flex items-center gap-2 bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                            >
                                Découvrir
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </button>
                            <button className="inline-flex items-center gap-2 border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50">
                                En savoir plus
                            </button>
                        </div>

                        <div className="mt-12 grid grid-cols-3 gap-8 border-t border-zinc-200 pt-8">
                            <div>
                                <p className="text-2xl font-semibold text-zinc-900">15K+</p>
                                <p className="text-sm text-zinc-500">Clients satisfaits</p>
                            </div>
                            <div>
                                <p className="text-2xl font-semibold text-zinc-900">500+</p>
                                <p className="text-sm text-zinc-500">Produits premium</p>
                            </div>
                            <div>
                                <p className="text-2xl font-semibold text-zinc-900">99%</p>
                                <p className="text-sm text-zinc-500">Avis positifs</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative aspect-square overflow-hidden bg-zinc-200">
                            <img
                                src="/images/photo-1441986300917-64674bd600d8.jpg"
                                alt="Collection Premium"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute bottom-6 left-6 bg-white p-4">
                                <p className="text-sm font-medium text-zinc-500">
                                    Nouvelle Collection
                                </p>
                                <p className="text-lg font-semibold text-zinc-900">
                                    Élégance & Style
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
