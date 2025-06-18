import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search,
  MessageSquare,
  MoreVertical,
  Clock,
  Phone,
  Video,
  Send,
  Filter,
  Star,
  Archive,
  Trash2,
  Shield,
  UserX
} from 'lucide-react';
import { SafetyTipsModal } from '@/components/modals/SafetyTipsModal';
import { DESIGN_GUIDELINES } from '@/styles/designGuidelines';

interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  important: boolean;
  avatar: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  time: string;
  isOwn: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Mustafa Saify',
    subject: 'Acer ek220q full HD monitor',
    preview: 'Yes, it\'s still available. Are you ...',
    time: 'YESTERDAY',
    unread: true,
    important: false,
    avatar: 'MS'
  },
  {
    id: '2',
    sender: 'kinu chopra',
    subject: 'LG Monitor for Sale',
    preview: 'Number Requested',
    time: 'YESTERDAY',
    unread: false,
    important: false,
    avatar: 'KC'
  },
  {
    id: '3',
    sender: 'Tech Solutions Ltd',
    subject: 'Bulk Order Inquiry',
    preview: 'We are interested in placing a bulk order...',
    time: '2 DAYS AGO',
    unread: true,
    important: true,
    avatar: 'TS'
  }
];

const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'You',
    content: 'Hello',
    time: '10:34',
    isOwn: true
  },
  {
    id: '2',
    sender: 'You',
    content: 'Is it available?',
    time: '10:34',
    isOwn: true
  },
  {
    id: '3',
    sender: 'Mustafa Saify',
    content: 'Yes, it\'s still available. Are you interested?',
    time: '14:20',
    isOwn: false
  }
];

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState<Message>(mockMessages[0]);
  const [newMessage, setNewMessage] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showSafetyTips, setShowSafetyTips] = useState(false);

  const filters = ['All', 'Meeting', 'Unread', 'Important'];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleBlockUser = () => {
    console.log('Blocking user:', selectedMessage?.sender);
    // Add block user logic here
  };

  const handleDeleteChat = () => {
    console.log('Deleting chat with:', selectedMessage?.sender);
    // Add delete chat logic here
  };

  const handleSafetyTips = () => {
    setShowSafetyTips(true);
  };

  return (
    <div className={DESIGN_GUIDELINES.layout.pageWrapper}>
      <div className={DESIGN_GUIDELINES.layout.container}>
        {/* Header */}
        <div className={DESIGN_GUIDELINES.layout.pageHeader.wrapper}>
          <h1 className={DESIGN_GUIDELINES.layout.pageHeader.title}>Messages</h1>
          <p className={DESIGN_GUIDELINES.layout.pageHeader.subtitle}>Manage your business communications</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 h-[calc(100vh-200px)]">
          {/* Inbox Sidebar */}
          <div className="lg:col-span-2">
            <Card className="h-full shadow-lg border-0">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">INBOX</h2>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      3
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Quick Filters */}
                <div className="mt-4">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Quick Filters</p>
                  <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                      <Button
                        key={filter}
                        variant={activeFilter === filter ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveFilter(filter)}
                        className={activeFilter === filter ? "bg-primary text-white" : ""}
                      >
                        {filter}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              
              <Separator />
              
              <CardContent className="p-0 flex-1 overflow-y-auto">
                <div className="space-y-1">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-4 cursor-pointer transition-all hover:bg-accent/50 border-l-4 ${
                        selectedMessage?.id === message.id
                          ? 'bg-primary/5 border-l-primary'
                          : 'border-l-transparent'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-semibold">
                            {message.avatar}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`text-sm font-medium truncate ${
                              message.unread ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {message.sender}
                            </h3>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-muted-foreground">{message.time}</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className={`text-sm truncate mb-1 ${
                            message.unread ? 'font-medium text-foreground' : 'text-muted-foreground'
                          }`}>
                            {message.subject}
                          </p>
                          
                          <p className="text-xs text-muted-foreground truncate">
                            {message.preview}
                          </p>
                          
                          {message.unread && (
                            <div className="flex items-center gap-1 mt-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <span className="text-xs text-blue-600 font-medium">Unread</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full shadow-lg border-0 flex flex-col">
              {/* Chat Header */}
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
                        {selectedMessage?.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{selectedMessage?.sender}</h3>
                      <p className="text-sm text-muted-foreground">{selectedMessage?.subject}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span>₹ 4,999</span>
                        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                        <span>YESTERDAY</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-background border shadow-lg">
                        <DropdownMenuItem onClick={handleBlockUser} className="text-red-600 focus:text-red-600">
                          <UserX className="h-4 w-4 mr-2" />
                          Block User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSafetyTips}>
                          <Shield className="h-4 w-4 mr-2" />
                          Safety Tips
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleDeleteChat} className="text-red-600 focus:text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Chat
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              
              <Separator />
              
              {/* Messages */}
              <CardContent className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {mockChatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          msg.isOwn
                            ? 'bg-primary text-white'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <div className={`flex items-center justify-end gap-1 mt-1 ${
                          msg.isOwn ? 'text-white/70' : 'text-muted-foreground'
                        }`}>
                          <span className="text-xs">{msg.time}</span>
                          {msg.isOwn && (
                            <div className="flex">
                              <div className="w-1 h-1 bg-current rounded-full"></div>
                              <div className="w-1 h-1 bg-current rounded-full ml-0.5"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <Separator />
              
              {/* Message Input */}
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full px-4 py-3 border border-input rounded-xl bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    className="gradient-primary text-white px-6"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Safety Tips Modal */}
        <SafetyTipsModal 
          isOpen={showSafetyTips} 
          onClose={() => setShowSafetyTips(false)} 
        />
      </div>
    </div>
  );
}
