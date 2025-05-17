import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Index = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const navigate = useNavigate();

  const handleConnectWallet = async () => {
    setIsLoggingIn(true);

    // Simulate connection delay
    setTimeout(() => {
      setIsLoggingIn(false);
      toast.success("Wallet connected successfully");
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/home');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-hero-pattern flex flex-col">
      <header className="container mx-auto py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">OwnChain</div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="gradient-text">OwnChain</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Secure your documents on the blockchain with NFT technology
          </p>
        </div>

        <Card className="w-full max-w-md card-glow">
          <Tabs
            value={activeTab}
            onValueChange={(value: "login" | "register") => setActiveTab(value)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent
              value="login"
              className={`p-6 ${activeTab !== 'login' ? 'hidden' : ''}`}
            >
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold">Welcome Back</h2>
                  <p className="text-muted-foreground">Connect your wallet to continue</p>
                </div>
                <Button
                  onClick={handleConnectWallet}
                  className="w-full"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Connecting..." : "Connect with MetaMask"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent
              value="register"
              className={`p-6 ${activeTab !== 'register' ? 'hidden' : ''}`}
            >
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold">Create an Account</h2>
                  <p className="text-muted-foreground">Connect your wallet to register</p>
                </div>
                <Button
                  onClick={handleConnectWallet}
                  className="w-full"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Connecting..." : "Connect with MetaMask"}
                </Button>
              </div>
            </TabsContent>

          </Tabs>
        </Card>
      </main>

      <footer className="container mx-auto py-8">
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} OwnChain. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;