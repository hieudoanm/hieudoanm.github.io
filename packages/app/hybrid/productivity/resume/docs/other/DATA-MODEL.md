# Data model

`ResumeData` (in `src/types/resume.ts`) is the single source of truth for
everything the editor, templates, and import/export operate on.

## Shape

```ts
interface ResumeData {
  personal: {
    fullName: string; // used for preview + export file names
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    linkedin: string;
    github: string;
  };
  summary: string; // free text
  experience: Array<{
    id: string; // stable unique id (createId)
    company: string;
    role: string;
    location: string;
    startDate: string; // free text, e.g. "Jan 2022"
    endDate: string; // "Present" is fine
    description: string; // multi-line; one bullet per line
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    link: string;
    description: string;
    technologies: string;
  }>;
  skills: Array<{
    id: string;
    category: string; // e.g. "Frontend"
    items: string; // comma-separated skills
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
  }>;
  languages: Array<{
    id: string;
    name: string;
    proficiency: string; // e.g. "Native"
  }>;
  interests: string; // comma-separated
}
```

Notes:

- Every list item carries an `id` used as the React `key`. `createId()`
  (`utils/id.ts`) generates them.
- Templates decide which sections they render; an empty array or empty string
  hides a section.
- `summary`, `description`, `skills.items`, and `interests` have lightweight
  text conventions (`\n` bullet lines and `,` lists) interpreted by
  `utils/text.ts` (`splitLines`, `splitComma`).

## Persistence

| Key               | Value              | Default          |
| ----------------- | ------------------ | ---------------- |
| `resume.data`     | JSON of ResumeData | `seedResumeData` |
| `resume.template` | template id        | `classic`        |
| `resume.paper`    | paper id           | `a4`             |

Managed by `useLocalStorage`, which tolerates missing/corrupt storage.

## Import / Export (Data tab)

`src/utils/io.ts` is the only module that serializes/parses resume files.

| Function              | Purpose                                            |
| --------------------- | -------------------------------------------------- |
| `serializeResumeJson` | `ResumeData` → pretty-printed JSON string          |
| `serializeResumeYaml` | `ResumeData` → YAML string (uses `yaml`)           |
| `parseResumeData`     | string → `ResumeData`, auto-detecting JSON vs YAML |
| `isResumeData`        | runtime shape validator (type guard)               |
| `resumeFileName`      | slugified `personal.fullName` (or `resume`)        |
| `downloadTextFile`    | Blob download helper                               |

Validation rules (`isResumeData`):

- Top level is a plain object.
- `personal` is a record of strings.
- `summary` and `interests` are strings.
- `experience`, `education`, `projects`, `skills`, `certifications`, `languages`
  are arrays of string-only records.

Anything else fails `parseResumeData` with a user-facing message, which
`DataPanel` surfaces as an inline alert. Exported files use the format
`<full-name-slug>.json` / `.yaml`; importing replaces the whole resume (after
parse validation).

## Paper sizes

`src/data/paper.ts` defines `A3 (297×420)`, `A4 (210×297)`, `A5 (148×210)`,
`A6 (105×148)`, `B5 (176×250)` in mm. `mmToPx` uses `96/25.4`; the sheet is
rendered at mm dimensions and CSS-transformed for preview.
