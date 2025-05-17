
import { useState } from 'react';
import { Document } from '@/lib/types';
import { FileText, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface MintModalProps {
  document: Document | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMintComplete: (document: Document) => void;
}

const MintModal = ({ document, open, onOpenChange, onMintComplete }: MintModalProps) => {
  const [isMinting, setIsMinting] = useState(false);
  const [name, setName] = useState(document?.name || '');
  const [description, setDescription] = useState(document?.description || '');

  const handleMint = async () => {
    if (!document) return;
    
    setIsMinting(true);
    
    // Simulate minting delay
    setTimeout(() => {
      setIsMinting(false);
      toast.success("Document minted successfully");
      
      const mintedDoc: Document = {
        ...document,
        name,
        description,
        status: 'minted',
        tokenId: `#${Math.floor(Math.random() * 10000)}`
      };
      
      onMintComplete(mintedDoc);
      onOpenChange(false);
    }, 2000);
  };

  if (!document) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mint Document as NFT</DialogTitle>
          <DialogDescription>
            Create an NFT from your document on the blockchain
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-center py-6 bg-accent/50 rounded-md my-4">
          {document.imageUrl ? (
            <img 
              src={document.imageUrl} 
              alt={document.name} 
              className="h-32 w-auto object-contain" 
            />
          ) : (
            <FileText size={48} className="text-muted-foreground" />
          )}
        </div>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">NFT Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">NFT Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Document Type</Label>
            <div className="text-sm text-muted-foreground">{document.fileType}</div>
          </div>
          
          <div className="grid gap-2">
            <Label>Document Size</Label>
            <div className="text-sm text-muted-foreground">{document.fileSize}</div>
          </div>
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleMint} 
            disabled={isMinting || !name || !description}
          >
            {isMinting ? "Minting..." : "Mint NFT"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MintModal;
