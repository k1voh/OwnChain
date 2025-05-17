
import { Document } from '@/lib/types';
import { FileText, Check, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DocumentCardProps {
  document: Document;
  onMint?: (document: Document) => void;
  onView?: (document: Document) => void;
}

const DocumentCard = ({ document, onMint, onView }: DocumentCardProps) => {
  const isMinted = document.status === 'minted';

  return (
    <Card className="card-glow h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-1">
          <CardTitle className="text-lg">{document.name}</CardTitle>
          <Badge variant={isMinted ? "default" : "outline"}>
            {isMinted ? (
              <span className="flex items-center">
                Minted <Check size={14} className="ml-1" />
              </span>
            ) : (
              "Draft"
            )}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground">
          Uploaded: {document.uploadDate}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center justify-center py-6 bg-accent/50 rounded-md mb-3">
          {document.imageUrl ? (
            <img src={document.imageUrl} alt={document.name} className="h-32 w-auto object-contain" />
          ) : (
            <FileText size={48} className="text-muted-foreground" />
          )}
        </div>
        <p className="text-sm line-clamp-2">{document.description}</p>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{document.fileType}</span>
          <span>{document.fileSize}</span>
        </div>
      </CardContent>
      <CardFooter>
        {isMinted ? (
          <Button onClick={() => onView?.(document)} variant="outline" className="w-full">
            View NFT <ArrowRight size={14} className="ml-1" />
          </Button>
        ) : (
          <Button onClick={() => onMint?.(document)} className="w-full">
            Mint as NFT
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
