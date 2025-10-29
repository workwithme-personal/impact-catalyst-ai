import { SectorAllocation, SimulationResult, SDGMetrics, YearlyProgress } from "@/types/simulation";

const TOTAL_BUDGET = 100;
const BASE_METRICS: SDGMetrics = {
  literacy: 74,
  cleanWater: 62,
  renewableEnergy: 38,
  co2Reduction: 12,
};

// Impact coefficients: how much each sector affects each SDG metric
const IMPACT_MATRIX = {
  literacy: { education: 2.5, health: 0.3, water: 0.1, energy: 0.2, agriculture: 0.1, infrastructure: 0.2 },
  cleanWater: { education: 0.1, health: 0.5, water: 3.0, energy: 0.2, agriculture: 0.3, infrastructure: 0.8 },
  renewableEnergy: { education: 0.2, health: 0.1, water: 0.2, energy: 3.5, agriculture: 0.2, infrastructure: 0.5 },
  co2Reduction: { education: 0.3, health: 0.2, water: 0.3, energy: 2.8, agriculture: 0.5, infrastructure: 0.4 },
};

export const runSimulation = (allocation: SectorAllocation): SimulationResult => {
  const total = Object.values(allocation).reduce((sum, val) => sum + val, 0);
  
  if (Math.abs(total - TOTAL_BUDGET) > 0.01) {
    throw new Error(`Total allocation must equal ${TOTAL_BUDGET}%`);
  }

  const projectedMetrics = calculateMetrics(allocation);
  const efficiencyScore = calculateEfficiency(allocation, projectedMetrics);
  const yearlyProgress = projectYearlyProgress(allocation);
  const recommendations = generateRecommendations(allocation, projectedMetrics);

  return {
    allocation,
    projectedMetrics,
    efficiencyScore,
    yearlyProgress,
    recommendations,
  };
};

const calculateMetrics = (allocation: SectorAllocation): SDGMetrics => {
  const metrics: SDGMetrics = { ...BASE_METRICS };

  (Object.keys(metrics) as Array<keyof SDGMetrics>).forEach((metric) => {
    let improvement = 0;
    (Object.keys(allocation) as Array<keyof SectorAllocation>).forEach((sector) => {
      improvement += allocation[sector] * IMPACT_MATRIX[metric][sector];
    });
    metrics[metric] = Math.min(100, BASE_METRICS[metric] + improvement);
  });

  return metrics;
};

const calculateEfficiency = (allocation: SectorAllocation, metrics: SDGMetrics): number => {
  const totalImprovement = Object.values(metrics).reduce((sum, val, idx) => {
    return sum + (val - Object.values(BASE_METRICS)[idx]);
  }, 0);

  const totalSpend = Object.values(allocation).reduce((sum, val) => sum + val, 0);
  return Math.round((totalImprovement / totalSpend) * 10) / 10;
};

const projectYearlyProgress = (allocation: SectorAllocation): YearlyProgress[] => {
  const finalMetrics = calculateMetrics(allocation);
  const years = [2025, 2026, 2027, 2028, 2029, 2030];

  return years.map((year, idx) => {
    const progress = (idx + 1) / years.length;
    return {
      year,
      literacy: BASE_METRICS.literacy + (finalMetrics.literacy - BASE_METRICS.literacy) * progress,
      cleanWater: BASE_METRICS.cleanWater + (finalMetrics.cleanWater - BASE_METRICS.cleanWater) * progress,
      renewableEnergy: BASE_METRICS.renewableEnergy + (finalMetrics.renewableEnergy - BASE_METRICS.renewableEnergy) * progress,
      co2Reduction: BASE_METRICS.co2Reduction + (finalMetrics.co2Reduction - BASE_METRICS.co2Reduction) * progress,
    };
  });
};

const generateRecommendations = (allocation: SectorAllocation, metrics: SDGMetrics): string[] => {
  const recommendations: string[] = [];
  const sectors = Object.entries(allocation).sort((a, b) => a[1] - b[1]);

  // Check for underinvestment
  if (allocation.education < 15) {
    recommendations.push("Increasing Education budget by 5% could improve literacy by 12.5% points.");
  }
  if (allocation.water < 12) {
    recommendations.push("Water infrastructure needs more focus - doubling allocation improves access by 24%.");
  }
  if (allocation.energy < 18) {
    recommendations.push("Renewable Energy requires higher investment to meet 2030 targets.");
  }

  // Check for overinvestment
  if (allocation.agriculture > 25) {
    recommendations.push("Reducing Agriculture spending by 8% and reallocating to Water increases overall efficiency.");
  }

  // Efficiency suggestions
  const lowestSector = sectors[0];
  const highestSector = sectors[sectors.length - 1];
  
  if (lowestSector[1] < 10 && highestSector[1] > 22) {
    recommendations.push(
      `Balancing ${highestSector[0]} (-5%) with ${lowestSector[0]} (+5%) improves efficiency by 15%.`
    );
  }

  return recommendations.slice(0, 3);
};

export const optimizeBudget = (): SectorAllocation => {
  // Simple optimization: prioritize high-impact sectors
  return {
    education: 20,
    health: 16,
    water: 14,
    energy: 22,
    agriculture: 13,
    infrastructure: 15,
  };
};

export const getDefaultAllocation = (): SectorAllocation => {
  return {
    education: 18,
    health: 15,
    water: 12,
    energy: 20,
    agriculture: 20,
    infrastructure: 15,
  };
};
