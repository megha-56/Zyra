import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="ZYRA Logo" width={32} height={32} className="object-contain" />
              <h3 className="text-2xl font-bold">ZYRA</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Your destination for premium fashion. Quality clothing for men, women, and children.
            </p>
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Visit Our Store</p>
                <p>E7, Arera Hills</p>
                <p>Bhopal, Madhya Pradesh</p>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/men" className="text-gray-600 hover:text-black transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link href="/category/women" className="text-gray-600 hover:text-black transition-colors">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link href="/category/children" className="text-gray-600 hover:text-black transition-colors">
                  Children's Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-black transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-black transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-black transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-black transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full shadow hover:shadow-md transition-shadow"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full shadow hover:shadow-md transition-shadow"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full shadow hover:shadow-md transition-shadow"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@zyra.com"
                className="p-2 bg-white rounded-full shadow hover:shadow-md transition-shadow"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} ZYRA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}