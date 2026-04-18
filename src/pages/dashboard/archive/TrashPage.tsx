import { useState, useEffect } from 'react';
import { Button, Spinner, Card, CardBody } from '@heroui/react';
import { Undo2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { nodesService } from '@/services/NodesService';
import type { Node } from '@/models';

const TrashPage = () => {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTrash = async () => {
    try {
      setLoading(true);
      const data = await nodesService.trash();
      setNodes(data);
    } catch (error) {
      console.error('Error loading trash:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrash();
  }, []);

  const handleRestore = async (id: number) => {
    try {
      await nodesService.restore(id);
      await loadTrash();
    } catch (error) {
      console.error('Error restoring node:', error);
    }
  };

  const handlePermanentDelete = async (id: number, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus permanen "${name}"? Aksi ini tidak dapat dibatalkan.`)) {
      try {
        await nodesService.permanentDelete(id);
        await loadTrash();
      } catch (error) {
        console.error('Error permanent delete:', error);
      }
    }
  };

  const handleClearAll = async () => {
    if (confirm('Apakah Anda yakin ingin mengosongkan semua sampah? Aksi ini tidak dapat dibatalkan.')) {
      try {
        await nodesService.clearTrash();
        await loadTrash();
      } catch (error) {
        console.error('Error clearing trash:', error);
      }
    }
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Tempat Sampah</h1>
        <div className='flex gap-2'>
          <Button
            color='danger'
            variant='flat'
            onPress={handleClearAll}
            isDisabled={nodes.length === 0}
          >
            Kosongkan Sampah
          </Button>
          <Button
            color='default'
            onPress={() => navigate('/dashboard/archive')}
          >
            Kembali ke Arsip
          </Button>
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <Spinner size='lg' />
        </div>
      ) : nodes.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-64 text-gray-500'>
          <p>Tempat sampah kosong</p>
        </div>
      ) : (
        <div className='space-y-2'>
          {nodes.map((node) => (
            <Card key={node.id}>
              <CardBody className='flex flex-row justify-between items-center'>
                <div>
                  <p className='font-medium'>{node.name}</p>
                  <p className='text-sm text-gray-500'>
                    Dihapus: {new Date(node.deletedAt!).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    color='primary'
                    variant='flat'
                    startContent={<Undo2 size={16} />}
                    onPress={() => handleRestore(node.id)}
                  >
                    Pulihkan
                  </Button>
                  <Button
                    size='sm'
                    color='danger'
                    variant='flat'
                    startContent={<Trash2 size={16} />}
                    onPress={() => handlePermanentDelete(node.id, node.name)}
                  >
                    Hapus Permanen
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrashPage;
