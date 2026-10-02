"""Keyword taxonomy and Markdown field mapping.

This module is the single definition of the label sets. Every build mirrors it
into the `category` and `category_keyword` tables, so the rules behind any label
stay queryable without a second copy drifting out of sync.
"""

from __future__ import annotations

import csv
import re

from db import DATA_DIR


SOURCE_DIR = DATA_DIR / "md" / "projects"

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
    "Language, reading & communication": r"\b(language|speech|reading|literacy|bilingual\w*|multilingual\w*|communication|psycholinguistic\w*|gesture|linguistic)\b|\b(development|acquisition|comprehension|prediction)\b.{0,50}\b(language|speech|linguistic)\b",
    "Memory & learning": r"\b(memory|remember\w*|reconsolidation|working memory|learning|eyewitness|recall)\b",
    "Mental health & wellbeing": r"\b(mental health|well.?being|happiness|stress|anxiety|depress\w*|psychological health)\b",
    "Motor control & action": r"\b(motor|movement|action planning|reaching|grip|gait|sequence planning|sensorimotor)\b",
    "Music, rhythm & auditory processing": r"\b(music|musician|rhythm|auditory|hearing|sound|synchroni[sz]ation)\b",
    "Neuroscience & brain imaging": r"\b(neuroscien\w*|brain|neural|neuronal|neuroimaging|fmri|fnirs|eeg|meg|mri|opm)\b",
    "Perception & sensory processing": r"\b(perception|perceptual|sensory|sensation|visual|vision|touch|tactile|haptic|multisensory|face processing)\b",
    "Personality & individual differences": r"\b(personality|individual differences|hexaco|big five|psychometric\w*|self.?belief\w*)\b",
    "Sleep & fatigue": r"\b(sleep|fatigue|first night effect|actigraphy|circadian)\b",
    "Social psychology & relationships": r"\b(social|empathy|relationship\w*|interpersonal|belonging|social presence|stigma|inequalit\w*)\b",
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
    "Software & tool development": r"\b(software|toolkit|programming|develop|graphical user interface|\bgui\b|reproducible pipeline)\b",
    "Literature review & evidence synthesis": r"\b(literature review|mining publications|evidence synthesis|research vault|systematic review|meta.?analysis)\b",
}

# Overlapping labels share one underlying preference so they cannot both count.
# Empty today: the overlapping language labels were merged into one category.
OVERLAP_FAMILIES: dict[str, set[str]] = {}

# Markdown headings used when classifying a project, in evidence order.
PROJECT_EVIDENCE_FIELDS = ("Project title", "Project summary", "Topic", "Methodology")

# Markdown heading -> project column. Left side is the source heading.
PROJECT_FIELD_MAP = {
    "Project ID": "source_code",
    "Project title": "title",
    "Project summary": "summary",
    "Topic": "topic",
    "Methodology": "methodology",
    "Project Type": "project_type",
    "Ethical approval status": "ethics_status",
    "Ethical approval": "ethics_note",
    "Supervisor": "supervisor_field",
    "relevant programmes": "programmes_raw",
    "Suggestions optional modules": "optional_modules",
    "Recommended Research Practical": "recommended_practical",
    "Recommended Data science module": "recommended_data_module",
    "Specific skills & requirement for project?": "skills_requirements",
    "Seed references": "seed_references",
    "comments": "comments",
}

PLACEHOLDERS = {"_not provided in the source csv._", "not provided", "n/a"}

# Focus text that reports a failed lookup rather than an actual research area.
UNVERIFIED_MARKERS = ("could not be verified", "no current", "not be verified")


def category_specs() -> list[tuple[str, str, str]]:
    """Return every label as (name, dimension, pattern).

    A list, not a dict: "Software & tool development" is a subject label and a
    method label at once, and a dict keyed by name would drop one of them.
    """
    specs = [(name, "subject", pattern) for name, pattern in SUBJECT_CATEGORIES.items()]
    specs += [(name, "method", pattern) for name, pattern in METHOD_CATEGORIES.items()]
    return specs


def labels_for(dimension: str) -> dict[str, str]:
    """Return the pattern map for one dimension."""
    source = SUBJECT_CATEGORIES if dimension == "subject" else METHOD_CATEGORIES
    return dict(source)


def category_names(dimension: str) -> list[str]:
    """Return every valid label name for one dimension, for error messages."""
    return [name for name, spec_dimension, _ in category_specs() if spec_dimension == dimension]


def category_family(category: str) -> str:
    """Return the overlap family that owns a label."""
    return next((name for name, labels in OVERLAP_FAMILIES.items() if category in labels), category)


def family_labels(category: str) -> set[str]:
    """Return every label treated as the same underlying preference."""
    return next((labels for name, labels in OVERLAP_FAMILIES.items() if category in labels), {category})


def classify(text: str, labels: dict[str, str]) -> dict[str, str]:
    """Map labels to the first phrase in the text that triggered them."""
    return {label: match.group(0) for label, pattern in labels.items()
            if (match := re.search(pattern, text, re.IGNORECASE))}


def parse_project(path: Path) -> dict[str, str]:
    """Read Markdown `##` sections into a heading-to-body mapping."""
    text = path.read_text(encoding="utf-8")
    headings = list(re.finditer(r"^## (.+?)\s*$", text, re.MULTILINE))
    fields = {
        match.group(1).strip(): text[match.end():headings[index + 1].start()
                                     if index + 1 < len(headings) else len(text)].strip()
        for index, match in enumerate(headings)
    }
    if "Project ID" not in fields or "Project title" not in fields:
        raise ValueError(f"Missing project identifier or title in {path}")
    return fields


def source_value(fields: dict[str, str], heading: str) -> str:
    """Treat explicit source placeholders as missing data, not content."""
    value = fields.get(heading, "").strip()
    return "" if value.casefold() in PLACEHOLDERS else value


def supervisor_names(value: str) -> list[str]:
    """Split a supervisor field into names, dropping source ranking suffixes."""
    names = [re.sub(r"\s*-\s*\d+\s*$", "", name).strip() for name in value.split(",")]
    return [name for name in names if name]


def split_programmes(value: str) -> list[str]:
    """Split the programme list into names, honouring quoted names with commas.

    Source values look like `MSc Psychology,"MSc Philosophy, Mental Health and
    Psychology"`, so a plain comma split would break the quoted name in half.
    """
    if not value.strip():
        return []
    return [name.strip() for name in next(csv.reader([value], skipinitialspace=True)) if name.strip()]
