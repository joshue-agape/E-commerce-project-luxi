import { useState } from 'react';
import { Download, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { mockSales, type Sale } from '@/data/ecommerce_data';

type SortIconProps = {
    field: keyof Sale;
    sortField: keyof Sale;
    sortDirection: 'asc' | 'desc';
};

const SortIcon = ({ field, sortField, sortDirection }: SortIconProps) => {
    if (sortField !== field) return <ChevronDown className="h-4 w-4 text-zinc-300" />;

    return sortDirection === 'asc' ? (
        <ChevronUp className="h-4 w-4 text-zinc-900" />
    ) : (
        <ChevronDown className="h-4 w-4 text-zinc-900" />
    );
};

export function SalesView() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<keyof Sale>('order_date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [filterCategory, setFilterCategory] = useState('');

    const categories = [...new Set(mockSales.map((s) => s.product_category))];

    const filteredSales = mockSales
        .filter((sale) => {
            const matchesSearch =
                sale.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sale.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sale.product_name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !filterCategory || sale.product_category === filterCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            const aVal = a[sortField];
            const bVal = b[sortField];
            if (sortDirection === 'asc') {
                return aVal > bVal ? 1 : -1;
            }
            return aVal < bVal ? 1 : -1;
        });

    const handleSort = (field: keyof Sale) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-zinc-900">Données de Ventes</h1>
                        <p className="text-zinc-500">
                            Analyse détaillée des commandes et transactions
                        </p>
                    </div>
                    <button className="inline-flex items-center gap-2 border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                        <Download className="h-4 w-4" />
                        Exporter CSV
                    </button>
                </div>

                <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Rechercher par ID, client ou produit..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-zinc-400"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-zinc-400" />
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-zinc-400"
                        >
                            <option value="">Toutes les catégories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="overflow-hidden border border-zinc-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-zinc-50">
                                <tr>
                                    <th
                                        className="cursor-pointer px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase hover:bg-zinc-100"
                                        onClick={() => handleSort('order_id')}
                                    >
                                        <div className="flex items-center gap-1">
                                            ID Commande
                                            <SortIcon
                                                field="order_id"
                                                sortField={sortField}
                                                sortDirection={sortDirection}
                                            />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase hover:bg-zinc-100"
                                        onClick={() => handleSort('order_date')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Date
                                            <SortIcon
                                                field="order_date"
                                                sortField={sortField}
                                                sortDirection={sortDirection}
                                            />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase hover:bg-zinc-100"
                                        onClick={() => handleSort('customer_name')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Client
                                            <SortIcon
                                                field="customer_name"
                                                sortField={sortField}
                                                sortDirection={sortDirection}
                                            />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase hover:bg-zinc-100"
                                        onClick={() => handleSort('product_category')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Catégorie
                                            <SortIcon
                                                field="product_category"
                                                sortField={sortField}
                                                sortDirection={sortDirection}
                                            />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase">
                                        Produit
                                    </th>
                                    <th
                                        className="cursor-pointer px-4 py-3 text-right text-xs font-medium text-zinc-500 uppercase hover:bg-zinc-100"
                                        onClick={() => handleSort('quantity')}
                                    >
                                        <div className="flex items-center justify-end gap-1">
                                            Qté
                                            <SortIcon
                                                field="quantity"
                                                sortField={sortField}
                                                sortDirection={sortDirection}
                                            />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-4 py-3 text-right text-xs font-medium text-zinc-500 uppercase hover:bg-zinc-100"
                                        onClick={() => handleSort('total_sales')}
                                    >
                                        <div className="flex items-center justify-end gap-1">
                                            Total
                                            <SortIcon
                                                field="total_sales"
                                                sortField={sortField}
                                                sortDirection={sortDirection}
                                            />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-4 py-3 text-right text-xs font-medium text-zinc-500 uppercase hover:bg-zinc-100"
                                        onClick={() => handleSort('profit')}
                                    >
                                        <div className="flex items-center justify-end gap-1">
                                            Profit
                                            <SortIcon
                                                field="profit"
                                                sortField={sortField}
                                                sortDirection={sortDirection}
                                            />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase">
                                        Paiement
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200">
                                {filteredSales.map((sale) => (
                                    <tr key={sale.order_id} className="hover:bg-zinc-50">
                                        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-900">
                                            {sale.order_id}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-zinc-600">
                                            {new Date(sale.order_date).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-zinc-600">
                                            <div>
                                                <p className="font-medium">{sale.customer_name}</p>
                                                <p className="text-xs text-zinc-400">
                                                    {sale.customer_segment}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className="inline-flex items-center rounded bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700">
                                                {sale.product_category}
                                            </span>
                                        </td>
                                        <td
                                            className="max-w-xs px-4 py-3 text-sm text-zinc-600 truncate"
                                            title={sale.product_name}
                                        >
                                            {sale.product_name}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-zinc-900 text-right">
                                            {sale.quantity}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-900 text-right">
                                            {sale.total_sales.toLocaleString('fr-FR', {
                                                style: 'currency',
                                                currency: 'EUR',
                                            })}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-green-600 text-right">
                                            +
                                            {sale.profit.toLocaleString('fr-FR', {
                                                style: 'currency',
                                                currency: 'EUR',
                                            })}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-zinc-600">
                                            {sale.payment_method}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-zinc-200 px-4 py-3 bg-zinc-50">
                        <p className="text-sm text-zinc-600">
                            Affichage de <span className="font-medium">{filteredSales.length}</span>{' '}
                            commandes sur <span className="font-medium">{mockSales.length}</span> au
                            total
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white border border-zinc-200 p-4">
                        <p className="text-sm text-zinc-500">Ventes Filtrées</p>
                        <p className="mt-1 text-xl font-semibold text-zinc-900">
                            {filteredSales
                                .reduce((sum, s) => sum + s.total_sales, 0)
                                .toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                        </p>
                    </div>
                    <div className="bg-white border border-zinc-200 p-4">
                        <p className="text-sm text-zinc-500">Profit Total</p>
                        <p className="mt-1 text-xl font-semibold text-green-600">
                            +
                            {filteredSales
                                .reduce((sum, s) => sum + s.profit, 0)
                                .toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                        </p>
                    </div>
                    <div className="bg-white border border-zinc-200 p-4">
                        <p className="text-sm text-zinc-500">Quantité Totale</p>
                        <p className="mt-1 text-xl font-semibold text-zinc-900">
                            {filteredSales.reduce((sum, s) => sum + s.quantity, 0)} unités
                        </p>
                    </div>
                    <div className="bg-white border border-zinc-200 p-4">
                        <p className="text-sm text-zinc-500">Réduction Moyenne</p>
                        <p className="mt-1 text-xl font-semibold text-zinc-900">
                            {(
                                filteredSales.reduce((sum, s) => sum + s.discount_percent, 0) /
                                    filteredSales.length || 0
                            ).toFixed(1)}
                            %
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
