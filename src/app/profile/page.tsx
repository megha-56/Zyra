'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userRes, ordersRes] = await Promise.all([
        fetch('/api/user/profile'),
        fetch('/api/orders'),
      ]);

      if (userRes.status === 401 || ordersRes.status === 401) {
        router.push('/login');
        return;
      }

      const userData = await userRes.json();
      const ordersData = await ordersRes.json();

      setUser(userData.user);
      setOrders(ordersData.orders || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-600" />
                </div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Package className="h-5 w-5" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'wishlist'
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  Wishlist
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'addresses'
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <MapPin className="h-5 w-5" />
                  Addresses
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h1 className="text-3xl font-bold mb-6">My Orders</h1>
                {orders.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-4">No orders yet</p>
                    <Button onClick={() => router.push('/category/men')}>
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order: any) => (
                      <div key={order._id} className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              Order #{order._id.slice(-8)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`px-4 py-1 rounded-full text-sm font-semibold ${
                              order.status === 'delivered'
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'shipped'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>

                        <div className="space-y-3 mb-4">
                          {order.items.map((item: any, index: number) => (
                            <div key={index} className="flex gap-4">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                                <Image
                                  src={item.image || '/placeholder-product.jpg'}
                                  alt={item.name}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-600">
                                  Size: {item.size} • Qty: {item.quantity}
                                </p>
                              </div>
                              <p className="font-semibold">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="border-t pt-4 flex justify-between items-center">
                          <p className="text-lg font-bold">
                            Total: ₹{order.totalAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div>
                <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                  <Heart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">
                    View your wishlist on the dedicated page
                  </p>
                  <Button onClick={() => router.push('/wishlist')}>
                    Go to Wishlist
                  </Button>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <h1 className="text-3xl font-bold mb-6">Saved Addresses</h1>
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  {user?.addresses && user.addresses.length > 0 ? (
                    <div className="space-y-4">
                      {user.addresses.map((address: any, index: number) => (
                        <div
                          key={index}
                          className="border-2 border-gray-200 rounded-xl p-4"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold mb-2">{address.street}</p>
                              <p className="text-gray-600">
                                {address.city}, {address.state} {address.zipCode}
                              </p>
                              <p className="text-gray-600">{address.country}</p>
                            </div>
                            {address.isDefault && (
                              <span className="px-3 py-1 bg-black text-white text-sm rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600">No saved addresses</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}