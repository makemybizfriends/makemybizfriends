import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MobileAuthModal } from '@/components/auth/MobileAuthModal';
import { ProfileDropdown } from '@/components/auth/ProfileDropdown';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, Home, Package, Mail, Building2, ShoppingBag, Store, HelpCircle, MessageSquare, User, Sparkles, List } from 'lucide-react';

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Contact', href: '/contact', icon: Mail },
  { name: 'FAQ', href: '/faq', icon: HelpCircle },
];

const rightNavItems = [
  { name: 'Shopping', href: '/directory', icon: ShoppingBag },
  { name: 'Help', href: '/faq', icon: HelpCircle },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleAuthClick = () => {
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                <Building2 className="h-6 w-6 text-white" />
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                  Make Biz Friends
                </h1>
                <p className="text-sm text-muted-foreground font-medium">Professional B2B Marketplace</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative flex items-center space-x-2 text-sm font-medium transition-all duration-300 px-4 py-3 rounded-xl group ${
                  isActive(item.href)
                    ? 'text-primary bg-primary/10 shadow-sm'
                    : 'text-foreground hover:text-primary hover:bg-accent/50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
                {isActive(item.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {rightNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center justify-center px-3 py-2 text-xs font-medium transition-all duration-300 hover:text-primary hover:bg-accent/50 rounded-lg group ${
                  isActive(item.href)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <item.icon className="h-5 w-5 mb-1 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs">{item.name}</span>
              </Link>
            ))}
            
            {/* Authentication Section */}
            {user ? (
              <ProfileDropdown />
            ) : (
              <Button 
                variant="ghost" 
                className="flex flex-col items-center justify-center px-4 py-2 text-xs font-medium h-auto rounded-lg hover:bg-accent/50 group"
                onClick={handleAuthClick}
              >
                <User className="h-5 w-5 mb-1 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs">Sign In</span>
              </Button>
            )}

            <div className="h-8 w-px bg-border mx-2" />
            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-3 md:hidden">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-lg dark:bg-background/95">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-3 px-2">
                    <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Make Biz Friends</h2>
                      <p className="text-xs text-muted-foreground">B2B Marketplace</p>
                    </div>
                  </div>

                  {/* Main Navigation */}
                  <div className="space-y-2">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 text-sm font-medium transition-all duration-300 p-3 rounded-xl ${
                          isActive(item.href)
                            ? 'text-primary bg-primary/10 shadow-sm'
                            : 'text-foreground hover:text-primary hover:bg-accent/50'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="border-t pt-6 space-y-2">
                    <div className="flex items-center space-x-2 text-sm font-semibold text-muted-foreground px-3 mb-3">
                      <Sparkles className="h-4 w-4" />
                      <span>Quick Actions</span>
                    </div>
                    {rightNavItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 text-sm font-medium transition-all duration-300 p-3 rounded-xl text-foreground hover:text-primary hover:bg-accent/50"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                  
                  {/* Auth Button */}
                  <div className="border-t pt-6">
                    {user ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-accent/30 rounded-xl">
                          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{user.name || 'User'}</div>
                            <div className="text-xs text-muted-foreground">{user.mobile}</div>
                          </div>
                        </div>
                        <ProfileDropdown />
                      </div>
                    ) : (
                      <Button
                        className="w-full justify-start gradient-primary text-white border-0 rounded-xl h-12 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => {
                          setIsOpen(false);
                          handleAuthClick();
                        }}
                      >
                        <User className="mr-3 h-5 w-5" />
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <MobileAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
      />
    </>
  );
}
