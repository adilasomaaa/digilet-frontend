export interface Node {
  id: number;
  name: string;
  type: 'folder' | 'link' | 'image' | 'pdf';
  parentId: number | null;
  path: string | null;
  mimeType: string | null;
  size: string | null;
  ownerId: number;
  owner?: {
    id: number;
    name: string;
    email: string;
  };
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Breadcrumb {
  id: number;
  name: string;
}

export interface CreateFolderRequest {
  name: string;
  parentId?: number;
}

export interface CreateLinkRequest {
  name: string;
  content: string;
  parentId?: number;
}

export interface RenameNodeRequest {
  name: string;
}

export interface UploadFileRequest {
  file: File;
  parentId?: number;
}
