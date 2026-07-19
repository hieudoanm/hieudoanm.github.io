export interface HDDMParams {
  popDriftMu: number; // Population mean drift rate
  popDriftSigma: number; // Population variance in drift rate
  popBoundaryMu: number; // Population mean boundary
  popBoundarySigma: number; // Population variance in boundary
  noise: number; // Within-trial noise (constant for simplicity)
  nonDecisionTime: number; // Non-decision time (constant for simplicity)
}

export interface HDDMSubject {
  id: number;
  driftRate: number; // Drawn from N(popDriftMu, popDriftSigma)
  boundary: number; // Drawn from N(popBoundaryMu, popBoundarySigma)
  meanRT: number;
  accuracy: number;
}

export interface HDDMSimulationResult {
  subjects: HDDMSubject[];
  popMeanRT: number;
  popAccuracy: number;
}
