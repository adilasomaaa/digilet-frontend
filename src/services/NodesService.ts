import { http } from '@/lib/fetcher';
import type { Node, Breadcrumb, CreateFolderRequest, CreateLinkRequest, RenameNodeRequest } from '@/models';

export const nodesService = {
  async index(params?: { parentId?: number; includeDeleted?: boolean; page?: number; limit?: number }) {
    return await http<{ data: Node[]; meta: any }>('nodes', {
      method: 'GET',
      query: params,
      auth: true,
    });
  },

  async trash() {
    const response = await http<{ data: Node[] }>('nodes/trash', {
      method: 'GET',
      auth: true,
    });
    // Handle both wrapped and unwrapped responses
    return Array.isArray(response) ? response : response.data;
  },

  async show(id: number) {
    return await http<Node>(`nodes/${id}`, {
      method: 'GET',
      auth: true,
    });
  },

  async breadcrumbs(nodeId: number) {
    return await http<{ data: Breadcrumb[] } | Breadcrumb[]>(`nodes/${nodeId}/breadcrumbs`, {
      method: 'GET',
      auth: true,
    });
  },

  async createFolder(data: CreateFolderRequest) {
    return await http<Node>('nodes/folder', {
      method: 'POST',
      auth: true,
      body: data,
    });
  },

  async uploadImage(file: File, parentId?: number) {
    const formData = new FormData();
    formData.append('file', file);
    if (parentId) formData.append('parentId', parentId.toString());

    return await http<Node>('nodes/file/image', {
      method: 'POST',
      auth: true,
      body: formData,
    });
  },

  async uploadPdf(file: File, parentId?: number) {
    const formData = new FormData();
    formData.append('file', file);
    if (parentId) formData.append('parentId', parentId.toString());

    return await http<Node>('nodes/file/pdf', {
      method: 'POST',
      auth: true,
      body: formData,
    });
  },

  async createLink(data: CreateLinkRequest) {
    return await http<Node>('nodes/link', {
      method: 'POST',
      auth: true,
      body: data,
    });
  },

  async rename(id: number, data: RenameNodeRequest) {
    return await http<Node>(`nodes/${id}`, {
      method: 'PATCH',
      auth: true,
      body: data,
    });
  },

  async softDelete(id: number) {
    return await http<Node>(`nodes/${id}`, {
      method: 'DELETE',
      auth: true,
    });
  },

  async restore(id: number) {
    return await http<Node>(`nodes/${id}/restore`, {
      method: 'POST',
      auth: true,
    });
  },

  async permanentDelete(id: number) {
    return await http(`nodes/${id}/permanent`, {
      method: 'DELETE',
      auth: true,
    });
  },

  async clearTrash() {
    return await http('nodes/trash/clear', {
      method: 'DELETE',
      auth: true,
    });
  },

  async saveLetterPdf(pdfPath: string, fileName: string, parentId?: number) {
    return await http('nodes/save-letter-pdf', {
      method: 'POST',
      auth: true,
      body: { pdfPath, fileName, parentId },
    });
  },
};
