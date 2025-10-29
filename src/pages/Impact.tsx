import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { SavedScenario } from "@/types/simulation";
import { getScenarios, deleteScenario } from "@/utils/scenarioStorage";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Impact = () => {
  const [scenarios, setScenarios] = useState<SavedScenario[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setScenarios(getScenarios());
  }, []);

  const handleDelete = (id: string) => {
    deleteScenario(id);
    setScenarios(getScenarios());
    
    toast({
      title: "Scenario Deleted",
      description: "The scenario has been removed",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-data">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Saved Scenarios</h1>
          <p className="text-muted-foreground">
            Review and compare your saved budget simulation scenarios
          </p>
        </div>

        {scenarios.length === 0 ? (
          <Card className="p-12 text-center shadow-card border-border">
            <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              No Saved Scenarios
            </h3>
            <p className="text-muted-foreground">
              Run simulations and save them to track different budget allocation strategies
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario) => (
              <Card
                key={scenario.id}
                className="p-6 shadow-card hover:shadow-elevated transition-all duration-300 border-border"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-primary">{scenario.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(scenario.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(scenario.date).toLocaleDateString()}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-primary/10 rounded-lg">
                    <span className="text-sm font-medium text-primary">Efficiency Score</span>
                    <span className="text-xl font-bold text-primary">
                      {scenario.efficiencyScore}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Projected Metrics</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-secondary rounded">
                        <p className="text-muted-foreground">Literacy</p>
                        <p className="font-semibold text-foreground">
                          {scenario.projectedMetrics.literacy.toFixed(1)}%
                        </p>
                      </div>
                      <div className="p-2 bg-secondary rounded">
                        <p className="text-muted-foreground">Clean Water</p>
                        <p className="font-semibold text-foreground">
                          {scenario.projectedMetrics.cleanWater.toFixed(1)}%
                        </p>
                      </div>
                      <div className="p-2 bg-secondary rounded">
                        <p className="text-muted-foreground">Renewable</p>
                        <p className="font-semibold text-foreground">
                          {scenario.projectedMetrics.renewableEnergy.toFixed(1)}%
                        </p>
                      </div>
                      <div className="p-2 bg-secondary rounded">
                        <p className="text-muted-foreground">CO₂ Cut</p>
                        <p className="font-semibold text-foreground">
                          {scenario.projectedMetrics.co2Reduction.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Budget Allocation</h4>
                    <div className="space-y-1 text-sm">
                      {Object.entries(scenario.allocation).map(([sector, value]) => (
                        <div key={sector} className="flex justify-between">
                          <span className="text-muted-foreground capitalize">{sector}</span>
                          <span className="font-medium text-foreground">{value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Impact;
