/** A single anatomical structure in the atlas tree. */
export interface BrainRegion {
  /** Stable kebab-case identifier, unique across the atlas. */
  id: string;
  /** Display name, matching the source outline. */
  name: string;
  /** Parent region id, or null for one of the four brain divisions. */
  parentId: string | null;
  /**
   * How far the structure sits below the cortical surface, from 0 (outermost)
   * to 1 (posterior fossa and brainstem). Drives the depth slider.
   */
  depth: number;
  /** What the structure is. */
  summary: string;
  /** What it does. */
  function: string;
  /** Why it matters — clinical, experimental, or computational. */
  note: string;
  /**
   * Schematic lateral-view hotspot in normalised canvas units. Present only for
   * structures with a distinct position on the brain's outer silhouette; deep
   * nuclei are reached through the outline list instead.
   */
  anchor?: { x: number; y: number };
  /** A related page elsewhere in this app, surfaced as a cross-link. */
  seeAlso?: { href: string; label: string };
}
