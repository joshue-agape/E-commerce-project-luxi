import { TrendingUp, TrendingDown, Package, ShoppingCart, DollarSign } from 'lucide-react';
import {
    mockSales,
    getTotalRevenue,
    getTotalprofit,
    getTotalOrders,
    getAverageOrderValue,
} from '@/data/ecommerce_data';

export function Dashboard() {
    const totalRevenue = getTotalRevenue();
    const totalProfit = getTotalprofit();
    const totalOrders = getTotalOrders();
    const avgOrderValue = getAverageOrderValue();

    const stats = [
        {
            title: 'Revenus Totaux',
            value: totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }),
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
        },
        {
            title: 'Profit Total',
            value: totalProfit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }),
            change: '+8.2%',
            trend: 'up',
            icon: TrendingUp,
        },
        {
            title: 'Commandes',
            value: totalOrders.toString(),
            change: '+15.3%',
            trend: 'up',
            icon: ShoppingCart,
        },
        {
            title: 'Panier Moyen',
            value: avgOrderValue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }),
            change: '-2.1%',
            trend: 'down',
            icon: Package,
        },
    ];

    const categoryData = mockSales.reduce(
        (acc, sale) => {
            acc[sale.product_category] = (acc[sale.product_category] || 0) + sale.total_sales;
            return acc;
        },
        {} as Record<string, number>,
    );

    const categoryTotal = Object.values(categoryData).reduce((a, b) => a + b, 0);

    const segmentData = mockSales.reduce(
        (acc, sale) => {
            acc[sale.customer_segment] = (acc[sale.customer_segment] || 0) + sale.total_sales;
            return acc;
        },
        {} as Record<string, number>,
    );

    return (
        <div className="min-h-screen bg-zinc-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-zinc-900">Tableau de Bord</h1>
                    <p className="text-zinc-500">Vue d'ensemble de vos performances commerciales</p>
                </div>

                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.title} className="bg-white border border-zinc-200 p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-zinc-500">
                                        {stat.title}
                                    </p>
                                    <p className="mt-2 text-2xl font-semibold text-zinc-900">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center bg-zinc-100">
                                    <stat.icon className="h-5 w-5 text-zinc-600" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                {stat.trend === 'up' ? (
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                ) : (
                                    <TrendingDown className="h-4 w-4 text-red-600" />
                                )}
                                <span
                                    className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
                                >
                                    {stat.change}
                                </span>
                                <span className="text-sm text-zinc-400">vs mois dernier</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-2 mb-8">
                    <div className="bg-white border border-zinc-200 p-6">
                        <h3 className="text-lg font-semibold text-zinc-900 mb-6">
                            Ventes par Catégorie
                        </h3>
                        <div className="space-y-4">
                            {Object.entries(categoryData)
                                .sort(([, a], [, b]) => b - a)
                                .map(([category, value]) => {
                                    const percentage = (value / categoryTotal) * 100;
                                    return (
                                        <div key={category}>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-medium text-zinc-700">
                                                    {category}
                                                </span>
                                                <span className="text-zinc-500">
                                                    {value.toLocaleString('fr-FR', {
                                                        style: 'currency',
                                                        currency: 'EUR',
                                                    })}{' '}
                                                    ({percentage.toFixed(1)}%)
                                                </span>
                                            </div>
                                            <div className="h-2 bg-zinc-100 overflow-hidden">
                                                <div
                                                    className="h-full bg-zinc-900 transition-all duration-500"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    <div className="bg-white border border-zinc-200 p-6">
                        <h3 className="text-lg font-semibold text-zinc-900 mb-6">
                            Segments Clients
                        </h3>
                        <div className="space-y-4">
                            {Object.entries(segmentData)
                                .sort(([, a], [, b]) => b - a)
                                .map(([segment, value], index) => {
                                    const totalSegment = Object.values(segmentData).reduce(
                                        (a, b) => a + b,
                                        0,
                                    );
                                    const percentage = (value / totalSegment) * 100;
                                    const colors = ['bg-zinc-900', 'bg-zinc-600', 'bg-zinc-400'];
                                    return (
                                        <div key={segment} className="flex items-center gap-4">
                                            <div
                                                className={`h-12 w-12 flex items-center justify-center ${colors[index % colors.length]} text-white text-sm font-medium`}
                                            >
                                                {segment.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="font-medium text-zinc-700">
                                                        {segment}
                                                    </span>
                                                    <span className="text-zinc-500">
                                                        {percentage.toFixed(1)}%
                                                    </span>
                                                </div>
                                                <div className="h-2 bg-zinc-100 overflow-hidden">
                                                    <div
                                                        className={`h-full ${colors[index % colors.length]} transition-all duration-500`}
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-zinc-200">
                    <div className="border-b border-zinc-200 px-6 py-4">
                        <h3 className="text-lg font-semibold text-zinc-900">Dernières Commandes</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-zinc-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase">
                                        ID Commande
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase">
                                        Client
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase">
                                        Produit
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 uppercase">
                                        Montant
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 uppercase">
                                        Profit
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200">
                                {mockSales.slice(0, 5).map((sale) => (
                                    <tr key={sale.order_id} className="hover:bg-zinc-50">
                                        <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                                            {sale.order_id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-600">
                                            {sale.customer_name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-600 max-w-xs truncate">
                                            {sale.product_name}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-zinc-900 text-right">
                                            {sale.total_sales.toLocaleString('fr-FR', {
                                                style: 'currency',
                                                currency: 'EUR',
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-green-600 text-right">
                                            +
                                            {sale.profit.toLocaleString('fr-FR', {
                                                style: 'currency',
                                                currency: 'EUR',
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
