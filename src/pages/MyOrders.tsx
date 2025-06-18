
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DESIGN_GUIDELINES } from '@/styles/designGuidelines';
import { MapPin, Phone, User, Star, MessageSquare, ExternalLink, Plus, ChevronDown } from 'lucide-react';
import { FeedbackModal } from '@/components/modals/FeedbackModal';

interface Supplier {
  id: string;
  name: string;
  rating: number;
  location: string;
  phone: string;
  owner: string;
}

interface Order {
  id: string;
  title: string;
  postedDate: string;
  suppliersConnected: number;
  description: string;
  supplier: Supplier;
}

const mockOrders: Order[] = [
  {
    id: '1',
    title: 'Rubber Slipper Sole Sheet',
    postedDate: '9-Jun-2025',
    suppliersConnected: 1,
    description: 'I am interested in Rubber Slipper Sole Sheet',
    supplier: {
      id: '1',
      name: 'Sikhar Manufactures',
      rating: 5,
      location: 'Indore, Madhya Pradesh',
      phone: '+(91)-8044566736,8870',
      owner: 'Prakash Kushwah, Owner'
    }
  },
  {
    id: '2',
    title: 'Semi Automatic Slipper Making Machine',
    postedDate: '9-Jun-2025',
    suppliersConnected: 1,
    description: 'I am interested in Semi Automatic Slipper Making Machine',
    supplier: {
      id: '2',
      name: 'Prince Machinery',
      rating: 4.4,
      location: 'New Delhi, Delhi',
      phone: '+(91)-8046030660',
      owner: 'Prince Machinery, CEO'
    }
  }
];

export default function MyOrders() {
  const navigate = useNavigate();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [feedbackModal, setFeedbackModal] = useState<{
    isOpen: boolean;
    order: Order | null;
  }>({ isOpen: false, order: null });

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handlePostNewRequirement = () => {
    navigate('/post-requirement');
  };

  const handleShareFeedback = (order: Order) => {
    setFeedbackModal({ isOpen: true, order });
  };

  const closeFeedbackModal = () => {
    setFeedbackModal({ isOpen: false, order: null });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        <span className="text-sm font-medium">{rating}/5</span>
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      </div>
    );
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className={`${DESIGN_GUIDELINES.layout.card.primary} mb-6`}>
      <CardHeader className="bg-gray-50 rounded-t-lg">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{order.title}</h3>
            <p className="text-sm text-muted-foreground mb-1">Posted on: {order.postedDate}</p>
            <p className="text-sm text-muted-foreground mb-2">{order.suppliersConnected} Supplier Connected</p>
            <p className="text-sm text-muted-foreground">{order.description}</p>
          </div>
          <Button 
            className="gradient-primary text-white"
            onClick={() => handleShareFeedback(order)}
          >
            Share Feedback
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-lg font-medium">1.</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-foreground">{order.supplier.name}</h4>
                    {renderStars(order.supplier.rating)}
                  </div>
                </div>
              </div>
              
              <div className="ml-6 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{order.supplier.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{order.supplier.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{order.supplier.owner}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Satisfied with the match?</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                    No
                  </Button>
                  <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                    Yes
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button variant="link" size="sm" className="text-primary p-0 h-auto">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Catalog
                </Button>
                <Button variant="link" size="sm" className="text-primary p-0 h-auto">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleOrderExpansion(order.id)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${
              expandedOrder === order.id ? 'rotate-180' : ''
            }`} />
            Hide Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={DESIGN_GUIDELINES.layout.pageWrapper}>
      <div className={DESIGN_GUIDELINES.layout.container}>
        <div className={DESIGN_GUIDELINES.layout.pageHeader.wrapper}>
          <div className="flex justify-between items-center">
            <h1 className={DESIGN_GUIDELINES.layout.pageHeader.title}>My Orders</h1>
            <Button 
              className="gradient-primary text-white"
              onClick={handlePostNewRequirement}
            >
              <Plus className="h-4 w-4 mr-2" />
              Post a New Requirement
            </Button>
          </div>
        </div>

        <Tabs defaultValue="my-orders" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="my-orders" className="text-sm">My Orders</TabsTrigger>
            <TabsTrigger value="product-interest" className="text-sm">Product of Interest</TabsTrigger>
            <TabsTrigger value="recommended" className="text-sm">Recommended Categories</TabsTrigger>
            <TabsTrigger value="recent-activity" className="text-sm">Recent Activity</TabsTrigger>
            <TabsTrigger value="past-searches" className="text-sm">Past Searches</TabsTrigger>
          </TabsList>

          <TabsContent value="my-orders" className="space-y-6">
            {mockOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          <TabsContent value="product-interest" className="space-y-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products of interest yet.</p>
            </div>
          </TabsContent>

          <TabsContent value="recommended" className="space-y-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No recommended categories available.</p>
            </div>
          </TabsContent>

          <TabsContent value="recent-activity" className="space-y-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No recent activity to show.</p>
            </div>
          </TabsContent>

          <TabsContent value="past-searches" className="space-y-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No past searches found.</p>
            </div>
          </TabsContent>
        </Tabs>

        {feedbackModal.order && (
          <FeedbackModal
            isOpen={feedbackModal.isOpen}
            onClose={closeFeedbackModal}
            userName="Shoaib"
            requirementTitle={feedbackModal.order.title}
            supplierName={feedbackModal.order.supplier.name}
            postedDate={feedbackModal.order.postedDate}
          />
        )}
      </div>
    </div>
  );
}
