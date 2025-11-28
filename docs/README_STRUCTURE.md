# Project Structure

## Component Organization

### 📁 `src/components/`

#### `global/` - Global/Reusable Components

- `header.tsx` - Site header with navigation
- `footer.tsx` - Site footer with links
- `theme-toggle.tsx` - Dark/light mode toggle
- `code-block.tsx` - Syntax highlighted code display
- `copy-button.tsx` - Copy to clipboard button
- `index.ts` - Barrel export

#### `home/` - Home Page Components

- `doc-hero.tsx` - Hero section (uses `@/data/hero`)
- `index.ts` - Barrel export

##### `home/sections/` - Home Page Sections

**Main Sections (use these in pages):**

- `concept-section.tsx` - Concept explanation
- `features-section.tsx` - Features with header
- `parameters-section.tsx` - Query parameters with header
- `usage-section.tsx` - Usage examples with header
- `configuration-section.tsx` - Configuration with header

**Internal Components (for composition):**

- `feature-grid.tsx` - Feature cards grid (uses `@/data/features`)
- `props-table.tsx` - Query parameters table (uses `@/data/query-params`)
- `example-section.tsx` - Tabbed code examples
- `config-section.tsx` - Configuration table (uses `@/data/config-options`)
- `section-header.tsx` - Reusable section header
- `index.ts` - Barrel export

#### `ui/` - UI Primitives (Shadcn)

- `badge.tsx`
- `button.tsx`
- `card.tsx`
- `table.tsx`
- `tabs.tsx`

#### Other

- `package-manager-selector.tsx` - Package manager selector (uses `@/types/package-manager`)
- `index.ts` - Main barrel export

## Data Layer

### 📁 `src/data/`

- `hero.ts` - Hero section content
- `features.tsx` - Features data with icons
- `query-params.ts` - Query parameters data
- `config-options.ts` - Configuration options data

### 📁 `src/constants/`

- `sections.ts` - Section metadata (titles, descriptions, ids)

### 📁 `src/types/`

- `package-manager.ts` - Package manager types and constants

## Custom Hooks

### 📁 `src/hooks/`

- `use-copy-to-clipboard.ts` - Clipboard functionality
- `use-package-manager.ts` - Package manager state management

## Key Principles

1. **No Props for Data** - Components use data directly from `@/data/` and `@/constants/`
2. **Barrel Exports** - Each folder has an `index.ts` for clean imports
3. **Grouped by Feature** - Components organized by their purpose (global, home, ui)
4. **Composition** - Section wrappers compose header + content
5. **Clean Page Components** - Pages are simple and declarative

## Usage Example

```tsx
// ✅ Clean - No props needed
import { DocHero, FeaturesSection } from "@/components";

export default function Page() {
  return (
    <>
      <DocHero />
      <FeaturesSection />
    </>
  );
}
```

## Build Status

✅ All components organized
✅ Barrel exports working
✅ Build passing
✅ No unused components
