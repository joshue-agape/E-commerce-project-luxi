export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
    description: string;
    rating: number;
    reviews: number;
    inStock: boolean;
    tags: string[];
}

export const products: Product[] = [
    {
        id: 'PROD-001',
        name: 'Casque Audio Sans Fil Pro',
        category: 'Electronics',
        price: 299.99,
        originalPrice: 349.99,
        image: '/images/photo-1505740420928-5e560c06d30e.jpg',
        description:
            'Casque audio haute fidélité avec réduction de bruit active et autonomie de 30 heures.',
        rating: 4.8,
        reviews: 124,
        inStock: true,
        tags: ['Nouveau', 'Populaire'],
    },
    {
        id: 'PROD-002',
        name: 'Sac en Cuir Italien',
        category: 'Fashion',
        price: 450.0,
        image: '/images/photo-1548036328-c9fa89d128fa.jpg',
        description:
            'Sac artisanal en cuir véritable italien, fabriqué à la main par des maîtres artisans.',
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
        description:
            'Lampe minimaliste au design scandinave, parfaite pour un intérieur contemporain.',
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
        description:
            "Montre intelligente avec suivi de la santé, GPS intégré et résistance à l'eau.",
        rating: 4.6,
        reviews: 203,
        inStock: true,
        tags: ['Sport', 'Tech'],
    },
    {
        id: 'PROD-005',
        name: 'Écran 4K Ultra HD 32"',
        category: 'Electronics',
        price: 899.0,
        image: '/images/photo-1527443224154-c4a3942d3acf.jpg',
        description: 'Écran professionnel 4K avec couleurs précises et technologie HDR avancée.',
        rating: 4.8,
        reviews: 78,
        inStock: true,
        tags: ['Pro', 'Gaming'],
    },
    {
        id: 'PROD-006',
        name: 'Manteau Hiver Cachemire',
        category: 'Fashion',
        price: 650.0,
        image: '/images/photo-1539533018447-63fcce2678e3.jpg',
        description: "Manteau élégant en cachemire mélangé, chaud et léger pour l'hiver.",
        rating: 4.9,
        reviews: 45,
        inStock: true,
        tags: ['Hiver', 'Luxe'],
    },
    {
        id: 'PROD-007',
        name: 'Set de Cuisine Professionnel',
        category: 'Home',
        price: 350.0,
        originalPrice: 420.0,
        image: '/images/photo-1556910103-1c02745aae4d.jpg',
        description: "Set complet d'ustensiles de cuisine en acier inoxydable haute qualité.",
        rating: 4.7,
        reviews: 112,
        inStock: true,
        tags: ['Cuisine', 'Cadeau'],
    },
    {
        id: 'PROD-008',
        name: 'Coffret Soin Premium',
        category: 'Beauty',
        price: 120.0,
        image: '/images/photo-1596462502278-27bfdc403348.jpg',
        description: 'Coffret de soins naturels et bio pour une routine beauté complète.',
        rating: 4.5,
        reviews: 167,
        inStock: true,
        tags: ['Bio', 'Naturel'],
    },
];

export const categories = [
    { id: 'all', name: 'Tous', count: products.length },
    {
        id: 'Electronics',
        name: 'Électronique',
        count: products.filter((p) => p.category === 'Electronics').length,
    },
    { id: 'Fashion', name: 'Mode', count: products.filter((p) => p.category === 'Fashion').length },
    { id: 'Home', name: 'Maison', count: products.filter((p) => p.category === 'Home').length },
    { id: 'Beauty', name: 'Beauté', count: products.filter((p) => p.category === 'Beauty').length },
];
