use crate::models::NormalizedConcepts;

const STRUCTURAL_HINTS: &[&str] = &["t1", "t2", "flair", "mprage", "bravo", "spgr", "space"];
const DIFFUSION_HINTS: &[&str] = &["dwi", "dti", "diffusion", "adc", "trace", "b1000", "b2000"];
const FUNCTIONAL_HINTS: &[&str] = &["bold", "fmri", "rest", "task", "epi"];
const PERFUSION_HINTS: &[&str] = &["asl", "perfusion", "pwi"];
const CONTRASTS: &[(&str, &str)] = &[
  ("flair", "FLAIR"),
  ("t1", "T1"),
  ("t2", "T2"),
  ("dwi", "DWI"),
  ("adc", "ADC"),
  ("swi", "SWI"),
  ("tof", "TOF"),
  ("asl", "ASL"),
  ("fmri", "BOLD"),
  ("bold", "BOLD"),
];

/// Scanner-specific product names mapped onto canonical concepts.
/// Originals are always preserved; only the normalized view is mapped.
const ALIASES: &[(&str, &str, &str, &str)] = &[
  // (needle, contrast, family, dimensionality)
  ("mprage", "T1", "structural", "3D"),
  ("bravo", "T1", "structural", "3D"),
  ("ir-spgr", "T1", "structural", "3D"),
  ("fspgr", "T1", "structural", "3D"),
  ("tfe", "T1", "structural", "3D"),
  ("space", "T2", "structural", "3D"),
  ("cube", "T2", "structural", "3D"),
  ("vista", "T2", "structural", "3D"),
  ("epi", "BOLD", "functional", "4D"),
];

/// Infer canonical concepts from scanner naming. Inference is always marked
/// as such and never replaces original metadata.
pub fn normalize(modality: &str, description: &str) -> NormalizedConcepts {
  let haystack = format!("{modality} {description}").to_lowercase();
  if let Some((contrast, family, dimensionality)) = alias_of(&haystack) {
    return NormalizedConcepts {
      modality: modality_of(modality),
      contrast: Some(contrast.to_string()),
      sequence_family: Some(family.to_string()),
      dimensionality: Some(dimensionality.to_string()),
      inference: "inferred-from-naming".to_string(),
    };
  }
  NormalizedConcepts {
    modality: modality_of(modality),
    contrast: CONTRASTS
      .iter()
      .find(|(needle, _)| haystack.contains(needle))
      .map(|(_, label)| label.to_string()),
    sequence_family: family_of(&haystack),
    dimensionality: dimensionality_of(&haystack),
    inference: "inferred-from-naming".to_string(),
  }
}

fn modality_of(modality: &str) -> String {
  if modality.is_empty() {
    "UNKNOWN".to_string()
  } else {
    modality.to_uppercase()
  }
}

fn alias_of(haystack: &str) -> Option<(&'static str, &'static str, &'static str)> {
  ALIASES
    .iter()
    .find(|(needle, _, _, _)| haystack.contains(needle))
    .map(|(_, contrast, family, dimensionality)| (*contrast, *family, *dimensionality))
}

fn family_of(haystack: &str) -> Option<String> {
  if DIFFUSION_HINTS.iter().any(|hint| haystack.contains(hint)) {
    return Some("diffusion".to_string());
  }
  if FUNCTIONAL_HINTS.iter().any(|hint| haystack.contains(hint)) {
    return Some("functional".to_string());
  }
  if PERFUSION_HINTS.iter().any(|hint| haystack.contains(hint)) {
    return Some("perfusion".to_string());
  }
  if STRUCTURAL_HINTS.iter().any(|hint| haystack.contains(hint)) {
    return Some("structural".to_string());
  }
  None
}

fn dimensionality_of(haystack: &str) -> Option<String> {
  let volumetric = ["3d", "mprage", "bravo", "space"]
    .iter()
    .any(|hint| haystack.contains(hint));
  let temporal = FUNCTIONAL_HINTS
    .iter()
    .any(|hint| haystack.contains(hint));
  if temporal {
    Some("4D".to_string())
  } else if volumetric {
    Some("3D".to_string())
  } else {
    None
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn classifies_structural_t1() {
    let concepts = normalize("MR", "T1 MPRAGE SAG");
    assert_eq!(concepts.contrast.as_deref(), Some("T1"));
    assert_eq!(concepts.sequence_family.as_deref(), Some("structural"));
    assert_eq!(concepts.dimensionality.as_deref(), Some("3D"));
    assert_eq!(concepts.inference, "inferred-from-naming");
  }

  #[test]
  fn diffusion_wins_over_structural() {
    let concepts = normalize("MR", "AX DWI b1000");
    assert_eq!(concepts.sequence_family.as_deref(), Some("diffusion"));
    assert_eq!(concepts.contrast.as_deref(), Some("DWI"));
  }

  #[test]
  fn functional_is_4d() {
    let concepts = normalize("MR", "rs-fMRI REST EPI");
    assert_eq!(concepts.sequence_family.as_deref(), Some("functional"));
    assert_eq!(concepts.dimensionality.as_deref(), Some("4D"));
    assert_eq!(concepts.contrast.as_deref(), Some("BOLD"));
  }

  #[test]
  fn unknown_stays_unknown() {
    let concepts = normalize("", "Localizer");
    assert_eq!(concepts.modality, "UNKNOWN");
    assert!(concepts.contrast.is_none());
    assert!(concepts.sequence_family.is_none());
  }

  #[test]
  fn preserves_original_modality() {
    let concepts = normalize("mr", "ax t2");
    assert_eq!(concepts.modality, "MR");
    assert_eq!(concepts.contrast.as_deref(), Some("T2"));
  }

  #[test]
  fn scanner_aliases_normalize_to_canonical_concepts() {
    for name in ["MPRAGE", "BRAVO", "T1 BRAVO SAG"] {
      let concepts = normalize("MR", name);
      assert_eq!(concepts.contrast.as_deref(), Some("T1"), "{name}");
      assert_eq!(concepts.sequence_family.as_deref(), Some("structural"));
      assert_eq!(concepts.dimensionality.as_deref(), Some("3D"));
    }
    let space = normalize("MR", "SPACE STIR");
    assert_eq!(space.contrast.as_deref(), Some("T2"));
    assert_eq!(space.dimensionality.as_deref(), Some("3D"));
  }
}
