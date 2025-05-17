
import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import DocumentCard from '@/components/DocumentCard';
import MintModal from '@/components/MintModal';
import { Document } from '@/lib/types';

const Home = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Contract Agreement',
      description: 'Legal contract for business partnership',
      fileType: 'PDF',
      fileSize: '2.4 MB',
      uploadDate: '2023-05-15',
      status: 'draft'
    },
    {
      id: '2',
      name: 'Property Deed',
      description: 'Property ownership document with legal description',
      fileType: 'PDF',
      fileSize: '1.8 MB',
      uploadDate: '2023-05-10',
      status: 'draft'
    }
  ]);
  
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showMintModal, setShowMintModal] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = () => {
      const newDocument: Document = {
        id: Date.now().toString(),
        name: file.name.split('.')[0],
        description: `Uploaded document: ${file.name}`,
        fileType: file.type,
        fileSize: formatFileSize(file.size),
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'draft'
      };
      
      setDocuments(prev => [newDocument, ...prev]);
      toast.success("Document uploaded successfully");
    };
    
    reader.readAsDataURL(file);
    
    // Reset the input
    e.target.value = '';
  };
  
  const handleMintClick = (document: Document) => {
    setSelectedDocument(document);
    setShowMintModal(true);
  };
  
  const handleMintComplete = (mintedDoc: Document) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === mintedDoc.id ? mintedDoc : doc
      )
    );
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Document Hub</h1>
          <p className="text-muted-foreground">Upload and mint your documents as NFTs</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button className="relative overflow-hidden">
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
            <Upload size={18} className="mr-2" />
            Upload Document
          </Button>
        </div>
      </div>
      
      {documents.length === 0 ? (
        <Card className="card-glow">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Upload size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Documents Yet</h3>
            <p className="text-muted-foreground text-center mb-6">
              Upload your first document to get started with minting NFTs
            </p>
            <Button className="relative overflow-hidden">
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              <Upload size={18} className="mr-2" />
              Upload Document
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map(document => (
            <DocumentCard 
              key={document.id} 
              document={document} 
              onMint={handleMintClick}
            />
          ))}
        </div>
      )}
      
      <MintModal 
        document={selectedDocument} 
        open={showMintModal}
        onOpenChange={setShowMintModal}
        onMintComplete={handleMintComplete}
      />
    </div>
  );
};

export default Home;
