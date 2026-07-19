# Project working instructions

## Assessment boundaries

- This is a 1,500-word group report with a maximum of four figures and at least one permutation analysis. Follow `requirements/project-information.md` and `requirements/project-marking-rubric.md` as the source of truth.
- The assessment is AI Level 2. Use AI for ideas, planning, code explanation, and review. Do not put AI-generated prose into the final report or other assessed text; the student group must write and understand it.
- Use only statistical methods taught in the module unless the group can clearly justify an allowed alternative. Do not choose a method until the relevant course material has been checked.

## Data and analysis

- Keep `data/raw/ENNI/` immutable. Never overwrite or delete source transcripts. Store reproducible derived data in `data/processed/`.
- Do not place account credentials, session cookies, participant names, or birth dates in project files or outputs.
- Do not infer variables or silently repair missing or conflicting metadata. Record uncertainty and decisions in `research/decisions.md`.
- Prefer beginner-readable Python and visible calculations. NumPy, Pandas, and Matplotlib are allowed; explain any additional library in the project.
- Explain unfamiliar code and statistical choices to the student. Do not treat a result as valid only because code runs.

## Workflow

1. Read the assignment and rubric before changing the project.
2. Inspect the relevant data and course content before fixing the question, measure, or analysis.
3. Keep research notes clearly separate from assessed report text.
4. Do not overwrite existing work without inspecting it first.
