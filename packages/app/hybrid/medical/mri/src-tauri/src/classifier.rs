use crate::models::SequenceCandidate;

/// Input facts used for classification. All fields are optional knowledge;
/// missing values simply disable the corresponding rules.
#[derive(Debug, Clone, Default)]
pub struct ClassifyInput {
  pub modality: String,
  pub description: String,
  pub tr_ms: f64,
  pub te_ms: f64,
  pub flip_angle: f64,
}

const KEYWORD_RULES: &[(&str, &str, f32)] = &[
  ("t1 mapping", "T1 mapping", 0.95),
  ("t1 map", "T1 mapping", 0.9),
  ("t2 mapping", "T2 mapping", 0.95),
  ("t2 map", "T2 mapping", 0.9),
  ("t2* mapping", "T2* mapping", 0.95),
  ("t2star map", "T2* mapping", 0.9),
  ("t2* map", "T2* mapping", 0.9),
  ("mp2rage", "T1 mapping", 0.85),
  ("vfa", "T1 mapping", 0.7),
  ("spectroscopy", "spectroscopy", 0.9),
  ("svs", "spectroscopy", 0.8),
  ("perfusion", "perfusion", 0.85),
  ("dsc", "perfusion", 0.75),
  ("dce", "perfusion", 0.75),
  ("pwi", "perfusion", 0.8),
  ("susceptibility", "SWI", 0.85),
  ("swi", "SWI", 0.9),
  ("qsm", "qSM", 0.9),
  ("dixon", "Dixon", 0.9),
  ("angiography", "TOF", 0.7),
  ("tof", "TOF", 0.9),
  ("mra", "TOF", 0.6),
  ("tensor", "DTI", 0.8),
  ("dti", "DTI", 0.9),
  ("apparent", "ADC", 0.85),
  ("adc", "ADC", 0.9),
  ("diffusion", "DWI", 0.8),
  ("b1000", "DWI", 0.85),
  ("b2000", "DWI", 0.85),
  ("trace", "DWI", 0.7),
  ("dwi", "DWI", 0.9),
  ("flair", "FLAIR", 0.95),
  ("mprage", "T1", 0.9),
  ("bravo", "T1", 0.85),
  ("ir-spgr", "T1", 0.85),
  ("fspgr", "T1", 0.8),
  ("spin labeling", "ASL", 0.85),
  ("asl", "ASL", 0.9),
  ("bold", "BOLD", 0.9),
  ("fmri", "BOLD", 0.85),
  ("rest", "BOLD", 0.6),
  ("task", "BOLD", 0.55),
  ("flash", "GRE", 0.7),
  ("gre", "GRE", 0.8),
  ("t2*", "T2*", 0.8),
  ("t1", "T1", 0.9),
  ("t2", "T2", 0.9),
];

/// Rule-based MRI sequence classification. Keyword matches carry high
/// confidence; timing heuristics carry medium confidence. Every candidate
/// exposes its confidence so the UI can mark results as inferred.
pub fn classify(input: &ClassifyInput) -> Vec<SequenceCandidate> {
  if !input.modality.eq_ignore_ascii_case("MR") && !input.modality.is_empty() {
    return Vec::new();
  }
  let haystack = input.description.to_lowercase();
  let mut candidates: Vec<SequenceCandidate> = Vec::new();
  collect_keyword_candidates(&haystack, &mut candidates);
  let mut timing: Vec<SequenceCandidate> = Vec::new();
  collect_timing_candidates(input, &candidates, &mut timing);
  candidates.extend(timing);
  merge_and_sort(&mut candidates);
  candidates.truncate(5);
  candidates
}

fn collect_keyword_candidates(haystack: &str, out: &mut Vec<SequenceCandidate>) {
  for (needle, sequence, confidence) in KEYWORD_RULES {
    if haystack.contains(needle) {
      out.push(SequenceCandidate {
        sequence: (*sequence).to_string(),
        confidence: *confidence,
        evidence: vec![format!("description contains \"{needle}\"")],
      });
    }
  }
}

