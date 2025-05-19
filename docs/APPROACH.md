
# File & Folder Structure – Brief Explanation

My integration is structured to scale multiple MVNO integrations, with a emphasis on modularity, type safety, and runtime validation.
MVNO integration in this case is labelled "Vodafone"

## `src/`

### `converters/`

-  `mapping-engine.ts`: Core logic to map fields using a declarative config (source → target + transform).
-  `index.ts`: Central export point for converters.

## `core/`

### `schemas/`

-  `internal.schema.ts`: Zod schema to validate Telgea’s internal normalized format.
-  `index.ts`: Schema export entry.

### `utils/`

-  `parseSoap.ts`: Parses SOAP XML responses into JSON using `xml2js`.
-  `index.ts`: Utility export entry point. 

## `providers/`

### `base/`
-  `MVNOIntegrationBase.ts`: Abstract base class encapsulating shared logic (e.g., validation, merging).
- Enforces the **Open/Closed Principle** — new providers extend this class without modifying core logic.

### `vodafone/`

-  `VodafoneIntegration.ts`: Vodafone-specific class that extends the base and implements REST/SOAP converters.
-  `converters/`: Vodafone-specific data mappers and transformer logic.
-  `schemas/`: Zod schemas validating Vodafone-specific data.

### `index.ts`

- Defines and exports the `mvnoRegistry` object which serves as a runtime registry of all available MVNO integrations.

# Testing Strategy

- `test/` directory and subdirectories in individual providers
- Uses realistic mock data (SOAP/XML, REST/JSON) and expected transformed results.
- Unit tests focus on:
- Mapping engine
- Individual converters
- Normalization/merging logic
- E2E tests avoided due to time constraints.

# Key Assumptions & Decisions

- Only Vodafone was implemented as a proof of concept.
- Created mock-based tests using fixture data rather than implementing full mock APIs due to time/scope constraints.
- System supports both REST and SOAP API formats.
- Used `Zod` for runtime validation and `Lodash` for deep merging.
- Structure enables fast onboarding of new providers by isolating logic and reusing shared abstractions.