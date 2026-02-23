import { useState, useEffect } from 'react';
import { MapPin, Plus } from 'lucide-react';
import { cityService, type City } from '../lib/mockData';
import { Modal } from '../components/ui/Modal';
import { DataTable } from '../components/ui/DataTable';

export const Cities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [formData, setFormData] = useState({ libelle: '', description: '' });

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const data = await cityService.getCities();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (city?: City) => {
    if (city) {
      setEditingCity(city);
      setFormData({ libelle: city.libelle, description: city.description || '' });
    } else {
      setEditingCity(null);
      setFormData({ libelle: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCity(null);
    setFormData({ libelle: '', description: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.libelle.trim()) {
      alert('Le libellé est requis');
      return;
    }

    try {
      if (editingCity) {
        await cityService.updateCity(editingCity.id, formData.libelle, formData.description || null);
      } else {
        await cityService.addCity(formData.libelle, formData.description || null);
      }

      await fetchCities();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving city:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (city: City) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${city.libelle}" ?`)) {
      return;
    }

    try {
      await cityService.deleteCity(city.id);
      await fetchCities();
    } catch (error) {
      console.error('Error deleting city:', error);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Villes</h1>
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full border border-yellow-300">
              Mode démo
            </span>
          </div>
          <p className="text-gray-600">Gestion des villes du réseau (données mockées)</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nouvelle ville
        </button>
      </div>

      <DataTable
        columns={[
          { key: 'num', label: 'Num', width: 'w-16' },
          { key: 'libelle', label: 'Libellé', width: 'w-48' },
          { key: 'description', label: 'Descriptions' }
        ]}
        data={cities}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        keyField="id"
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        title={editingCity ? 'Modifier la ville' : 'Nouvelle ville'}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Entrez le libellé de la ville"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
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
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200"
            >
              {editingCity ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
