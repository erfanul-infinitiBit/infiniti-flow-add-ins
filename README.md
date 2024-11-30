# InfinitiFlow - AI-Powered Word Add-in

InfinitiFlow is a sophisticated Microsoft Word Add-in that enhances your document editing experience with AI-powered features. Built with React and TypeScript, it offers a suite of intelligent tools to improve writing quality, streamline editing, and boost productivity.

## Features

### 🤖 Chat Assistant
- Context-aware document analysis
- Real-time answers to document-related questions
- Intelligent suggestions based on content

### ✍️ AI Edit
- Smart text improvements
- Side-by-side comparison of changes
- Context-sensitive editing suggestions

### 📄 Document Refinement
- Comprehensive document analysis
- Structure and flow improvements
- Tone and style enhancement suggestions

### ✅ Proof Reading
- Grammar and spelling checks
- Style recommendations
- Detailed explanations for suggestions

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Microsoft Word (Desktop version)
- SSL Certificate for development

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ms-add-ins
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```env
VITE_OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

### Development Setup

1. Install SSL Certificate:
   - For development, you'll need a trusted SSL certificate
   - Follow Microsoft's guide for setting up certificates for Office Add-ins

2. Configure Word:
   - Open Word
   - Go to Insert > Office Add-ins
   - Choose "My Add-ins"
   - Upload manifest.xml

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: Custom components with Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: OpenAI API
- **Office Integration**: Office.js

## Project Structure

```
ms-add-ins/
├── src/
│   ├── components/        # React components
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main application
│   └── main.tsx          # Entry point
├── public/               # Static assets
└── manifest.xml          # Add-in manifest
```

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

### Environment Variables

Required environment variables:
- `VITE_OPENAI_API_KEY`: Your OpenAI API key

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Security

- Store API keys securely
- Never commit `.env` files
- Use HTTPS for development
- Follow Microsoft's security guidelines for Office Add-ins

## License

[Your chosen license]

## Acknowledgments

- Microsoft Office Add-in Team
- OpenAI
- React Community
- Vite Team
