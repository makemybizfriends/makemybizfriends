
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Shield, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { mockProducts, mockCategories } from "@/data/mockData";

export default function Products() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Product Marketplace</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover quality products from verified B2B suppliers worldwide
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products, categories, or vendors..."
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button variant="outline" size="lg" className="md:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md">
                <CardContent className="p-4 text-center">
                  <div className="aspect-square rounded-lg overflow-hidden mb-3">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {category.productCount.toLocaleString()} products
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="gradient-stats rounded-2xl p-8 mb-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">5,000+</div>
              <div className="text-white/80">Verified Vendors</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">50,000+</div>
              <div className="text-white/80">Products Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">100+</div>
              <div className="text-white/80">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">99.8%</div>
              <div className="text-white/80">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Featured Products</h2>
            <p className="text-muted-foreground">{mockProducts.length} products found</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProducts.map((product) => (
              <Card key={product.id} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
                <CardContent className="p-0">
                  <div className="aspect-video rounded-t-lg overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                      {product.inStock && (
                        <Badge className="bg-green-100 text-green-800 text-xs">In Stock</Badge>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {product.shortDescription}
                    </p>

                    <div className="flex items-center space-x-2 mb-4">
                      <img 
                        src={product.vendor.logo} 
                        alt={product.vendor.name}
                        className="w-6 h-6 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium text-foreground truncate">
                            {product.vendor.name}
                          </span>
                          {product.vendor.verified && (
                            <Shield className="h-3 w-3 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{product.vendor.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{product.vendor.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xl font-bold text-primary">
                        ${product.price.toLocaleString()} {product.currency}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button asChild className="flex-1 gradient-primary text-white border-0 hover:opacity-90" size="sm">
                        <Link to={`/product/${product.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="gradient-secondary text-white p-12 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Our Marketplace?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Connect with thousands of buyers and grow your business with our verified platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/register">Become a Vendor</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">Learn More</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
