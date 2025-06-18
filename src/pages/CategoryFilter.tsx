import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  ArrowLeft,
  Package,
  TrendingUp,
  Users,
  Award
} from "lucide-react";
import { mockProducts, mockCategories } from "@/data/mockData";
import { DESIGN_GUIDELINES } from '@/styles/designGuidelines';

const priceRanges = [
  { label: "Under ₹8,000", min: 0, max: 8000 },
  { label: "₹8,000 - ₹40,000", min: 8000, max: 40000 },
  { label: "₹40,000 - ₹80,000", min: 40000, max: 80000 },
  { label: "₹80,000 - ₹4,00,000", min: 80000, max: 400000 },
  { label: "Above ₹4,00,000", min: 400000, max: Infinity },
];

const countries = ["India", "USA", "China", "Germany", "Japan", "South Korea"];
const ratings = [5, 4, 3, 2, 1];

export default function CategoryFilter() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);

  // Find the current category
  const currentCategory = mockCategories.find(cat => 
    cat.name.toLowerCase().replace(/\s+/g, '-') === categoryName?.toLowerCase()
  );

  // Convert USD to INR (approximate rate: 1 USD = 83 INR)
  const convertToINR = (usdPrice: number) => Math.round(usdPrice * 83);

  // Filter products based on category and other criteria
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      // Category filter - if we have a category, filter by it
      if (currentCategory && product.category !== currentCategory.name) {
        return false;
      }

      // Search term
      if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())) {
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

      // Ratings
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
  }, [currentCategory, searchTerm, selectedPriceRanges, selectedCountries, selectedRatings, inStockOnly, verifiedOnly]);

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
    setSelectedPriceRanges([]);
    setSelectedCountries([]);
    setSelectedRatings([]);
    setInStockOnly(false);
    setVerifiedOnly(false);
  };

  // If category not found, show error
  if (!currentCategory) {
    return (
      <div className={DESIGN_GUIDELINES.layout.pageWrapper}>
        <div className={DESIGN_GUIDELINES.layout.container}>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The category you're looking for doesn't exist or has been moved.
            </p>
            <Button onClick={() => navigate('/directory')} className="gradient-primary text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Directory
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={DESIGN_GUIDELINES.layout.pageWrapper}>
      <div className={DESIGN_GUIDELINES.layout.container}>
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/directory" className="text-muted-foreground hover:text-primary transition-colors">
              Directory
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{currentCategory.name}</span>
          </nav>
        </div>

        {/* Enhanced Category Header */}
        <div className="mb-8">
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="relative">
              <div className="aspect-[3/1] rounded-t-lg overflow-hidden">
                <img 
                  src={currentCategory.image} 
                  alt={currentCategory.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                      {currentCategory.name}
                    </h1>
                    <p className="text-xl text-white/90 mb-6">
                      {currentCategory.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        <span>{currentCategory.productCount.toLocaleString()} Products</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <span>500+ Suppliers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        <span>Verified Quality</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={`Search in ${currentCategory.name}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 bg-background border-orange-200 focus:border-orange-400 rounded-xl"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto border-orange-200 hover:bg-orange-50 rounded-xl"
          >
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 space-y-6">
              <Card className="p-6 border-orange-100 shadow-lg rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-orange-800">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-orange-600 hover:bg-orange-50">
                    Clear All
                  </Button>
                </div>

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

              {/* Category Stats */}
              <Card className="p-6 border-orange-100 shadow-lg rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50">
                <h3 className="font-semibold text-orange-800 mb-4">Category Insights</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Products</span>
                    <Badge className="bg-orange-100 text-orange-700">
                      {currentCategory.productCount.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Suppliers</span>
                    <Badge className="bg-green-100 text-green-700">500+</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg. Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">4.5</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm border border-orange-100">
              <div className="flex items-center space-x-4">
                <p className="text-muted-foreground font-medium">
                  <span className="text-orange-600 font-bold">{sortedProducts.length}</span> products found
                </p>
                {(selectedPriceRanges.length > 0 || selectedCountries.length > 0) && (
                  <div className="flex flex-wrap gap-2">
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
                  <SelectTrigger className="w-48 border-orange-200 rounded-xl">
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
                
                <div className="flex border rounded-xl border-orange-200">
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
                <Card key={product.id} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 group bg-white rounded-xl">
                  <CardContent className="p-0">
                    <div className={viewMode === 'grid' ? '' : 'flex'}>
                      <div className={viewMode === 'grid' 
                        ? "aspect-video rounded-t-xl overflow-hidden"
                        : "w-48 h-32 rounded-l-xl overflow-hidden flex-shrink-0"
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
                          <Button asChild className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white border-0 hover:from-orange-700 hover:to-orange-800 rounded-xl" size="sm">
                            <Link to={`/product/${product.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="border-green-600 text-green-700 hover:bg-green-50 rounded-xl">
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
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-orange-100">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search for different products in {currentCategory.name}
                </p>
                <Button onClick={clearAllFilters} className="bg-orange-600 hover:bg-orange-700 rounded-xl">
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