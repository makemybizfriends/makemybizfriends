
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/data/mockData';
import { 
  ArrowLeft, 
  Star, 
  Shield, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  ShoppingCart,
  IndianRupee,
  Truck,
  Award,
  Clock,
  Users,
  CheckCircle,
  MessageCircle,
  Share2,
  Heart
} from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find(p => p.id === id);

  // Convert USD to INR (approximate rate: 1 USD = 83 INR)
  const convertToINR = (usdPrice: number) => Math.round(usdPrice * 83);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/directory">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Directory
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/directory">
            <Button variant="ghost" size="sm" className="text-orange-600 hover:bg-orange-50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Product Directory
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50">
                <Heart className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">{product.category}</Badge>
                {product.inStock && (
                  <Badge className="bg-green-100 text-green-800">
                    <Truck className="h-3 w-3 mr-1" />
                    Ready to Ship
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">{product.title}</h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{product.shortDescription}</p>
              
              {/* Price Section */}
              <div className="bg-gradient-to-r from-orange-50 to-green-50 p-6 rounded-2xl mb-6 border border-orange-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Starting Price</div>
                    <div className="text-4xl font-bold text-orange-600 flex items-center">
                      <IndianRupee className="h-8 w-8 mr-2" />
                      {convertToINR(product.price).toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">+ GST & Shipping charges</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Bulk discounts</div>
                    <div className="text-lg font-semibold text-green-600">Available</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex space-x-4 mb-8">
                <Button size="lg" className="bg-gradient-to-r from-orange-600 to-orange-700 text-white border-0 hover:from-orange-700 hover:to-orange-800 flex-1 h-14 text-lg font-semibold shadow-lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Request Quote
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-green-600 text-green-700 hover:bg-green-50 h-14 px-8">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat Now
                </Button>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-muted-foreground">Quality Assured</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-muted-foreground">Pan India Delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-muted-foreground">Bulk Orders Welcome</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-muted-foreground">GST Invoice Provided</span>
                </div>
              </div>
            </div>

            {/* Vendor Info Card */}
            <Card className="shadow-lg border-orange-100">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={product.vendor.logo} 
                    alt={product.vendor.name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-orange-100"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-bold text-lg text-foreground">{product.vendor.name}</h3>
                      {product.vendor.verified && (
                        <div className="flex items-center space-x-1">
                          <Shield className="h-5 w-5 text-green-600" />
                          <span className="text-xs font-semibold text-green-700">Verified</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{product.vendor.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{product.vendor.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>500+ Happy Customers</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{product.vendor.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-4 w-4 text-orange-600" />
                    <span className="font-medium">Email:</span>
                    <span className="text-muted-foreground">{product.vendor.contact.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Phone:</span>
                    <span className="text-muted-foreground">{product.vendor.contact.phone}</span>
                  </div>
                </div>

                <div className="flex space-x-3 mt-4">
                  <Button variant="outline" size="sm" className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50">
                    View All Products
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-green-200 text-green-700 hover:bg-green-50">
                    Visit Store
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Description */}
          <Card className="shadow-lg border-orange-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-orange-800 flex items-center">
                <Award className="mr-3 h-6 w-6" />
                Product Description
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
              
              <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center space-x-2 text-green-700 font-semibold mb-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Make in India Certified</span>
                </div>
                <p className="text-sm text-green-600">This product supports local manufacturing and contributes to India's economic growth.</p>
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card className="shadow-lg border-orange-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-orange-800 flex items-center">
                <Clock className="mr-3 h-6 w-6" />
                Specifications
              </h2>
              <div className="space-y-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-orange-100 last:border-b-0">
                    <span className="font-semibold text-foreground text-sm">{key}</span>
                    <span className="text-muted-foreground text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                <div className="text-sm text-orange-700 font-semibold mb-1">Need Custom Specifications?</div>
                <p className="text-xs text-orange-600">Contact the supplier for customization options and bulk orders.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA Section */}
        <Card className="bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 text-white shadow-2xl border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Do Business?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Connect with verified Indian suppliers • Get competitive quotes • Enjoy secure transactions
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
              <Button size="lg" className="bg-white text-orange-700 hover:bg-white/90 font-bold text-lg h-14 px-8 shadow-lg">
                <IndianRupee className="mr-2 h-5 w-5" />
                Get Best Quote
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10 font-bold text-lg h-14 px-8">
                <Phone className="mr-2 h-5 w-5" />
                Call Supplier
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
