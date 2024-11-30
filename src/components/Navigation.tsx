import React from 'react';
import { MessageSquare, Edit3, FileText, CheckSquare, ArrowLeft } from 'lucide-react';

interface NavigationProps {
  onNavigate: (page: string) => void;
  showBack: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, showBack }) => {
  const menuItems = [
    { id: 'chat', label: 'Chat Assistant', icon: MessageSquare },
    { id: 'ai-edit', label: 'AI Edit', icon: Edit3 },
    { id: 'refinement', label: 'Document Refinement', icon: FileText },
    { id: 'proofreading', label: 'Proof Reading', icon: CheckSquare },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg">
        <div className="p-4 bg-[#2b579a] text-white rounded-t-lg">
          <h2 className="text-xl font-semibold">InfinitiFlow</h2>
          <p className="text-sm text-gray-200 mt-1">AI-powered document assistant</p>
        </div>
      {!showBack && (
        <div className="p-4 grid grid-cols-1 gap-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 border border-gray-200 transition-colors"
            >
              <item.icon size={20} className="text-[#2b579a]" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navigation;
