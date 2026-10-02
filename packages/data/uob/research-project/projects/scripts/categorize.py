"""Build a multi-label category file from the Markdown source projects."""

from __future__ import annotations

import csv
import re
from pathlib import Path


PROJECTS_DIR = Path(__file__).parent.parent
CSV_DIR = PROJECTS_DIR / "csv"
SOURCE_DIR = PROJECTS_DIR / "md" / "projects"
OUTPUT = CSV_DIR / "projects_categories.csv"

SUBJECT_CATEGORIES = {
    "AI, machine learning & data science": r"\b(ai|genai|artificial intelligence|machine learning|deep learning|data science|large language model|neural network)\b",
    "Ageing & lifespan": r"\b(ageing|aging|older adults?|lifespan|age-related|dementia)\b",
    "Autism, neurodiversity & disability": r"\b(autis\w*|neurodiver\w*|dyslex\w*|neurogenetic|intellectual disabilit\w*|adhd)\b",
    "Child & developmental psychology": r"\b(child\w*|children|toddler\w*|adolescen\w*|developmental|preterm|young people)\b",
    "Cognition, attention & decision-making": r"\b(cogniti\w*|attention|decision.?making|decision making|choice|critical thinking|reasoning|executive function)\b",
    "Education & higher education": r"\b(education|higher education|university|student experience|school\w*|classroom|learning resource)\b",
    "Effort, motivation & self-control": r"\b(effort|motivation|self.?control|fatigue|persistence|goal pursuit)\b",
    "Food, appetite & nutrition": r"\b(appetite|food intake|nutrition|diet|eating behavio\w*)\b",
    "Health, clinical & rehabilitation": r"\b(health|clinical|rehabilitation|stroke|neurological disease|psychopath\w*|peripheral neuropathy|healthcare)\b",
    "Language, reading & communication": r"\b(language|speech|reading|literacy|bilingual\w*|multilingual\w*|communication|psycholinguistic\w*|gesture)\b",
    "Language development": r"\b(language|speech|linguistic|bilingual\w*|multilingual\w*)\b.{0,50}\b(development|acquisition|comprehension|prediction)\b|\b(development|acquisition)\b.{0,50}\b(language|speech|linguistic)\b",
    "Memory & learning": r"\b(memory|remember\w*|reconsolidation|working memory|learning|eyewitness|recall)\b",
    "Mental health & wellbeing": r"\b(mental health|well.?being|happiness|stress|anxiety|depress\w*|psychological health)\b",
    "Motor control & action": r"\b(motor|movement|action planning|reaching|grip|gait|sequence planning|sensorimotor)\b",
    "Music, rhythm & auditory processing": r"\b(music|musician|rhythm|auditory|hearing|sound|synchroni[sz]ation)\b",
    "Neuroscience & brain imaging": r"\b(neuroscien\w*|brain|neural|neuronal|neuroimaging|fmri|fnirs|eeg|meg|mri|opm)\b",
    "Perception & sensory processing": r"\b(perception|perceptual|sensory|sensation|visual|vision|touch|tactile|haptic|multisensory|face processing)\b",
    "Personality & individual differences": r"\b(personality|individual differences|hexaco|big five|psychometric\w*|self.?belief\w*)\b",
    "Sleep & fatigue": r"\b(sleep|fatigue|first night effect|actigraphy|circadian)\b",
    "Social psychology & relationships": r"\b(social|empathy|relationship\w*|interpersonal|belonging|social presence|stigma|inequalit\w*)\b",
    "Software & tool development": r"\b(software|toolkit|programming|develop)\b",
    "Virtual reality & human-computer interaction": r"\b(virtual reality|\bvr\b|extended reality|\bxr\b|human.?computer interaction|embodied interaction|virtual hand\w*|immersive)\b",
}

METHOD_CATEGORIES = {
    "Behavioural & experimental methods": r"\b(experiment\w*|behavio\w*|psychophysic\w*|testing|reaction time|task-based)\b",
    "Computational modelling": r"\b(computational|modeling|modelling|simulation|diffusion model|multilevel model)\b",
    "Eye tracking": r"\b(eye.?tracking|eye movements?|eyetracking)\b",
    "Longitudinal & observational research": r"\b(longitudinal|cross.?sectional|observational|repeated measures|pre.?post)\b",
    "Neuroimaging & electrophysiology": r"\b(eeg|meg|mri|fmri|fnirs|opm.?meg|electrophysiolog\w*|brain stimulation|actigraphy)\b",
    "Qualitative interviews & focus groups": r"\b(qualitative|interviews?|focus groups?|thematic analysis|discourse analysis|phenomenological|lived experience)\b",
    "Questionnaires & surveys": r"\b(questionnaires?|surveys?|self.?report|psychometric scale|rating scale)\b",
    "Secondary data analysis": r"\b(secondary data|existing data|pre.?existing dataset|existing dataset|archived data|previously collected)\b",
    "Software & tool development": r"\b(software development|toolkit|graphical user interface|\bgui\b|programming|develop an? (ai.?assisted )?tool|reproducible pipeline)\b",
    "Literature review & evidence synthesis": r"\b(literature review|mining publications|evidence synthesis|research vault|systematic review|meta.?analysis)\b",
}


