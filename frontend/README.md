# KRAPER Frontend

This is the frontend application for KRAPER (Kraft Your Paper) - an AI-powered academic research paper generation platform.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Code Editor**: Monaco Editor
- **Icons**: Lucide React

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   - Copy `.env.local` and update the `NEXT_PUBLIC_API_URL` to point to your backend server
   - Default: `http://localhost:3000`

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   - Navigate to [http://localhost:3001](http://localhost:3001)

## Project Structure

```
frontend/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Landing page
│   ├── dashboard/           # User dashboard
│   ├── studio/              # Paper creation workspace
│   │   ├── setup/           # Questionnaire flow
│   │   └── workspace/       # Split-screen editor
│   └── layout.tsx           # Root layout
├── components/
│   ├── ui/                  # Design system components
│   └── studio/              # Feature-specific components
│       └── phases/          # Questionnaire phase components
├── lib/
│   ├── api/                 # Backend API client
│   ├── store/               # Zustand stores
│   ├── types.ts             # TypeScript types
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## Features

### Landing Page
- Animated KRAPER logo with "Assembly" effect
- Dark mode with dot-pattern background
- Smooth scroll animations

### Dashboard
- Bento grid layout
- "Create Research Paper" (active)
- "Create Patent" (locked/coming soon)
- Recent drafts history

### Questionnaire (29 Questions in 8 Phases)
1. **Core Identity** (Q1-Q4): Domain, Topic, Type, Status
2. **Motivation** (Q5-Q7): Importance, Contribution, Results
3. **Context** (Q8-Q10): Background, Problem, Objectives
4. **Literature** (Q11-Q13): Existing Approaches, Limitations, Baselines
5. **Methodology** (Q14-Q19): Approach, Workflow, Algorithms, Data, Tools, Validation
6. **Results** (Q20-Q22): Quantitative Results, Interpretation, Comparison
7. **Conclusion** (Q23-Q25): Limitations, Future Work, Key Takeaways
8. **Optional** (Q26-Q29): Formal Definition, Architecture, Ethics, Special Requirements

### Workspace
- **Split-screen layout**:
  - Left: Raw input display
  - Right: Live formatted preview
- **IEEE/Springer toggle**
- **Real-time generation** with progress tracking
- **Export functionality**

## Backend Integration

The frontend communicates with the Node.js backend at `/api/v1/generate`:

```typescript
POST /api/v1/generate
Body: QuestionnaireInputs (29 fields)
Response: GeneratedPaper (11 sections)
```

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API base URL (default: http://localhost:3000)

## Design Philosophy

The UI follows a "Cal.com-inspired" infrastructure-grade aesthetic:
- Minimal, clean design
- Subtle gradients and dot patterns
- Smooth Framer Motion animations
- Bento-style card layouts
- Premium feel with attention to micro-interactions
