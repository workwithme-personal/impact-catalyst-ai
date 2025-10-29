export interface SectorAllocation {
  education: number;
  health: number;
  water: number;
  energy: number;
  agriculture: number;
  infrastructure: number;
}

export interface SDGMetrics {
  literacy: number;
  cleanWater: number;
  renewableEnergy: number;
  co2Reduction: number;
}

export interface SimulationResult {
  allocation: SectorAllocation;
  projectedMetrics: SDGMetrics;
  efficiencyScore: number;
  yearlyProgress: YearlyProgress[];
  recommendations: string[];
}

export interface YearlyProgress {
  year: number;
  literacy: number;
  cleanWater: number;
  renewableEnergy: number;
  co2Reduction: number;
}

export interface SavedScenario {
  id: string;
  name: string;
  date: string;
  allocation: SectorAllocation;
  efficiencyScore: number;
  projectedMetrics: SDGMetrics;
}
