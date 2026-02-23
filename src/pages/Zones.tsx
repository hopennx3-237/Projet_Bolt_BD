import { useState, useEffect } from 'react';
import { Grid3x3, Plus } from 'lucide-react';
import { zoneService, type Zone } from '../lib/mockData';
import { Modal } from '../components/ui/Modal';
import { DataTable } from '../components/ui/DataTable';

export const Zones = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<Zone | null>(null);
  const [formData, setFormData] = useState({
    villes: '',
    libelle: '',
    descriptions: '',
    nom_chef_agence: '',
    telephone: ''
  });

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      setLoading(true);
      const data = await zoneService.getZones();
      setZones(data);
    } catch (error) {
      console.error('Error fetching zones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (zone?: Zone) => {
    if (zone) {
      setEditingZone(zone);
      setFormData({
        villes: zone.villes,
        libelle: zone.libelle,
        descriptions: zone.descriptions || '',
        nom_chef_agence: zone.nom_chef_agence || '',
        telephone: zone.telephone || ''
      });
    } else {
      setEditingZone(null);
      setFormData({
        villes: '',
        libelle: '',
        descriptions: '',
        nom_chef_agence: '',
        telephone: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingZone(null);
    setFormData({
      villes: '',
      libelle: '',
      descriptions: '',
      nom_chef_agence: '',
      telephone: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.libelle.trim()) {
      alert('Le libellé est requis');
      return;
    }

    if (!formData.villes.trim()) {
      alert('Les villes sont requises');
      return;
    }

    try {
      if (editingZone) {
        await zoneService.updateZone(
          editingZone.id,
          formData.villes,
          formData.libelle,
          formData.descriptions || null,
          formData.nom_chef_agence || null,
          formData.telephone || null
        );
      } else {
        await zoneService.addZone(
          formData.villes,
          formData.libelle,
          formData.descriptions || null,
          formData.nom_chef_agence || null,
          formData.telephone || null
        );
      }

      await fetchZones();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving zone:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (zone: Zone) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${zone.libelle}" ?`)) {
      return;
    }

    try {
      await zoneService.deleteZone(zone.id);
      await fetchZones();
    } catch (error) {
      console.error('Error deleting zone:', error);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Grid3x3 className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Zones</h1>
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full border border-yellow-300">
              Mode démo
            </span>
          </div>
          <p className="text-gray-600">Gestion des zones de couverture (données mockées)</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nouvelle zone
        </button>
      </div>

      <DataTable
        columns={[
          { key: 'num', label: 'Num', width: 'w-12' },
          { key: 'villes', label: 'Villes', width: 'w-48' },
          { key: 'libelle', label: 'Libellé', width: 'w-40' },
          { key: 'descriptions', label: 'Descriptions', width: 'w-64' },
          { key: 'nom_chef_agence', label: 'Chef d\'agence', width: 'w-40' },
          { key: 'telephone', label: 'Téléphone', width: 'w-40' }
        ]}
        data={zones}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        keyField="id"
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        title={editingZone ? 'Modifier la zone' : 'Nouvelle zone'}
        onClose={handleCloseModal}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Villes <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.villes}
                onChange={(e) => setFormData({ ...formData, villes: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                placeholder="Ex: Douala, Buea, Limbé"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Libellé <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.libelle}
                onChange={(e) => setFormData({ ...formData, libelle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                placeholder="Ex: Zone Littoral"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description
            </label>
            <textarea
              value={formData.descriptions}
              onChange={(e) => setFormData({ ...formData, descriptions: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition resize-none"
              placeholder="Entrez une description détaillée"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Chef d'agence
              </label>
              <input
                type="text"
                value={formData.nom_chef_agence}
                onChange={(e) => setFormData({ ...formData, nom_chef_agence: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                placeholder="Nom du chef"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                placeholder="+237 6 XX XX XX XX"
              />
            </div>
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
              className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg transition-all duration-200"
            >
              {editingZone ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
