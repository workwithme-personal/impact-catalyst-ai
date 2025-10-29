import { SavedScenario } from "@/types/simulation";

const STORAGE_KEY = "sdg_sim_scenarios";

export const saveScenario = (scenario: SavedScenario): void => {
  const scenarios = getScenarios();
  scenarios.push(scenario);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
};

export const getScenarios = (): SavedScenario[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const deleteScenario = (id: string): void => {
  const scenarios = getScenarios().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
};

export const generateScenarioId = (): string => {
  return `scenario_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
