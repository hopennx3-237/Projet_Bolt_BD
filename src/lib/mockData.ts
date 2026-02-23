export interface City {
  id: string;
  num: number;
  libelle: string;
  description: string | null;
}

export interface Agency {
  id: string;
  num: number;
  libelle: string;
  description: string | null;
}

export interface Zone {
  id: string;
  num: number;
  villes: string;
  libelle: string;
  descriptions: string | null;
  nom_chef_agence: string | null;
  telephone: string | null;
}

let citiesData: City[] = [
  { id: '1', num: 1, libelle: 'Douala', description: 'Capitale économique du Cameroun' },
  { id: '2', num: 2, libelle: 'Yaoundé', description: 'Capitale politique du Cameroun' },
  { id: '3', num: 3, libelle: 'Bafoussam', description: 'Chef-lieu de la région de l\'Ouest' }
];

let agenciesData: Agency[] = [
  { id: '1', num: 1, libelle: 'Agence Centrale', description: 'Siège principal de l\'organisation' },
  { id: '2', num: 2, libelle: 'Agence Nord', description: 'Branche régionale Nord' },
  { id: '3', num: 3, libelle: 'Agence Sud', description: 'Branche régionale Sud' },
  { id: '4', num: 4, libelle: 'Agence Est', description: 'Branche régionale Est' },
  { id: '5', num: 5, libelle: 'Agence Ouest', description: 'Branche régionale Ouest' }
];

let zonesData: Zone[] = [
  { id: '1', num: 1, villes: 'Douala, Buea, Limbé', libelle: 'Zone Littoral', descriptions: 'Zone côtière couvrant les villes principales', nom_chef_agence: 'Jean Dupont', telephone: '+237 6 71 23 45 67' },
  { id: '2', num: 2, villes: 'Yaoundé, Soa', libelle: 'Zone Centre', descriptions: 'Zone centrale administrative', nom_chef_agence: 'Marie Kamdem', telephone: '+237 6 81 34 56 78' },
  { id: '3', num: 3, villes: 'Bafoussam, Mbouda', libelle: 'Zone Ouest', descriptions: 'Zone montagneuse de l\'ouest', nom_chef_agence: 'Pierre Fotso', telephone: '+237 6 91 45 67 89' },
  { id: '4', num: 4, villes: 'Garoua, Ngaoundéré', libelle: 'Zone Nord', descriptions: 'Zone nord-camerounaise', nom_chef_agence: 'Ahmed Hassan', telephone: '+237 6 61 56 78 90' },
  { id: '5', num: 5, villes: 'Bertoua, Battouri', libelle: 'Zone Est', descriptions: 'Zone forestière de l\'est', nom_chef_agence: 'Sophie Nkomo', telephone: '+237 6 51 67 89 01' }
];

let nextCityNum = 4;
let nextAgencyNum = 6;
let nextZoneNum = 6;

export const cityService = {
  getCities: async (): Promise<City[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...citiesData]), 300);
    });
  },

  addCity: async (libelle: string, description: string | null): Promise<City> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCity: City = {
          id: Date.now().toString(),
          num: nextCityNum++,
          libelle,
          description
        };
        citiesData.push(newCity);
        resolve(newCity);
      }, 300);
    });
  },

  updateCity: async (id: string, libelle: string, description: string | null): Promise<City> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = citiesData.findIndex(c => c.id === id);
        if (index === -1) {
          reject(new Error('Ville non trouvée'));
          return;
        }
        citiesData[index] = { ...citiesData[index], libelle, description };
        resolve(citiesData[index]);
      }, 300);
    });
  },

  deleteCity: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = citiesData.findIndex(c => c.id === id);
        if (index === -1) {
          reject(new Error('Ville non trouvée'));
          return;
        }
        citiesData.splice(index, 1);
        resolve();
      }, 300);
    });
  }
};

export const agencyService = {
  getAgencies: async (): Promise<Agency[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...agenciesData]), 300);
    });
  },

  addAgency: async (libelle: string, description: string | null): Promise<Agency> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAgency: Agency = {
          id: Date.now().toString(),
          num: nextAgencyNum++,
          libelle,
          description
        };
        agenciesData.push(newAgency);
        resolve(newAgency);
      }, 300);
    });
  },

  updateAgency: async (id: string, libelle: string, description: string | null): Promise<Agency> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = agenciesData.findIndex(a => a.id === id);
        if (index === -1) {
          reject(new Error('Agence non trouvée'));
          return;
        }
        agenciesData[index] = { ...agenciesData[index], libelle, description };
        resolve(agenciesData[index]);
      }, 300);
    });
  },

  deleteAgency: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = agenciesData.findIndex(a => a.id === id);
        if (index === -1) {
          reject(new Error('Agence non trouvée'));
          return;
        }
        agenciesData.splice(index, 1);
        resolve();
      }, 300);
    });
  }
};

export const zoneService = {
  getZones: async (): Promise<Zone[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...zonesData]), 300);
    });
  },

  addZone: async (villes: string, libelle: string, descriptions: string | null, nom_chef_agence: string | null, telephone: string | null): Promise<Zone> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newZone: Zone = {
          id: Date.now().toString(),
          num: nextZoneNum++,
          villes,
          libelle,
          descriptions,
          nom_chef_agence,
          telephone
        };
        zonesData.push(newZone);
        resolve(newZone);
      }, 300);
    });
  },

  updateZone: async (id: string, villes: string, libelle: string, descriptions: string | null, nom_chef_agence: string | null, telephone: string | null): Promise<Zone> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = zonesData.findIndex(z => z.id === id);
        if (index === -1) {
          reject(new Error('Zone non trouvée'));
          return;
        }
        zonesData[index] = { ...zonesData[index], villes, libelle, descriptions, nom_chef_agence, telephone };
        resolve(zonesData[index]);
      }, 300);
    });
  },

  deleteZone: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = zonesData.findIndex(z => z.id === id);
        if (index === -1) {
          reject(new Error('Zone non trouvée'));
          return;
        }
        zonesData.splice(index, 1);
        resolve();
      }, 300);
    });
  }
};
