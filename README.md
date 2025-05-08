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

## Technical Stack

- Frontend:
  - React
  - TypeScript
  - Vite
  - Tailwind CSS

- Build & Deployment:
  - Docker
  - Digital Ocean App Platform

## Deployment

### Digital Ocean Configuration

1. Domain: swingfaders.com
2. Subdomain: investmentideas
3. App URL: https://investmentideas.swingfaders.com
4. Build Strategy: Dockerfile

### Environment Variables

- NODE_ENV=production

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request