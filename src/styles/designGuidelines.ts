
// Global Design Guidelines for Make Biz Friends
// Use these guidelines for all new pages and components

export const DESIGN_GUIDELINES = {
  // Brand Identity
  brand: {
    name: 'Make Biz Friends',
    primaryColor: 'hsl(231, 98%, 65%)', // Blue primary
    secondaryColor: 'hsl(280, 100%, 70%)', // Purple secondary
    accentColor: 'hsl(330, 81%, 60%)', // Pink accent
  },

  // Layout Patterns
  layout: {
    // Main page wrapper
    pageWrapper: 'min-h-screen bg-gradient-to-br from-slate-50 to-blue-50',
    
    // Container with max width and responsive padding
    container: 'container mx-auto px-4 py-8 max-w-7xl',
    
    // Page headers
    pageHeader: {
      title: 'text-3xl font-bold text-foreground mb-2',
      subtitle: 'text-muted-foreground',
      wrapper: 'mb-8'
    },
    
    // Cards and panels
    card: {
      primary: 'shadow-lg border-0',
      secondary: 'shadow-md border',
      content: 'p-6',
      header: 'pb-4'
    },
    
    // Grid layouts
    grid: {
      responsive: 'grid lg:grid-cols-5 gap-6',
      cards: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    }
  },

  // Component Styles
  components: {
    // Buttons
    button: {
      primary: 'gradient-primary text-white hover:opacity-90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'variant="ghost"',
      outline: 'variant="outline"'
    },
    
    // Form elements
    form: {
      input: 'w-full px-4 py-3 border border-input rounded-xl bg-background focus:ring-2 focus:ring-primary focus:border-transparent',
      label: 'text-sm font-medium text-muted-foreground',
      wrapper: 'space-y-4'
    },
    
    // Typography
    typography: {
      heading1: 'text-3xl font-bold text-foreground',
      heading2: 'text-2xl font-semibold text-foreground',
      heading3: 'text-xl font-semibold text-foreground',
      body: 'text-foreground',
      caption: 'text-sm text-muted-foreground',
      muted: 'text-muted-foreground'
    },
    
    // Avatars and profiles
    avatar: {
      default: 'bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold',
      sizes: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12'
      }
    },
    
    // Status indicators
    status: {
      unread: 'w-2 h-2 bg-blue-600 rounded-full',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      error: 'bg-red-100 text-red-700',
      info: 'bg-blue-100 text-blue-700'
    },
    
    // Interactive elements
    interactive: {
      hover: 'transition-all hover:bg-accent/50',
      selected: 'bg-primary/5 border-l-primary',
      focus: 'focus:ring-2 focus:ring-primary focus:border-transparent'
    }
  },

  // Modal and Dialog Styles
  modal: {
    overlay: 'fixed inset-0 z-50 bg-black/80',
    content: 'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 rounded-lg',
    header: 'flex flex-col space-y-1.5 text-center sm:text-left',
    title: 'text-lg font-semibold leading-none tracking-tight',
    description: 'text-sm text-muted-foreground',
    footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'
  },

  // Animation and Transitions
  animation: {
    transition: 'transition-all duration-200',
    fadeIn: 'animate-in fade-in-0',
    slideUp: 'animate-in slide-in-from-bottom-2',
    hover: 'hover:scale-105 transition-transform'
  },

  // Spacing
  spacing: {
    section: 'space-y-6',
    card: 'space-y-4',
    form: 'space-y-4',
    list: 'space-y-2'
  }
} as const;

// Helper function to get brand-specific text
export const getBrandText = (key: string) => {
  const brandTexts: Record<string, string> = {
    'report-suspicious': `Report suspicious users to ${DESIGN_GUIDELINES.brand.name}`,
    'safety-title': 'Tips for a safe deal',
    'continue-chat': 'Continue to chat'
  };
  
  return brandTexts[key] || key;
};

// Color palette for consistent theming
export const COLORS = {
  primary: 'hsl(231, 98%, 65%)',
  secondary: 'hsl(280, 100%, 70%)',
  accent: 'hsl(330, 81%, 60%)',
  success: 'hsl(142, 76%, 36%)',
  warning: 'hsl(48, 96%, 53%)',
  error: 'hsl(0, 84%, 60%)',
  muted: 'hsl(215, 20%, 65%)'
} as const;
