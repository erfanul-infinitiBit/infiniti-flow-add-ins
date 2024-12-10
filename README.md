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

Try this if you face any version related difficulties:
```bash
npm install --legacy-peer-deps
```

3. Create a `.env` file in the root directory:
```env
VITE_OPENAI_API_KEY=your_openai_api_key
```

4. Install Gulp cli
```bash
npm install -g gulp-cli
```

4. Install SSL certificate. Check below.

5. Build production
```bash
npm run build
```

6. Start the development server:
```bash
npm run dev
# or
yarn dev
```

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

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `gulp package --ship`: Create zip package file with the manifest.xml 

## Acknowledgments

- Microsoft Office Add-in Team
- OpenAI
- React Community
- Vite Team
