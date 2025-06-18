
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Shield, Users, Globe, Building2, Package, TrendingUp, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { mockCategories } from "@/data/mockData";

export default function Home() {
  const popularCategories = [
    "Electronics",
    "Textiles", 
    "Machinery",
    "Chemicals",
    "Automotive Parts",
    "Food Products"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Search */}
      <div className="gradient-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Connect, Trade, Grow
          </h1>
          <p className="text-xl lg:text-2xl mb-12 text-white/90 max-w-4xl mx-auto">
            India's Premier B2B Marketplace - Connecting Vendors & Buyers Worldwide
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 bg-white rounded-xl p-2 shadow-2xl">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="What are you looking for? (e.g., Electronics, Textiles, Machinery...)"
                  className="border-0 text-lg h-12 bg-transparent focus:ring-0 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="mb-12">
            <p className="text-lg mb-6 text-white/90">Popular:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularCategories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors backdrop-blur-sm"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-muted-foreground">Verified Vendors</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-purple-600 mb-2">50,000+</div>
              <div className="text-muted-foreground">Products Listed</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2">25,000+</div>
              <div className="text-muted-foreground">Active Buyers</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-orange-600 mb-2">100+</div>
              <div className="text-muted-foreground">Countries Served</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-12">
          {/* Key Categories Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Explore Categories</h2>
              <p className="text-xl text-muted-foreground">
                Discover products across various business categories
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockCategories.map((category) => (
                <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg cursor-pointer">
                  <CardContent className="p-0">
                    <div className="aspect-video rounded-t-lg overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{category.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-medium text-sm">
                          {category.productCount.toLocaleString()} products
                        </span>
                        <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link to="/products">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Verified Platform</h3>
                  <p className="text-muted-foreground">Secure and trusted marketplace with verified vendors only</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Growing Network</h3>
                  <p className="text-muted-foreground">Connect with thousands of potential buyers worldwide</p>
                </div>
              </div>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="gradient-secondary text-white p-12 rounded-2xl shadow-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of verified vendors and buyers in our trusted marketplace
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Link to="/register">Become a Vendor</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
