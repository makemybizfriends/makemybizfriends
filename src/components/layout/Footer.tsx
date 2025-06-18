
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl">Make Biz Friends</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Building amazing products for the modern web.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/products" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Products
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <div className="space-y-2">
              <Link to="/login" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Login
              </Link>
              <Link to="/register" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Register
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <Link to="/privacy-policy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Make Biz Friends. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
