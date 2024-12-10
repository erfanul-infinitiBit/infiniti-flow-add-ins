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
- SSL Certificate for development
- Gulp for building the manifest file

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
   - Follow the instructions below for setting up an SSL certificate

2. Configure Word:
   - Open Word
   - Go to Insert > Office Add-ins
   - Choose "My Add-ins"
   - Upload manifest.xml

## SSL Certificate Setup

### Why SSL Certificates are Required
Office Add-ins require HTTPS for security reasons. During development, you need a trusted SSL certificate because:
- Office Add-ins run in a secure context
- Communication between your add-in and Office must be encrypted
- Local development needs to simulate production security
- Microsoft Office blocks untrusted certificates

### Setting up SSL Certificates

#### Method 1: Using Office Add-in Dev Certs (Recommended)

1. Install the certificate generation tool:
```bash
npm install -g office-addin-dev-certs
```

2. Generate and install certificates:
```bash
npx office-addin-dev-certs install --days 365
```

3. Verify installation:
```bash
npx office-addin-dev-certs verify
```

If you see certificate errors:
```bash
# Remove existing certificates
npx office-addin-dev-certs uninstall

# Reinstall certificates
npx office-addin-dev-certs install --days 365
```

#### Method 2: Manual Certificate Creation (Alternative)

1. Using OpenSSL (if you have it installed):
```bash
# Generate private key
openssl genrsa -out localhost.key 2048

# Create certificate signing request
openssl req -new -key localhost.key -out localhost.csr

# Generate self-signed certificate
openssl x509 -req -days 365 -in localhost.csr -signkey localhost.key -out localhost.crt
```

2. Install the certificate in Windows:
   - Double-click the `.crt` file
   - Select "Install Certificate"
   - Choose "Local Machine"
   - Select "Place all certificates in the following store"
   - Click "Browse" and select "Trusted Root Certification Authorities"
   - Click "Next" and "Finish"

### Configuring Vite for HTTPS

1. Update `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('path/to/localhost.key'),
      cert: fs.readFileSync('path/to/localhost.crt'),
    },
    port: 5175
  }
});
```

2. Add certificate paths to your `.env` file:
```env
VITE_SSL_KEY_PATH=path/to/localhost.key
VITE_SSL_CERT_PATH=path/to/localhost.crt
```

### Troubleshooting Certificate Issues

1. Browser Warnings
   - Open https://localhost:5175 directly in your browser
   - Click "Advanced" and proceed to the site
   - Accept the self-signed certificate

2. Word Desktop Issues
   - Ensure certificates are installed in the correct store
   - Verify certificate dates are valid
   - Check certificate trust chain

3. Common Problems and Solutions
   - "Your connection is not private": Accept the certificate in your browser first
   - "NET::ERR_CERT_AUTHORITY_INVALID": Reinstall certificates
   - "Add-in Error": Clear browser cache and reload Word

### Security Best Practices

1. Certificate Management
   - Keep certificates in a secure location
   - Don't commit certificates to version control
   - Regenerate certificates if compromised
   - Use different certificates for development and production

2. Development Environment
   - Use HTTPS exclusively
   - Keep certificates up to date
   - Follow Microsoft's security guidelines
   - Regular certificate rotation

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

## Package Dependencies

### Core Dependencies

#### React Ecosystem
- `react` (^18.3.1): Core React library for building user interfaces
- `react-dom` (^18.3.1): React rendering for web browsers
- `@types/react` (^18.3.5): TypeScript definitions for React
- `@types/react-dom` (^18.3.0): TypeScript definitions for React DOM

#### Office Add-in
- `@microsoft/office-js` (^1.1.90): Official Microsoft Office JavaScript API
- `office-ui-fabric-react` (^7.204.0): Microsoft's legacy UI components for Office Add-ins
- `@fluentui/react` (^8.112.3): Modern Microsoft UI component library (Fluent UI)

#### UI Components and Styling
- `lucide-react` (^0.344.0): Beautiful and consistent icon set
- `tailwindcss` (^3.4.1): Utility-first CSS framework
- `autoprefixer` (^10.4.18): PostCSS plugin to parse CSS and add vendor prefixes
- `postcss` (^8.4.35): Tool for transforming CSS with JavaScript

### Development Dependencies

#### Build Tools
- `@vitejs/plugin-react` (^4.3.1): Official Vite plugin for React support
- `vite` (latest): Next-generation frontend build tool

#### TypeScript and Type Checking
- `typescript` (latest): JavaScript with syntax for types
- `@types/node` (latest): TypeScript definitions for Node.js

#### Linting and Code Quality
- `eslint` (^9.9.1): JavaScript and TypeScript linter
- `@eslint/js` (^9.9.1): ESLint's official JavaScript integration
- `eslint-plugin-react-hooks` (^5.1.0-rc.0): React Hooks specific linting rules
- `eslint-plugin-react-refresh` (^0.4.11): Fast Refresh specific linting rules
- `globals` (^15.9.0): Global identifier management for ESLint

### Package Installation

Install all dependencies:
```bash
npm install
# or
yarn install
```

Install only production dependencies:
```bash
npm install --production
# or
yarn install --production
```

Gulp installation:
```
npm install -g gulp-cli
```

### Package Scripts

```json
{
  "scripts": {
    "dev": "vite",              // Start development server
    "build": "vite build",      // Build for production
    "lint": "eslint .",         // Run ESLint
    "preview": "vite preview"   // Preview production build
  }
}
```

### Version Management

- All dependencies use semantic versioning
- Core dependencies are pinned to specific versions for stability
- Development dependencies use caret ranges for minor version updates

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `gulp package --ship`: Create zip package file with the manifest.xml 

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
