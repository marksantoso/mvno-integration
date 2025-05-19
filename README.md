# MVNO Integration Service

## Architecture & Approach

This service provides integration capabilities for Mobile Virtual Network Operators (MVNOs), specifically handling the conversion of both SOAP and REST responses to a standardized internal API format.

### Project Structure

```
src/
├── converters/            # Data conversion logic
│   ├── index.ts           # Export point for converters
│   └── mapping-engine.ts  # Core data mapping engine
├── core/                  # Core functionality
│   ├── schemas/           # Data schemas and validation
│   │   ├── index.ts       # Schema exports
│   │   └── internal.schema.ts # Internal data format schema
│   └── utils/             # Shared utilities
│       ├── index.ts       # Utility exports
│       └── parseSoap.ts   # SOAP XML parsing utility
├── providers/             # MVNO provider-specific implementations
│    ├── base/              # Base classes for providers
│    │   └── MVNOIntegrationBase.ts # Abstract base class for all providers
│    ├── vodafone/          # Vodafone-specific implementation
│    │   ├── converters/    # Vodafone data converters
│    │   ├── schemas/       # Vodafone data schemas
│    │   ├── test/          # Vodafone-specific tests
│    │   │   ├── fixtures/  # Test data fixtures
│    │   │   └── vodafone.test.ts # Tests for Vodafone integration
│    │   └── VodafoneIntegration.ts # Vodafone integration class
│    └── index.ts           # Provider exports
test/                       # Project-level tests
└── mapping-engine.test.ts  # Tests for mapping engine
```

### Technology Stack

- TypeScript
- Node.js
- Jest (Testing)
- ESLint & Prettier (Code quality)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Development

### Available Scripts
- `npm test`: Run tests
- `npm run format`: Format code with Prettier
- `npm run lint`: Lint code with ESLint
- `npm run type-check`: TypeScript type checking

