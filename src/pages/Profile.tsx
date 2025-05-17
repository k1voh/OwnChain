
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { User } from '@/lib/types';

const Profile = () => {
  const [user, setUser] = useState<User>({
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    ens: 'user.eth',
    name: '',
    email: '',
    bio: ''
  });
  
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    bio: user.bio || ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    setUser(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      bio: formData.bio
    }));
    setEditing(false);
    toast.success("Profile updated successfully");
  };
  
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Reset form data whenever editing mode changes or user data updates
  useEffect(() => {
    if (editing) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
      });
    }
  }, [editing, user]);
  
  return (
    <div className="container mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <Card className="card-glow mb-8">
        <CardHeader>
          <CardTitle>Wallet Information</CardTitle>
          <CardDescription>
            Your blockchain wallet details
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300" />
            <AvatarFallback>{user.ens?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="grid gap-1">
              <Label>ENS Name</Label>
              <div className="text-lg font-medium">{user.ens || 'No ENS name set'}</div>
            </div>
            
            <div className="grid gap-1 mt-4">
              <Label>Wallet Address</Label>
              <div className="text-sm text-muted-foreground font-mono">
                {user.address}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-glow">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Your profile details
              </CardDescription>
            </div>
            {!editing && (
              <Button onClick={() => setEditing(true)} variant="outline">
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {editing ? (
            <>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  rows={4}
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-1">
                <Label>Name</Label>
                <div className="text-lg">{user.name || 'Not set'}</div>
              </div>
              
              <div className="grid gap-1">
                <Label>Email</Label>
                <div>{user.email || 'Not set'}</div>
              </div>
              
              <div className="grid gap-1">
                <Label>Bio</Label>
                <div className="text-sm text-muted-foreground">
                  {user.bio || 'No bio provided'}
                </div>
              </div>
            </>
          )}
        </CardContent>
        {editing && (
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Profile;
