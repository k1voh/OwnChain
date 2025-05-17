
export interface Document {
  id: string;
  name: string;
  description: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  tokenId?: string;
  status: 'draft' | 'minted';
  imageUrl?: string;
}

export interface User {
  address: string;
  ens?: string;
  profileImage?: string;
  name?: string;
  email?: string;
  bio?: string;
}
