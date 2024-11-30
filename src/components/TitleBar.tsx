import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TitleBarProps {
  title: string;
  onBack: () => void;
}

const TitleBar: React.FC<TitleBarProps> = ({ title, onBack }) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <button
        onClick={onBack}
        className="p-2 hover:bg-gray-100 rounded-full text-[#2b579a] transition-colors"
        title="Back"
      >
        <ArrowLeft size={20} />
      </button>
      <h2 className="text-lg font-semibold text-[#2b579a]">{title}</h2>
    </div>
  );
};

export default TitleBar;
