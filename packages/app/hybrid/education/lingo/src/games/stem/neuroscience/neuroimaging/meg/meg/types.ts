export interface DipoleParams {
  /** Source depth below the cortical surface, in cm */
  depthCm: number;
  /** Dipole orientation from the radial direction, in degrees */
  orientationDeg: number;
  /** Distance from the scalp surface to the sensors, in cm */
  sensorGapCm: number;
  /** Skull conductivity relative to brain (1 = transparent) */
  skullRatio: number;
  /** Sample rate in Hz */
  sampleRate: number;
}

export interface SensorPoint {
  /** Azimuth 0..360, elevation -90..90 */
  azimuth: number;
  elevation: number;
}

export interface FieldSample {
  sensor: SensorPoint;
  /** Magnetic field, arbitrary units (proportional to 1/r³) */
  magnetic: number;
  /** Electric potential, arbitrary units (proportional to 1/r²) */
  electric: number;
  /** Electric potential after skull volume conduction */
  volumeConducted: number;
}

export interface ForwardResult {
  samples: FieldSample[];
  peakMagnetic: number;
  peakElectric: number;
  peakVolumeConducted: number;
  /** Distance from the source to the nearest sensor, cm */
  minDistanceCm: number;
}