def parse_project(path: Path) -> dict[str, str]:
    """Read Markdown `##` sections into a project field mapping."""
    text = path.read_text(encoding="utf-8")
    headings = list(re.finditer(r"^## (.+?)\s*$", text, re.MULTILINE))
    fields = {
        match.group(1).strip(): text[match.end():headings[index + 1].start() if index + 1 < len(headings) else len(text)].strip()
        for index, match in enumerate(headings)
    }
    if "Project ID" not in fields or "Project title" not in fields:
        raise ValueError(f"Missing project identifier or title in {path}")
    return fields


def categories_for(fields: dict[str, str]) -> tuple[list[str], list[str]]:
    """Find matching subject categories and methods separately."""
    evidence = " ".join(fields.get(name, "") for name in (
        "Project title", "Project summary", "Topic", "Methodology"
    )).casefold()
    subject_matches = [category for category, pattern in SUBJECT_CATEGORIES.items() if re.search(pattern, evidence, re.IGNORECASE)]
    method_matches = [category for category, pattern in METHOD_CATEGORIES.items() if re.search(pattern, evidence, re.IGNORECASE)]
    return subject_matches, method_matches


def category_evidence_for(fields: dict[str, str]) -> tuple[list[str], list[str]]:
    """Return the source phrase that triggered each inferred category and method."""
    evidence = " ".join(fields.get(name, "") for name in (
        "Project title", "Project summary", "Topic", "Methodology"
    ))
    subject_evidence = [
        f"{category}: {match.group(0)}"
        for category, pattern in SUBJECT_CATEGORIES.items()
        if (match := re.search(pattern, evidence, re.IGNORECASE))
    ]
    method_evidence = [
        f"{category}: {match.group(0)}"
        for category, pattern in METHOD_CATEGORIES.items()
        if (match := re.search(pattern, evidence, re.IGNORECASE))
    ]
    return subject_evidence, method_evidence


def clean_supervisor_names(value: str) -> str:
    """Drop source ranking suffixes while retaining co-supervisor names."""
    names = [re.sub(r"\s*-\s*\d+\s*$", "", name).strip() for name in value.split(",")]
    return ";".join(name for name in names if name)


def source_value(fields: dict[str, str], name: str) -> str:
    """Treat explicit source placeholders as missing data, not content."""
    value = fields.get(name, "").strip()
    placeholders = {"_not provided in the source csv._", "not provided", "n/a"}
    return "" if value.casefold() in placeholders else value


def project_rows(paths: list[Path]) -> list[dict[str, str]]:
    """Create concise one-row-per-project records with multi-label categories and methods."""
    rows = []
    for path in paths:
        fields = parse_project(path)
        subject_labels, method_labels = categories_for(fields)
        subject_evidence, method_evidence = category_evidence_for(fields)
        rows.append({
            "Project ID": source_value(fields, "Project ID"),
            "Project title": source_value(fields, "Project title"),
            "Supervisor": clean_supervisor_names(source_value(fields, "Supervisor")),
            "relevant programmes": source_value(fields, "relevant programmes"),
            "Project Type": source_value(fields, "Project Type"),
            "Ethical approval status": source_value(fields, "Ethical approval status"),
            "Topic": source_value(fields, "Topic"),
            "Methodology": source_value(fields, "Methodology"),
            "Skills & requirements": source_value(fields, "Specific skills & requirement for project?"),
            "Recommended practical": source_value(fields, "Recommended Research Practical"),
            "Recommended data science module": source_value(fields, "Recommended Data science module"),
            "Optional modules": source_value(fields, "Suggestions optional modules"),
            "Categories": ";".join(subject_labels),
            "Methods": ";".join(method_labels),
            "Category evidence": ";".join(subject_evidence),
            "Method evidence": ";".join(method_evidence),
            "Category count": str(len(subject_labels)),
            "Method count": str(len(method_labels)),
            "Category review": "review_inferred_labels" if subject_labels else "no_keyword_match_review_required",
            "Source file": path.name,
        })
    return rows


def write_categories(rows: list[dict[str, str]], path: Path = OUTPUT) -> None:
    """Write the categorized project records as UTF-8 CSV."""
    with path.open("w", newline="", encoding="utf-8") as output:
        writer = csv.DictWriter(output, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    """Generate projects_categories.csv from every raw project Markdown file."""
    paths = sorted(SOURCE_DIR.glob("project-*.md"))
    if not paths:
        raise FileNotFoundError(f"No project Markdown files found in {SOURCE_DIR}")
    rows = project_rows(paths)
    write_categories(rows)
    print(f"Categorized {len(rows)} projects into {OUTPUT}")


if __name__ == "__main__":
    main()
