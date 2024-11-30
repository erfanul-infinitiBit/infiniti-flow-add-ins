import React, { useState } from 'react';
import { FileText, Check } from 'lucide-react';
import TitleBar from './TitleBar';

interface DocumentRefinementProps {
  onBack: () => void;
}

const DocumentRefinement: React.FC<DocumentRefinementProps> = ({ onBack }) => {
  const [isRefining, setIsRefining] = useState(false);

  const refineDocument = async () => {
    setIsRefining(true);
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
                content: 'You are an expert at refining and improving documents while maintaining their original meaning and structure.',
              },
              {
                role: 'user',
                content: `Please refine this document to improve clarity, flow, and professionalism while maintaining its core message: ${body.text}`,
              },
            ],
          }),
        });

        const data = await response.json();
        const refinedText = data.choices[0]?.message?.content;

        if (refinedText) {
          body.insertText(refinedText, Word.InsertLocation.replace);
          await context.sync();
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
    setIsRefining(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-4">
      <TitleBar title="Document Refinement" onBack={onBack} />
      <div className="space-y-4">
        <p className="text-gray-600">
          This tool will analyze your entire document and suggest improvements for:
        </p>
        <ul className="list-none space-y-2">
          {[
            'Clarity and readability',
            'Professional tone',
            'Sentence structure',
            'Word choice',
            'Overall flow',
          ].map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-700">
              <Check size={16} className="text-green-500" />
              {item}
            </li>
          ))}
        </ul>
        <button
          onClick={refineDocument}
          disabled={isRefining}
          className="w-full flex items-center justify-center gap-2 bg-[#2b579a] text-white p-2 rounded-lg hover:bg-[#1e3f6f] disabled:opacity-50"
        >
          <FileText size={20} />
          {isRefining ? 'Refining Document...' : 'Refine Document'}
        </button>
      </div>
    </div>
  );
};

export default DocumentRefinement;
