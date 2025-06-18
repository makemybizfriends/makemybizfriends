import { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Star, 
  MapPin, 
  Shield, 
  Search, 
  Filter, 
  ChevronDown, 
  Grid3X3, 
  List,
  IndianRupee,
  Truck,
  Phone,
  Heart,
  Share2,
  TrendingUp,
  Award,
  Users,
  Package,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { mockProducts, mockCategories } from "@/data/mockData";

const priceRanges = [
  { label: "Under ₹8,000", min: 0, max: 8000 },
  { label: "₹8,000 - ₹40,000", min: 8000, max: 40000 },
  { label: "₹40,000 - ₹80,000", min: 40000, max: 80000 },
  { label: "₹80,000 - ₹4,00,000", min: 80000, max: 400000 },
  { label: "Above ₹4,00,000", min: 400000, max: Infinity },
];

const ratings = [5, 4, 3, 2, 1];

export default function ProductListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);

  // Convert USD to INR (approximate rate: 1 USD = 83 INR)
  const convertToINR = (usdPrice: number) => Math.round(usdPrice * 83);

  // Filter products based on selected criteria
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      // Search term
      if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.category.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Categories
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Price ranges - convert USD price to INR for comparison
      if (selectedPriceRanges.length > 0) {
        const priceInINR = convertToINR(product.price);
        const matchesPriceRange = selectedPriceRanges.some(rangeLabel => {
          const range = priceRanges.find(r => r.label === rangeLabel);
          return range && priceInINR >= range.min && priceInINR <= range.max;
        });
        if (!matchesPriceRange) return false;
      }

      // Ratings - Fixed TypeScript error by ensuring rating is a number
      if (selectedRatings.length > 0) {
        const vendorRating = typeof product.vendor.rating === 'number' ? product.vendor.rating : 0;
        if (!selectedRatings.includes(Math.floor(vendorRating))) {
          return false;
        }
      }

      // In stock only
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Verified vendors only
      if (verifiedOnly && !product.vendor.verified) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategories, selectedPriceRanges, selectedRatings, inStockOnly, verifiedOnly]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => {
          const aRating = typeof a.vendor.rating === 'number' ? a.vendor.rating : 0;
          const bRating = typeof b.vendor.rating === 'number' ? b.vendor.rating : 0;
          return bRating - aRating;
        });
      case 'newest':
        return sorted.sort((a, b) => {
          const aId = typeof a.id === 'number' ? a.id : parseInt(a.id);
          const bId = typeof b.id === 'number' ? b.id : parseInt(b.id);
          return bId - aId;
        });
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceRangeToggle = (range: string) => {
    setSelectedPriceRanges(prev => 
      prev.includes(range) 
        ? prev.filter(r => r !== range)
        : [...prev, range]
    );
  };

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedRatings([]);
    setInStockOnly(false);
    setVerifiedOnly(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Package className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 animate-bounce">
                  <Sparkles className="h-8 w-8 text-yellow-300" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              India's Premier B2B Marketplace
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover trusted suppliers, competitive prices, and quality products across India. 
              Supporting <span className="font-bold text-yellow-300">Make in India</span> and 
              <span className="font-bold text-green-300"> Vocal for Local</span> initiatives.
            </p>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { icon: Users, number: "10K+", label: "Verified Suppliers", color: "text-blue-300" },
                { icon: Package, number: "50K+", label: "Quality Products", color: "text-green-300" },
                { icon: Award, number: "99.8%", label: "Success Rate", color: "text-yellow-300" },
                { icon: TrendingUp, number: "24/7", label: "Support", color: "text-pink-300" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-3">
                    <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Search Bar */}
        <div className="relative -mt-8 mb-12">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-500" />
                  <Input
                    type="text"
                    placeholder="Search products, categories, or suppliers... (e.g., 'machinery', 'textile', 'electronics')"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg bg-white border-2 border-orange-200 focus:border-orange-400 rounded-2xl shadow-sm"
                  />
                  {searchTerm && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Badge className="bg-orange-100 text-orange-700 animate-pulse">
                        <Zap className="h-3 w-3 mr-1" />
                        Searching...
                      </Badge>
                    </div>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:w-auto border-2 border-orange-200 hover:bg-orange-50 rounded-2xl px-6 py-4 text-lg font-medium"
                >
                  <Filter className="mr-2 h-5 w-5" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-8">
          {/* Enhanced Filters Sidebar */}
          {showFilters && (
            <div className="w-80 space-y-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-orange-50/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-orange-800 flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Advanced Filters
                    </h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearAllFilters} 
                      className="text-orange-600 hover:bg-orange-100 rounded-xl"
                    >
                      Clear All
                    </Button>
                  </div>

                  {/* Categories */}
                  <Collapsible defaultOpen className="mb-6">
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left p-3 rounded-xl hover:bg-orange-100/50 transition-colors">
                      <h4 className="font-semibold text-orange-700 flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Product Categories
                      </h4>
                      <ChevronDown className="h-4 w-4 text-orange-600 transition-transform duration-200" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-3">
                      {mockCategories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.name)}
                            onCheckedChange={() => handleCategoryToggle(category.name)}
                            className="border-orange-300 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                          />
                          <label htmlFor={`category-${category.id}`} className="text-sm text-gray-700 cursor-pointer flex-1">
                            <div className="flex items-center justify-between">
                              <span>{category.name}</span>
                              <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                                {category.productCount}
                              </Badge>
                            </div>
                          </label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Price Range */}
                  <Collapsible defaultOpen className="mb-6">
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left p-3 rounded-xl hover:bg-orange-100/50 transition-colors">
                      <h4 className="font-semibold text-orange-700 flex items-center gap-2">
                        <IndianRupee className="h-4 w-4" />
                        Price Range (INR)
                      </h4>
                      <ChevronDown className="h-4 w-4 text-orange-600 transition-transform duration-200" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-3">
                      {priceRanges.map((range) => (
                        <div key={range.label} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                          <Checkbox
                            id={`price-${range.label}`}
                            checked={selectedPriceRanges.includes(range.label)}
                            onCheckedChange={() => handlePriceRangeToggle(range.label)}
                            className="border-orange-300 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                          />
                          <label htmlFor={`price-${range.label}`} className="text-sm text-gray-700 cursor-pointer">
                            {range.label}
                          </label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Supplier Rating */}
                  <Collapsible defaultOpen className="mb-6">
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left p-3 rounded-xl hover:bg-orange-100/50 transition-colors">
                      <h4 className="font-semibold text-orange-700 flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Supplier Rating
                      </h4>
                      <ChevronDown className="h-4 w-4 text-orange-600 transition-transform duration-200" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-3">
                      {ratings.map((rating) => (
                        <div key={rating} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                          <Checkbox
                            id={`rating-${rating}`}
                            checked={selectedRatings.includes(rating)}
                            onCheckedChange={() => handleRatingToggle(rating)}
                            className="border-orange-300 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                          />
                          <label htmlFor={`rating-${rating}`} className="text-sm flex items-center text-gray-700 cursor-pointer">
                            {rating}+ <Star className="h-3 w-3 ml-1 fill-yellow-400 text-yellow-400" />
                          </label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Additional Filters */}
                  <div className="space-y-4 pt-4 border-t border-orange-200">
                    <h4 className="font-semibold text-orange-700 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Quick Filters
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
                        <Checkbox
                          id="in-stock"
                          checked={inStockOnly}
                          onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                          className="border-green-400 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        />
                        <label htmlFor="in-stock" className="text-sm text-green-700 flex items-center cursor-pointer">
                          <Truck className="h-4 w-4 mr-2" />
                          Ready to Ship
                        </label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
                        <Checkbox
                          id="verified"
                          checked={verifiedOnly}
                          onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
                          className="border-blue-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <label htmlFor="verified" className="text-sm text-blue-700 flex items-center cursor-pointer">
                          <Shield className="h-4 w-4 mr-2" />
                          Verified Suppliers Only
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Enhanced Products Section */}
          <div className="flex-1">
            {/* Enhanced Toolbar */}
            <div className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-orange-100">
              <div className="flex items-center space-x-6">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-orange-600" />
                  <p className="text-gray-700 font-medium">
                    <span className="text-2xl font-bold text-orange-600">{sortedProducts.length}</span> 
                    <span className="text-gray-500 ml-1">products found</span>
                  </p>
                </div>
                {(selectedCategories.length > 0 || selectedPriceRanges.length > 0) && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(category => (
                      <Badge 
                        key={category} 
                        variant="secondary" 
                        className="cursor-pointer bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors rounded-full px-3 py-1" 
                        onClick={() => handleCategoryToggle(category)}
                      >
                        {category} ×
                      </Badge>
                    ))}
                    {selectedPriceRanges.map(range => (
                      <Badge 
                        key={range} 
                        variant="secondary" 
                        className="cursor-pointer bg-green-100 text-green-700 hover:bg-green-200 transition-colors rounded-full px-3 py-1"
                        onClick={() => handlePriceRangeToggle(range)}
                      >
                        {range} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-52 border-orange-200 rounded-xl bg-white shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">🎯 Best Match</SelectItem>
                    <SelectItem value="price-low">💰 Price: Low to High</SelectItem>
                    <SelectItem value="price-high">💎 Price: High to Low</SelectItem>
                    <SelectItem value="rating">⭐ Top Rated Suppliers</SelectItem>
                    <SelectItem value="newest">🆕 Latest Products</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex border-2 rounded-xl border-orange-200 bg-white shadow-sm">
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`rounded-l-xl ${viewMode === 'grid' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'hover:bg-orange-50'}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`rounded-r-xl ${viewMode === 'list' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'hover:bg-orange-50'}`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Products Grid */}
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
            }>
              {sortedProducts.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="group shadow-lg hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-2xl overflow-hidden transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className={viewMode === 'grid' ? '' : 'flex'}>
                      <div className={viewMode === 'grid' 
                        ? "aspect-video rounded-t-2xl overflow-hidden relative"
                        : "w-48 h-32 rounded-l-2xl overflow-hidden flex-shrink-0 relative"
                      }>
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Floating Action Buttons */}
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg">
                            <Heart className="h-4 w-4 text-red-500" />
                          </Button>
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg">
                            <Share2 className="h-4 w-4 text-blue-500" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <Badge variant="secondary" className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-0 rounded-full px-3 py-1">
                            {product.category}
                          </Badge>
                          {product.inStock && (
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 rounded-full px-3 py-1 animate-pulse">
                              <Truck className="h-3 w-3 mr-1" />
                              Ready to Ship
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                          {product.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {product.shortDescription}
                        </p>

                        {/* Enhanced Vendor Info */}
                        <div className="flex items-center space-x-3 mb-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                          <div className="relative">
                            <img 
                              src={product.vendor.logo} 
                              alt={product.vendor.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                            {product.vendor.verified && (
                              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                                <Shield className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-gray-900 truncate">
                                {product.vendor.name}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span className="truncate">{product.vendor.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{typeof product.vendor.rating === 'number' ? product.vendor.rating : 0}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Price Display */}
                        <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                          <div>
                            <div className="text-2xl font-bold text-orange-600 flex items-center">
                              <IndianRupee className="h-6 w-6 mr-1" />
                              {convertToINR(product.price).toLocaleString('en-IN')}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              + GST & Shipping
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-green-100 text-green-700 border-0">
                              Best Price
                            </Badge>
                          </div>
                        </div>

                        {/* Enhanced Action Buttons */}
                        <div className="flex space-x-3">
                          <Button 
                            asChild 
                            className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn" 
                            size="sm"
                          >
                            <Link to={`/product/${product.id}`} className="flex items-center justify-center">
                              View Details
                              <ArrowUpRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-2 border-green-500 text-green-700 hover:bg-green-50 rounded-xl px-4 transition-all duration-300 hover:scale-105"
                          >
                            <Phone className="h-4 w-4 mr-1" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced No Results */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-orange-100">
                <div className="text-8xl mb-6 animate-bounce">🔍</div>
                <h3 className="text-3xl font-bold mb-4 text-gray-800">No products found</h3>
                <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                  Try adjusting your filters or search for different products and suppliers
                </p>
                <Button 
                  onClick={clearAllFilters} 
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}