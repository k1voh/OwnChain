
import { useState, useEffect } from 'react';
import { Book } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import DocumentCard from '@/components/DocumentCard';
import { Document } from '@/lib/types';

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading documents from API/blockchain
    const loadDocuments = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockDocuments: Document[] = [
        {
          id: '3',
          name: 'Property Certificate',
          description: 'Digital certificate of property ownership',
          fileType: 'PDF',
          fileSize: '1.2 MB',
          uploadDate: '2023-05-01',
          status: 'minted',
          tokenId: '#1234',
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300'
        },
        {
          id: '4',
          name: 'Intellectual Property',
          description: 'Patent documentation for new invention',
          fileType: 'PDF',
          fileSize: '3.8 MB',
          uploadDate: '2023-04-25',
          status: 'minted',
          tokenId: '#2345'
        }
      ];
      
      setDocuments(mockDocuments);
      setIsLoading(false);
    };
    
    loadDocuments();
  }, []);
  
  const handleViewDocument = (document: Document) => {
    // In a real app, this would open the document viewer or link to the blockchain explorer
    console.log('View document', document);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My NFT Documents</h1>
        <p className="text-muted-foreground">View and manage your minted document NFTs</p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse-glow">
            <Book size={48} className="text-primary/70" />
          </div>
        </div>
      ) : documents.length === 0 ? (
        <Card className="card-glow">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Book size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No NFTs Yet</h3>
            <p className="text-muted-foreground text-center">
              You haven't minted any documents as NFTs yet
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map(document => (
            <DocumentCard 
              key={document.id} 
              document={document} 
              onView={handleViewDocument}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Documents;
