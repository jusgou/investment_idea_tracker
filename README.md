# Investment Idea Tracker

A web application for tracking and analyzing investment ideas.

## Project Structure

```
investment_idea_tracker/
├── src/
│   ├── components/
│   │   ├── Calculator/
│   │   │   ├── DCFInputs.tsx
│   │   │   └── DCFResults.tsx
│   │   └── Layout/
│   │       └── Header.tsx
│   ├── pages/
│   │   └── Calculator.tsx
│   └── App.tsx
├── digitalocean.yml
├── docker-compose.yml
├── package.json
└── README.md
```

## Features

- Investment idea tracking
- Discounted Cash Flow (DCF) calculator
- Responsive design
- TypeScript-based frontend
- Docker-based deployment
- Firebase Authentication integration
- PostgreSQL database integration

## Technical Stack

- Frontend:
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - Firebase Authentication
  - React Router
  - Bootstrap with React Bootstrap

- Backend:
  - PostgreSQL for data persistence
  - REST API for data operations

- Build & Deployment:
  - Docker (Multi-stage build)
  - Digital Ocean App Platform
  - Nginx for production serving

## Deployment

### Digital Ocean Configuration

1. Domain: swingfaders.com
2. Subdomain: investmentideas
3. App URL: https://investmentideas.swingfaders.com
4. Build Strategy: Dockerfile
5. Port: 3000

### Environment Variables

- NODE_ENV=production

### Firebase Configuration

Authorized domains:
- localhost
- investment-idea-tracker.firebaseapp.com
- investment-idea-tracker.web.app
- investmentideas.swingfaders.com

## Development

### Local Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

### Build Configuration

Vite Configuration:
- Base URL: '/'
- Asset handling:
  - Asset files: 'assets/[name]-[hash][extname]'
  - Chunk files: 'assets/[name]-[hash].js'
  - Entry files: 'assets/[name]-[hash].js'
- Firebase aliases for all required services

Docker Configuration:
- Node version: 18.20.4-alpine
- Multi-stage build
- Nginx serving on port 3000
- PostgreSQL client tools installed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request