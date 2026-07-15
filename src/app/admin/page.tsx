'use client';

import { useState, useEffect } from 'react';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  IndianRupee,
  Plus,
  Edit,
  Trash2,
  X,
  TrendingUp,
  Lock
} from 'lucide-react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ImageUpload from '@/components/ImageUpload';
import { toast } from 'sonner';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Shirts',
    gender: 'Men',
    images: [] as string[],
    sizes: 'S,M,L,XL',
    colors: 'Black,White',
    stock: '100',
    featured: false,
  });

  const handlePasskeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY || passkey === 'admin@zyra2025') {
      setIsAuthenticated(true);
      toast.success('Access granted!');
    } else {
      toast.error('Invalid passkey!');
      setPasskey('');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [activeTab, isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'dashboard') {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        setStats(data.stats);
        setOrders(data.recentOrders);
      } else if (activeTab === 'products') {
        const res = await fetch('/api/admin/products');
        const data = await res.json();
        setProducts(data.products);
      } else if (activeTab === 'orders') {
        const res = await fetch('/api/admin/orders');
        const data = await res.json();
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock),
        images: productForm.images,
        sizes: productForm.sizes.split(',').map(s => s.trim()),
        colors: productForm.colors.split(',').map(c => c.trim()),
      };

      const method = editingProduct ? 'PUT' : 'POST';
      const body = editingProduct 
        ? { id: editingProduct._id, ...productData }
        : productData;

      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
        setShowProductModal(false);
        setEditingProduct(null);
        resetForm();
        fetchData();
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Product deleted successfully!');
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      gender: product.gender,
      images: product.images,
      sizes: product.sizes.join(', '),
      colors: product.colors.join(', '),
      stock: product.stock.toString(),
      featured: product.featured,
    });
    setShowProductModal(true);
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status }),
      });

      if (res.ok) {
        toast.success('Order status updated successfully!');
        fetchData();
      }
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    }
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: 'Shirts',
      gender: 'Men',
      images: [],
      sizes: 'S,M,L,XL',
      colors: 'Black,White',
      stock: '100',
      featured: false,
    });
  };

  // Show passkey login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-black rounded-full">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">Admin Access</h1>
          <p className="text-gray-600 text-center mb-8">
            Enter the admin passkey to continue
          </p>
          <form onSubmit={handlePasskeySubmit}>
            <Input
              label="Passkey"
              type="password"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="Enter admin passkey"
              required
            />
            <Button type="submit" className="w-full mt-6">
              Unlock Dashboard
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={() => {
              setIsAuthenticated(false);
              setPasskey('');
              toast.success('Logged out successfully');
            }}
            className="w-full sm:w-auto"
          >
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 mb-6 md:mb-8 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 md:px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 md:px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 md:px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Orders
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-gray-600 text-sm mb-1">Total Users</p>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <ShoppingBag className="h-6 w-6 text-green-600" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-gray-600 text-sm mb-1">Total Orders</p>
                <p className="text-3xl font-bold">{stats.totalOrders}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Package className="h-6 w-6 text-purple-600" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-gray-600 text-sm mb-1">Total Products</p>
                <p className="text-3xl font-bold">{stats.totalProducts}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-100 rounded-xl">
                    <IndianRupee className="h-6 w-6 text-yellow-600" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold">₹{stats.totalRevenue.toFixed(2)}</p>
              </div>
            </div>

            {/* Order Status */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Order Status</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">{stats.processingOrders}</p>
                  <p className="text-sm text-gray-600">Processing</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <p className="text-2xl font-bold text-purple-600">{stats.shippedOrders}</p>
                  <p className="text-sm text-gray-600">Shipped</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-2xl font-bold text-green-600">{stats.deliveredOrders}</p>
                  <p className="text-sm text-gray-600">Delivered</p>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
              <div className="space-y-3">
                {orders.slice(0, 5).map((order: any) => (
                  <div key={order._id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-semibold">{order.user?.name || 'Guest'}</p>
                      <p className="text-sm text-gray-600">
                        #{order._id.slice(-8)} • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{order.totalAmount.toFixed(2)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Products Management</h2>
              <Button
                onClick={() => {
                  setEditingProduct(null);
                  resetForm();
                  setShowProductModal(true);
                }}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <Plus className="h-5 w-5" />
                Add Product
              </Button>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Mobile View */}
                <div className="md:hidden">
                  {products.map((product) => (
                    <div key={product._id} className="border-b p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.gender} • {product.category}</p>
                          <p className="font-bold mt-1">₹{product.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Product</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-sm text-gray-600">{product.gender}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">{product.category}</td>
                          <td className="px-6 py-4 font-semibold">₹{product.price.toFixed(2)}</td>
                          <td className="px-6 py-4">{product.stock}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit className="h-4 w-4 text-blue-600" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-6">Orders Management</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <div key={order._id} className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                      <div className="flex-1">
                        <p className="font-bold text-base md:text-lg">Order #{order._id.slice(-8)}</p>
                        <p className="text-sm text-gray-600">
                          {order.user?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.user?.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="w-full md:w-auto text-left md:text-right">
                        <p className="text-xl md:text-2xl font-bold">₹{order.totalAmount.toFixed(2)}</p>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          className={`mt-2 w-full md:w-auto px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'processing' ? 'bg-purple-100 text-purple-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="font-semibold mb-2">Items:</p>
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm mb-1">
                          <span className="flex-1">{item.name} (x{item.quantity})</span>
                          <span className="font-semibold ml-2">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t mt-4 pt-4">
                      <p className="font-semibold mb-1">Shipping Address:</p>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}, {order.shippingAddress.country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8 p-4 md:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => {
                setShowProductModal(false);
                setEditingProduct(null);
                resetForm();
              }}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <Input
                label="Product Name"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Price"
                  type="number"
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  required
                />

                <Input
                  label="Stock"
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="Shirts">Shirts</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Jerseys">Jerseys (Unisex)</option>
                    <option value="Wears">Wears (Women Only)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={productForm.gender}
                    onChange={(e) => setProductForm({ ...productForm, gender: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Children">Children</option>
                    <option value="Unisex">Unisex (Jerseys)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                <ImageUpload
                  value={productForm.images}
                  onChange={(urls) => setProductForm({ ...productForm, images: urls })}
                  maxImages={5}
                />
              </div>

              <Input
                label="Sizes (comma separated)"
                value={productForm.sizes}
                onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                placeholder="S, M, L, XL"
                required
              />

              <Input
                label="Colors (comma separated)"
                value={productForm.colors}
                onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                placeholder="Black, White, Blue"
                required
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={productForm.featured}
                  onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured Product
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" className="flex-1 w-full">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setShowProductModal(false);
                    setEditingProduct(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}