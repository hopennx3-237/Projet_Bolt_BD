import { Users, GraduationCap, CreditCard, TrendingUp, Calendar, DollarSign } from 'lucide-react';

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue
}: {
  title: string;
  value: string;
  icon: any;
  trend: 'up' | 'down';
  trendValue: string;
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
          <div className="flex items-center gap-1">
            <span className={`text-sm font-semibold ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </span>
            <span className="text-gray-500 text-sm">vs mois dernier</span>
          </div>
        </div>
        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-yellow-600" />
        </div>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Vue d'ensemble de votre auto-école</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Clients"
          value="247"
          icon={Users}
          trend="up"
          trendValue="12%"
        />
        <StatCard
          title="Inscriptions Actives"
          value="189"
          icon={GraduationCap}
          trend="up"
          trendValue="8%"
        />
        <StatCard
          title="Revenu Mensuel"
          value="45,230 €"
          icon={DollarSign}
          trend="up"
          trendValue="15%"
        />
        <StatCard
          title="Sessions d'Examen"
          value="24"
          icon={Calendar}
          trend="up"
          trendValue="4%"
        />
        <StatCard
          title="Taux de Réussite"
          value="78%"
          icon={TrendingUp}
          trend="up"
          trendValue="5%"
        />
        <StatCard
          title="Paiements en Attente"
          value="12,450 €"
          icon={CreditCard}
          trend="down"
          trendValue="3%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Inscriptions Récentes</h3>
          <div className="space-y-3">
            {[
              { name: 'Marie Dubois', formation: 'Permis B', date: '20/02/2026', status: 'Confirmé' },
              { name: 'Jean Martin', formation: 'Permis B + AAC', date: '19/02/2026', status: 'En attente' },
              { name: 'Sophie Bernard', formation: 'Permis B', date: '18/02/2026', status: 'Confirmé' },
              { name: 'Luc Petit', formation: 'Code + Conduite', date: '17/02/2026', status: 'Confirmé' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.formation}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{item.date}</p>
                  <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                    item.status === 'Confirmé'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Performance par Agence</h3>
          <div className="space-y-4">
            {[
              { name: 'Agence Paris Centre', revenue: '15,230 €', percentage: 85 },
              { name: 'Agence Lyon Part-Dieu', revenue: '12,450 €', percentage: 70 },
              { name: 'Agence Marseille Vieux-Port', revenue: '10,890 €', percentage: 65 },
              { name: 'Agence Toulouse Capitole', revenue: '6,660 €', percentage: 45 }
            ].map((agency, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{agency.name}</span>
                  <span className="text-sm font-semibold text-gray-900">{agency.revenue}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${agency.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl p-6 text-gray-900">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Mode Démo Actif</h3>
            <p className="text-gray-800">
              Vous utilisez actuellement une version de démonstration avec des données fictives.
            </p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