fn collect_timing_candidates(
  input: &ClassifyInput,
  existing: &[SequenceCandidate],
  out: &mut Vec<SequenceCandidate>,
) {
  let has = |name: &str| existing.iter().any(|c| c.sequence == name);
  if input.tr_ms > 0.0 && input.te_ms > 0.0 {
    if input.tr_ms <= 800.0 && input.te_ms <= 30.0 && !has("T1") {
      out.push(candidate(
        "T1",
        0.65,
        format!("short TR {:.0}ms / TE {:.0}ms", input.tr_ms, input.te_ms),
      ));
    }
    if input.tr_ms >= 2000.0 && input.te_ms >= 60.0 && !has("T2") {
      out.push(candidate(
        "T2",
        0.6,
        format!("long TR {:.0}ms / TE {:.0}ms", input.tr_ms, input.te_ms),
      ));
    }
  }
  if input.flip_angle > 0.0
    && input.flip_angle <= 20.0
    && input.tr_ms > 0.0
    && input.tr_ms <= 100.0
    && !has("GRE")
  {
    out.push(candidate(
      "GRE",
      0.55,
      format!("low flip angle {:.0}° with short TR", input.flip_angle),
    ));
  }
}

fn candidate(sequence: &str, confidence: f32, evidence: String) -> SequenceCandidate {
  SequenceCandidate {
    sequence: sequence.to_string(),
    confidence,
    evidence: vec![evidence],
  }
}

/// Keep the highest-confidence candidate per sequence, merging evidence.
fn merge_and_sort(candidates: &mut Vec<SequenceCandidate>) {
  candidates.sort_by(|a, b| b.confidence.total_cmp(&a.confidence));
  let mut merged: Vec<SequenceCandidate> = Vec::new();
  for item in candidates.drain(..) {
    match merged.iter_mut().find(|m| m.sequence == item.sequence) {
      Some(existing) => existing.evidence.extend(item.evidence),
      None => merged.push(item),
    }
  }
  *candidates = merged;
}

#[cfg(test)]
mod tests {
  use super::*;

  fn input(description: &str, tr: f64, te: f64) -> ClassifyInput {
    ClassifyInput {
      modality: "MR".to_string(),
      description: description.to_string(),
      tr_ms: tr,
      te_ms: te,
      flip_angle: 0.0,
    }
  }

  #[test]
  fn keyword_match_carries_high_confidence() {
    let result = classify(&input("AX FLAIR TSE", 0.0, 0.0));
    assert_eq!(result[0].sequence, "FLAIR");
    assert!(result[0].confidence >= 0.9);
    assert!(!result[0].evidence.is_empty());
  }

  #[test]
  fn scanner_aliases_map_to_canonical_t1() {
    for name in ["MPRAGE", "BRAVO", "IR-SPGR"] {
      let result = classify(&input(name, 0.0, 0.0));
      assert_eq!(result[0].sequence, "T1", "{name}");
    }
  }

  #[test]
  fn timing_rules_infer_t1_with_medium_confidence() {
    let result = classify(&input("3D volume", 600.0, 20.0));
    let t1 = result.iter().find(|c| c.sequence == "T1").unwrap();
    assert!((t1.confidence - 0.65).abs() < 1e-6);
  }

  #[test]
  fn timing_rules_do_not_override_keywords() {
    let result = classify(&input("T2 TSE", 3000.0, 90.0));
    let t2 = result.iter().find(|c| c.sequence == "T2").unwrap();
    assert!(t2.confidence >= 0.9);
    assert_eq!(result.len(), 1);
  }

  #[test]
  fn non_mr_modalities_are_not_classified() {
    let ct = ClassifyInput {
      modality: "CT".to_string(),
      description: "volume".to_string(),
      tr_ms: 600.0,
      te_ms: 20.0,
      flip_angle: 0.0,
    };
    assert!(classify(&ct).is_empty());
  }

  #[test]
  fn empty_input_yields_no_candidates() {
    assert!(classify(&input("", 0.0, 0.0)).is_empty());
  }

  #[test]
  fn candidates_are_sorted_by_confidence() {
    let result = classify(&input("T1 mapping MPRAGE", 600.0, 20.0));
    assert_eq!(result[0].sequence, "T1 mapping");
    assert!(result[0].confidence >= result[1].confidence);
  }
}
