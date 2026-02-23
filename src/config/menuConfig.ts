import {
  LayoutDashboard,
  MapPin,
  Building2,
  Map,
  Users,
  Briefcase,
  Calendar,
  UserCheck,
  GraduationCap,
  CreditCard,
  History,
  UserCog,
  Receipt,
  ArrowLeftRight,
  BarChart3,
  TrendingUp,
  Settings,
  Shield,
  Package,
  Cog,
  LucideIcon
} from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  badge?: number | string;
  children?: MenuItem[];
}

export interface MenuSection {
  id: string;
  label: string;
  icon: LucideIcon;
  isCollapsible: boolean;
  children?: MenuItem[];
  path?: string;
}

export const menuConfig: MenuSection[] = [
  {
    id: 'home',
    label: 'Dashboard',
    icon: LayoutDashboard,
    isCollapsible: false,
    path: '/dashboard'
  },
  {
    id: 'base-data',
    label: 'Données de Base',
    icon: Briefcase,
    isCollapsible: true,
    children: [
      { id: 'cities', label: 'Villes', icon: MapPin, path: '/cities', badge: 5 },
      { id: 'agencies', label: 'Agences', icon: Building2, path: '/agencies', badge: 15 },
      { id: 'zones', label: 'Zones', icon: Map, path: '/zones', badge: 5 },
      { id: 'sales', label: 'Commerciaux', icon: Users, path: '/sales', badge: 15 },
      { id: 'services', label: 'Services', icon: Briefcase, path: '/services' },
      { id: 'exam-sessions', label: 'Session d\'exam', icon: Calendar, path: '/exam-sessions', badge: 3 },
      { id: 'clients', label: 'Clients', icon: UserCheck, path: '/clients', badge: 247 },
      { id: 'trainings', label: 'Formations', icon: GraduationCap, path: '/trainings', badge: 18 }
    ]
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: CreditCard,
    isCollapsible: true,
    children: [
      { id: 'registrations', label: 'Inscriptions', icon: UserCheck, path: '/finance/registrations', badge: 'NEW' },
      { id: 'payment-history', label: 'Histo. Paiement', icon: History, path: '/finance/payment-history' },
      { id: 'client-tracking', label: 'Suivie Clients', icon: UserCog, path: '/finance/client-tracking', badge: 12 },
      { id: 'expense-history', label: 'Histo. Dépenses', icon: Receipt, path: '/finance/expense-history' },
      { id: 'transaction-history', label: 'Histo. Transaction', icon: ArrowLeftRight, path: '/finance/transaction-history' }
    ]
  },
  {
    id: 'financial-reporting',
    label: 'Reporting Financier',
    icon: BarChart3,
    isCollapsible: true,
    children: [
      { id: 'registration-stats', label: 'Stats. inscriptions', icon: TrendingUp, path: '/reporting/registration-stats' },
      { id: 'city-performance', label: 'Performance Villes', icon: MapPin, path: '/reporting/city-performance' },
      { id: 'agency-performance', label: 'Performance Agences', icon: Building2, path: '/reporting/agency-performance' },
      { id: 'zone-performance', label: 'Performance Zones', icon: Map, path: '/reporting/zone-performance' },
      { id: 'training-performance', label: 'Perfor. Formations', icon: GraduationCap, path: '/reporting/training-performance' },
      { id: 'sales-performance', label: 'Perfor. commerciaux', icon: Users, path: '/reporting/sales-performance' },
      { id: 'transaction-balance', label: 'Bilan Transaction', icon: ArrowLeftRight, path: '/reporting/transaction-balance' }
    ]
  },
  {
    id: 'settings',
    label: 'Paramètres',
    icon: Settings,
    isCollapsible: true,
    children: [
      { id: 'users', label: 'Utilisateurs', icon: Users, path: '/settings/users', badge: 24 },
      { id: 'roles', label: 'Rôles & permissions', icon: Shield, path: '/settings/roles' },
      { id: 'service-packs', label: 'Services / Packs', icon: Package, path: '/settings/service-packs' },
      { id: 'system-settings', label: 'Paramètres système', icon: Cog, path: '/settings/system' }
    ]
  }
];
