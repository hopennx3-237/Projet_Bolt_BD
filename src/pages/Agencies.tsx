import { useState, useEffect } from 'react';
import { Building2, Plus } from 'lucide-react';
import { agencyService, type Agency } from '../lib/mockData';
import { Modal } from '../components/ui/Modal';
import { DataTable } from '../components/ui/DataTable';

export const Agencies = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgency, setEditingAgency] = useState<Agency | null>(null);
  const [formData, setFormData] = useState({ libelle: '', description: '' });

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    try {
      setLoading(true);
      const data = await agencyService.getAgencies();
      setAgencies(data);
    } catch (error) {
      console.error('Error fetching agencies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (agency?: Agency) => {
    if (agency) {
      setEditingAgency(agency);
      setFormData({ libelle: agency.libelle, description: agency.description || '' });
    } else {
      setEditingAgency(null);
      setFormData({ libelle: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAgency(null);
    setFormData({ libelle: '', description: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.libelle.trim()) {
      alert('Le libellé est requis');
      return;
    }

    try {
      if (editingAgency) {
        await agencyService.updateAgency(editingAgency.id, formData.libelle, formData.description || null);
      } else {
        await agencyService.addAgency(formData.libelle, formData.description || null);
      }

      await fetchAgencies();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving agency:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (agency: Agency) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${agency.libelle}" ?`)) {
      return;
    }

    try {
      await agencyService.deleteAgency(agency.id);
      await fetchAgencies();
    } catch (error) {
      console.error('Error deleting agency:', error);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Agences</h1>
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full border border-yellow-300">
              Mode démo
            </span>
          </div>
          <p className="text-gray-600">Gestion des agences du réseau (données mockées)</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nouvelle agence
        </button>
      </div>

      <DataTable
        columns={[
          { key: 'num', label: 'Num', width: 'w-16' },
          { key: 'libelle', label: 'Libellé', width: 'w-48' },
          { key: 'description', label: 'Descriptions' }
        ]}
        data={agencies}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        keyField="id"
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        title={editingAgency ? 'Modifier l\'agence' : 'Nouvelle agence'}
        onClose={handleCloseModal}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Libellé <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.libelle}
              onChange={(e) => setFormData({ ...formData, libelle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Entrez le libellé de l'agence"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
              placeholder="Entrez une description"
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg transition-all duration-200"
            >
              {editingAgency ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
