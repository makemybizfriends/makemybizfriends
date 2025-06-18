
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
  SlidersHorizontal,
  IndianRupee,
  Truck,
  Phone
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

const countries = ["India", "USA", "China", "Germany", "Japan", "South Korea"];
const ratings = [5, 4, 3, 2, 1];

export default function ProductListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
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

      // Countries
      if (selectedCountries.length > 0 && !selectedCountries.includes(product.vendor.location)) {
        return false;
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
  }, [searchTerm, selectedCategories, selectedPriceRanges, selectedCountries, selectedRatings, inStockOnly, verifiedOnly]);

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

  const handleCountryToggle = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country)
        : [...prev, country]
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
    setSelectedCountries([]);
    setSelectedRatings([]);
    setInStockOnly(false);
    setVerifiedOnly(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
            India's Premier B2B Marketplace
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find trusted suppliers, competitive prices, and quality products across India. 
            Supporting <span className="font-semibold text-orange-600">Make in India</span> and 
            <span className="font-semibold text-green-600"> Vocal for Local</span> initiatives.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products, categories, or suppliers... (e.g., 'machinery', 'textile', 'electronics')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 bg-background border-orange-200 focus:border-orange-400"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto border-orange-200 hover:bg-orange-50"
          >
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 space-y-6">
              <Card className="p-6 border-orange-100 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-orange-800">Advanced Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-orange-600 hover:bg-orange-50">
                    Clear All
                  </Button>
                </div>

                {/* Categories */}
                <Collapsible defaultOpen className="mb-6">
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                    <h4 className="font-medium text-orange-700">Product Categories</h4>
                    <ChevronDown className="h-4 w-4 text-orange-600" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 space-y-2">
                    {mockCategories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={() => handleCategoryToggle(category.name)}
                          className="border-orange-300 data-[state=checked]:bg-orange-600"
                        />
                        <label htmlFor={`category-${category.id}`} className="text-sm text-gray-700">
                          {category.name} ({category.productCount})
                        </label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Price Range */}
                <Collapsible defaultOpen className="mb-6">
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                    <h4 className="font-medium text-orange-700 flex items-center">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      Price Range (INR)
                    </h4>
                    <ChevronDown className="h-4 w-4 text-orange-600" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 space-y-2">
                    {priceRanges.map((range) => (
                      <div key={range.label} className="flex items-center space-x-2">
                        <Checkbox
                          id={`price-${range.label}`}
                          checked={selectedPriceRanges.includes(range.label)}
                          onCheckedChange={() => handlePriceRangeToggle(range.label)}
                          className="border-orange-300 data-[state=checked]:bg-orange-600"
                        />
                        <label htmlFor={`price-${range.label}`} className="text-sm text-gray-700">
                          {range.label}
                        </label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Country/Origin */}
                <Collapsible defaultOpen className="mb-6">
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                    <h4 className="font-medium text-orange-700">Origin Country</h4>
                    <ChevronDown className="h-4 w-4 text-orange-600" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 space-y-2">
                    {countries.map((country) => (
                      <div key={country} className="flex items-center space-x-2">
                        <Checkbox
                          id={`country-${country}`}
                          checked={selectedCountries.includes(country)}
                          onCheckedChange={() => handleCountryToggle(country)}
                          className="border-orange-300 data-[state=checked]:bg-orange-600"
                        />
                        <label htmlFor={`country-${country}`} className="text-sm text-gray-700 flex items-center">
                          {country}
                          {country === 'India' && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Make in India</span>}
                        </label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Supplier Rating */}
                <Collapsible defaultOpen className="mb-6">
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                    <h4 className="font-medium text-orange-700">Supplier Rating</h4>
                    <ChevronDown className="h-4 w-4 text-orange-600" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 space-y-2">
                    {ratings.map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={() => handleRatingToggle(rating)}
                          className="border-orange-300 data-[state=checked]:bg-orange-600"
                        />
                        <label htmlFor={`rating-${rating}`} className="text-sm flex items-center text-gray-700">
                          {rating}+ <Star className="h-3 w-3 ml-1 fill-yellow-400 text-yellow-400" />
                        </label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Additional Filters */}
                <div className="space-y-3 pt-4 border-t border-orange-100">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="in-stock"
                      checked={inStockOnly}
                      onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                      className="border-orange-300 data-[state=checked]:bg-orange-600"
                    />
                    <label htmlFor="in-stock" className="text-sm text-gray-700 flex items-center">
                      <Truck className="h-3 w-3 mr-1" />
                      Ready to Ship
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified"
                      checked={verifiedOnly}
                      onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
                      className="border-orange-300 data-[state=checked]:bg-orange-600"
                    />
                    <label htmlFor="verified" className="text-sm text-gray-700 flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified Suppliers Only
                    </label>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm border border-orange-100">
              <div className="flex items-center space-x-4">
                <p className="text-muted-foreground font-medium">
                  <span className="text-orange-600 font-bold">{sortedProducts.length}</span> products found
                </p>
                {(selectedCategories.length > 0 || selectedPriceRanges.length > 0 || selectedCountries.length > 0) && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(category => (
                      <Badge key={category} variant="secondary" className="cursor-pointer bg-orange-100 text-orange-700 hover:bg-orange-200" 
                             onClick={() => handleCategoryToggle(category)}>
                        {category} ×
                      </Badge>
                    ))}
                    {selectedPriceRanges.map(range => (
                      <Badge key={range} variant="secondary" className="cursor-pointer bg-green-100 text-green-700 hover:bg-green-200"
                             onClick={() => handlePriceRangeToggle(range)}>
                        {range} ×
                      </Badge>
                    ))}
                    {selectedCountries.map(country => (
                      <Badge key={country} variant="secondary" className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200"
                             onClick={() => handleCountryToggle(country)}>
                        {country} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 border-orange-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Best Match</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated Suppliers</SelectItem>
                    <SelectItem value="newest">Latest Products</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex border rounded-md border-orange-200">
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-orange-600 hover:bg-orange-700' : ''}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-orange-600 hover:bg-orange-700' : ''}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
            }>
              {sortedProducts.map((product) => (
                <Card key={product.id} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 group bg-white">
                  <CardContent className="p-0">
                    <div className={viewMode === 'grid' ? '' : 'flex'}>
                      <div className={viewMode === 'grid' 
                        ? "aspect-video rounded-t-lg overflow-hidden"
                        : "w-48 h-32 rounded-l-lg overflow-hidden flex-shrink-0"
                      }>
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant="secondary" className="mb-2 bg-orange-100 text-orange-700">{product.category}</Badge>
                          {product.inStock && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <Truck className="h-3 w-3 mr-1" />
                              Ready to Ship
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                          {product.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {product.shortDescription}
                        </p>

                        <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 rounded-lg">
                          <img 
                            src={product.vendor.logo} 
                            alt={product.vendor.name}
                            className="w-8 h-8 rounded object-cover"
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
                                <span>{typeof product.vendor.rating === 'number' ? product.vendor.rating : 0}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xl font-bold text-orange-600 flex items-center">
                            <IndianRupee className="h-5 w-5 mr-1" />
                            {convertToINR(product.price).toLocaleString('en-IN')}
                          </div>
                          <div className="text-xs text-gray-500">
                            + GST & Shipping
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button asChild className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white border-0 hover:from-orange-700 hover:to-orange-800" size="sm">
                            <Link to={`/product/${product.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="border-green-600 text-green-700 hover:bg-green-50">
                            <Phone className="h-3 w-3 mr-1" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-orange-100">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search for different products and suppliers
                </p>
                <Button onClick={clearAllFilters} className="bg-orange-600 hover:bg-orange-700">
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
