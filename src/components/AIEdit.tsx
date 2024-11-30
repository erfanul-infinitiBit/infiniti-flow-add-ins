import React, { useState } from 'react';
import { Wand2, ArrowRight, Check, X } from 'lucide-react';
import TitleBar from './TitleBar';

interface ComparisonState {
  original: string;
  improved: string;
  isVisible: boolean;
}

interface AIEditProps {
  onBack: () => void;
}

const AIEdit: React.FC<AIEditProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [comparison, setComparison] = useState<ComparisonState>({
    original: '',
    improved: '',
    isVisible: false,
  });

  const getImprovedText = async () => {
    setIsLoading(true);
    try {
      await Word.run(async (context) => {
        const selection = context.document.getSelection();
        context.load(selection, 'text');
        await context.sync();

        const originalText = selection.text;

        // Get AI suggestion for the selected text
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful assistant that improves text while maintaining its original meaning.',
              },
              {
                role: 'user',
                content: `Improve this text: ${originalText}\n\nPrompt: ${prompt}`,
              },
            ],
          }),
        });

        const data = await response.json();
        const improvedText = data.choices[0]?.message?.content;

        if (improvedText) {
          setComparison({
            original: originalText,
            improved: improvedText,
            isVisible: true,
          });
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  const applyChanges = async () => {
    try {
      await Word.run(async (context) => {
        const selection = context.document.getSelection();
        selection.insertText(comparison.improved, Word.InsertLocation.replace);
        await context.sync();
        setComparison({ ...comparison, isVisible: false });
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const discardChanges = () => {
    setComparison({ ...comparison, isVisible: false });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-4">
      <TitleBar title="AI Edit" onBack={onBack} />
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Edit Instructions
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., Make it more formal, simplify the language..."
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b579a]"
            rows={4}
          />
        </div>

        {!comparison.isVisible && (
          <button
            onClick={getImprovedText}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-[#2b579a] text-white p-2 rounded-lg hover:bg-[#1e3f6f] disabled:opacity-50"
          >
            <Wand2 size={20} />
            {isLoading ? 'Generating Suggestion...' : 'Get AI Suggestion'}
          </button>
        )}

        {comparison.isVisible && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Original Text</h3>
                <div className="p-3 bg-gray-50 rounded-lg text-gray-600 min-h-[100px] whitespace-pre-wrap">
                  {comparison.original}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Improved Version</h3>
                <div className="p-3 bg-green-50 rounded-lg text-gray-600 min-h-[100px] whitespace-pre-wrap">
                  {comparison.improved}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={applyChanges}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
              >
                <Check size={20} />
                Apply Changes
              </button>
              <button
                onClick={discardChanges}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
              >
                <X size={20} />
                Discard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIEdit;
