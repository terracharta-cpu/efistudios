import React from 'react';
import {
  Key,
  Wifi,
  Bed,
  Waves,
  Utensils,
  Sparkles,
  Anchor,
  Info,
  LogOut,
  HelpCircle,
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-6 h-6' }) => {
  switch (name.toLowerCase()) {
    case 'key':
      return <Key className={className} />;
    case 'wifi':
      return <Wifi className={className} />;
    case 'bed':
      return <Bed className={className} />;
    case 'waves':
      return <Waves className={className} />;
    case 'utensils':
    case 'dining':
      return <Utensils className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'anchor':
      return <Anchor className={className} />;
    case 'info':
      return <Info className={className} />;
    case 'logout':
    case 'door':
      return <LogOut className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
};
