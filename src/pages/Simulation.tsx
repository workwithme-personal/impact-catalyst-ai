import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BudgetSlider } from "@/components/BudgetSlider";
import { AllocationChart } from "@/components/AllocationChart";
import { SDGProgressChart } from "@/components/SDGProgressChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { SectorAllocation, SimulationResult } from "@/types/simulation";
import { runSimulation, optimizeBudget, getDefaultAllocation } from "@/utils/simulationEngine";
import { saveScenario, generateScenarioId } from "@/utils/scenarioStorage";
import { Play, Zap, Save, RotateCcw, AlertCircle, TrendingUp } from "lucide-react";

const Simulation = () => {
  const [allocation, setAllocation] = useState<SectorAllocation>(getDefaultAllocation());
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [scenarioName, setScenarioName] = useState("");
  const { toast } = useToast();

  const totalBudget = Object.values(allocation).reduce((sum, val) => sum + val, 0);
  const isValidBudget = Math.abs(totalBudget - 100) < 0.1;

  const handleSliderChange = (sector: keyof SectorAllocation, value: number) => {
    setAllocation((prev) => ({ ...prev, [sector]: value }));
  };

  const handleRunSimulation = () => {
    if (!isValidBudget) {
      toast({
        title: "Invalid Budget",
        description: "Total allocation must equal 100%",
        variant: "destructive",
      });
      return;
    }

    const simulationResult = runSimulation(allocation);
    setResult(simulationResult);
    
    toast({
      title: "Simulation Complete",
      description: `Efficiency Score: ${simulationResult.efficiencyScore}`,
    });
  };

  const handleOptimize = () => {
    const optimized = optimizeBudget();
    setAllocation(optimized);
    
    toast({
      title: "Budget Optimized",
      description: "Allocation adjusted for maximum impact",
    });
  };

  const handleReset = () => {
    setAllocation(getDefaultAllocation());
    setResult(null);
    
    toast({
      title: "Reset Complete",
      description: "Budget allocation reset to default",
    });
  };

  const handleSave = () => {
    if (!result) {
      toast({
        title: "No Simulation Data",
        description: "Run a simulation before saving",
        variant: "destructive",
      });
      return;
    }

    const name = scenarioName || `Scenario ${new Date().toLocaleDateString()}`;
    saveScenario({
      id: generateScenarioId(),
      name,
      date: new Date().toISOString(),
      allocation,
      efficiencyScore: result.efficiencyScore,
      projectedMetrics: result.projectedMetrics,
    });

    toast({
      title: "Scenario Saved",
      description: `"${name}" has been saved successfully`,
    });

    setScenarioName("");
  };

  return (
    <div className="min-h-screen bg-gradient-data">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Budget Simulation</h1>
          <p className="text-muted-foreground">
            Allocate budget across sectors to simulate SDG impact by 2030
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Budget Allocation Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-elevated border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-primary">Budget Allocation</h2>
                <span className={`text-2xl font-bold ${isValidBudget ? 'text-success' : 'text-destructive'}`}>
                  {totalBudget.toFixed(0)}%
                </span>
              </div>

              {!isValidBudget && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive rounded-md mb-4">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <span className="text-sm text-destructive">Total must equal 100%</span>
                </div>
              )}

              <div className="space-y-6 mb-6">
                <BudgetSlider
                  label="Education"
                  value={allocation.education}
                  onChange={(val) => handleSliderChange("education", val)}
                />
                <BudgetSlider
                  label="Health"
                  value={allocation.health}
                  onChange={(val) => handleSliderChange("health", val)}
                />
                <BudgetSlider
                  label="Water"
                  value={allocation.water}
                  onChange={(val) => handleSliderChange("water", val)}
                />
                <BudgetSlider
                  label="Energy"
                  value={allocation.energy}
                  onChange={(val) => handleSliderChange("energy", val)}
                />
                <BudgetSlider
                  label="Agriculture"
                  value={allocation.agriculture}
                  onChange={(val) => handleSliderChange("agriculture", val)}
                />
                <BudgetSlider
                  label="Infrastructure"
                  value={allocation.infrastructure}
                  onChange={(val) => handleSliderChange("infrastructure", val)}
                />
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleRunSimulation}
                  disabled={!isValidBudget}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Run Simulation
                </Button>
                <Button
                  onClick={handleOptimize}
                  variant="outline"
                  className="w-full border-accent text-accent hover:bg-accent/10"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Optimize Budget
                </Button>
                <Button onClick={handleReset} variant="outline" className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {result ? (
              <>
                <Card className="p-6 shadow-elevated border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-primary">Efficiency Score</h2>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-success" />
                      <span className="text-3xl font-bold text-success">
                        {result.efficiencyScore}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This score represents the overall efficiency of your budget allocation in achieving SDG targets.
                  </p>
                </Card>

                <Card className="p-6 shadow-elevated border-border">
                  <h2 className="text-xl font-semibold text-primary mb-4">Budget Distribution</h2>
                  <AllocationChart allocation={allocation} />
                </Card>

                <Card className="p-6 shadow-elevated border-border">
                  <h2 className="text-xl font-semibold text-primary mb-4">5-Year SDG Projection (2025-2030)</h2>
                  <SDGProgressChart data={result.yearlyProgress} />
                </Card>

                <Card className="p-6 shadow-elevated border-border">
                  <h2 className="text-xl font-semibold text-primary mb-4">AI Recommendations</h2>
                  <div className="space-y-3">
                    {result.recommendations.map((rec, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-accent/10 border border-accent/20 rounded-lg text-sm text-foreground"
                      >
                        {rec}
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 shadow-elevated border-border">
                  <h2 className="text-xl font-semibold text-primary mb-4">Save Scenario</h2>
                  <div className="flex gap-3">
                    <Input
                      placeholder="Scenario name (optional)"
                      value={scenarioName}
                      onChange={(e) => setScenarioName(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-12 shadow-card border-border text-center">
                <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  No Simulation Results
                </h3>
                <p className="text-muted-foreground">
                  Adjust budget allocation and click "Run Simulation" to see projected SDG impacts
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
