
import { useNavigate, useLocation } from 'react-router-dom';
import { Book, User, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    toast.success("Logged out successfully");
    navigate('/');
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:relative md:border-t-0 md:border-r md:h-screen md:w-64">
      <div className="py-4 px-2 md:px-4 md:py-8">
        <div className="flex flex-row md:flex-col items-center justify-around md:justify-start md:space-y-6">
          <div className="hidden md:block mb-8">
            <div className="text-2xl font-bold gradient-text">OwnChain</div>
          </div>
          
          <NavItem 
            icon={<Home size={20} />} 
            label="Home" 
            active={isActive('/home')} 
            onClick={() => navigate('/home')} 
          />
          
          <NavItem 
            icon={<Book size={20} />} 
            label="Owned Documents" 
            active={isActive('/documents')} 
            onClick={() => navigate('/documents')} 
          />
          
          <NavItem 
            icon={<User size={20} />} 
            label="Profile" 
            active={isActive('/profile')} 
            onClick={() => navigate('/profile')} 
          />
          
          <div className="hidden md:block mt-auto">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:w-full",
        active && "bg-accent text-accent-foreground"
      )}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs md:text-sm">{label}</span>
    </Button>
  );
};

export default Navbar;
