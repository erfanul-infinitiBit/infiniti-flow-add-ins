import React, { useState } from 'react';
import { CheckSquare, AlertCircle } from 'lucide-react';
import TitleBar from './TitleBar';

interface ProofReadingProps {
  onBack: () => void;
}

interface Suggestion {
  type: 'grammar' | 'spelling' | 'style';
  text: string;
  suggestion: string;
  explanation: string;
}

const ProofReading: React.FC<ProofReadingProps> = ({ onBack }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const checkDocument = async () => {
    setIsChecking(true);
    try {
      await Word.run(async (context) => {
        const body = context.document.body;
        context.load(body, 'text');
        await context.sync();

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
                content: 'You are a professional proofreader. Identify and explain grammar, spelling, and style issues.',
              },
              {
                role: 'user',
                content: `Proofread this text and provide detailed suggestions: ${body.text}`,
              },
            ],
          }),
        });

        const data = await response.json();
        const analysisText = data.choices[0]?.message?.content;

        if (analysisText) {
          // Parse the suggestions (this is a simplified example)
          const suggestionList: Suggestion[] = analysisText
            .split('\n')
            .filter(line => line.trim().length > 0)
            .map(suggestion => ({
              type: 'grammar',
              text: suggestion,
              suggestion: suggestion,
              explanation: suggestion,
            }));
          setSuggestions(suggestionList);
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
    setIsChecking(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-4">
      <TitleBar title="Proof Reading" onBack={onBack} />
      
      {suggestions.length === 0 ? (
        <div className="text-center py-8">
          <CheckSquare size={48} className="mx-auto text-[#2b579a] mb-4" />
          <p className="text-gray-600 mb-4">
            Check your document for grammar, spelling, and style improvements.
          </p>
          <button
            onClick={checkDocument}
            disabled={isChecking}
            className="bg-[#2b579a] text-white px-6 py-2 rounded-lg hover:bg-[#1e3f6f] disabled:opacity-50"
          >
            {isChecking ? 'Checking...' : 'Check Document'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Suggestions</h3>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-3 bg-orange-50 rounded-lg space-y-2"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 font-medium">{suggestion.text}</p>
                    <p className="text-gray-600 mt-1">{suggestion.explanation}</p>
                    <p className="text-green-600 mt-2">
                      Suggestion: {suggestion.suggestion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSuggestions([])}
            className="w-full p-2 text-[#2b579a] hover:bg-gray-50 rounded-lg"
          >
            Start New Check
          </button>
        </div>
      )}
    </div>
  );
};

export default ProofReading;
