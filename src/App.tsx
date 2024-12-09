import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import ChatBot from './components/ChatBot';
import AIEdit from './components/AIEdit';
import DocumentRefinement from './components/DocumentRefinement';
import ProofReading from './components/ProofReading';

function App() {
  const [documentText, setDocumentText] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [isOfficeInitialized, setIsOfficeInitialized] = useState(false);

  useEffect(() => {
    Office.onReady(() => {
      setIsOfficeInitialized(true);
      // Register event handler
      Office.context.document.addHandlerAsync(
        Office.EventType.DocumentSelectionChanged,
        updateDocumentText
      );
      // Get initial document text
      updateDocumentText();
    });
  }, []);

  const updateDocumentText = async () => {
    try {
      await Word.run(async (context) => {
        const body = context.document.body;
        context.load(body, 'text');
        await context.sync();
        setDocumentText(body.text);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const makeTextBold = async () => {
    try {
      await Word.run(async (context) => {
        context.document.getSelection().font.bold = true;
        await context.sync();
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const makeTextItalic = async () => {
    try {
      await Word.run(async (context) => {
        context.document.getSelection().font.italic = true;
        await context.sync();
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const makeTextUnderline = async () => {
    try {
      await Word.run(async (context) => {
        context.document.getSelection().font.underline = 'Single';
        await context.sync();
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'chat':
        return <ChatBot documentText={documentText} onBack={() => setCurrentPage('home')} />;
      case 'ai-edit':
        return <AIEdit onBack={() => setCurrentPage('home')} />;
      // case 'refinement':
      //   return <DocumentRefinement onBack={() => setCurrentPage('home')} />;
      case 'proofreading':
        return <ProofReading onBack={() => setCurrentPage('home')} />;
      default:
        return null;
    }
  };

  if (!isOfficeInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Initializing...</p>
      </div>
    );
  }

  return (
    <div className="p-4 h-screen bg-white">
      <div className="w-full">
        <Navigation 
          onNavigate={setCurrentPage} 
          showBack={currentPage !== 'home'} 
        />
        {renderContent()}
      </div>
    </div>
  );
}

export default App;