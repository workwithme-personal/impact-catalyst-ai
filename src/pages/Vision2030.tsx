import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Calendar } from "lucide-react";

const Vision2030 = () => {
  const milestones = [
    { year: 2025, literacy: 76, water: 65, energy: 42, co2: 15 },
    { year: 2026, literacy: 80, water: 70, energy: 48, co2: 20 },
    { year: 2027, literacy: 84, water: 75, energy: 55, co2: 28 },
    { year: 2028, literacy: 88, water: 80, energy: 65, co2: 38 },
    { year: 2029, literacy: 92, water: 85, energy: 75, co2: 48 },
    { year: 2030, literacy: 95, water: 90, energy: 85, co2: 60 },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-data">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">2030 Vision Tracker</h1>
          <p className="text-muted-foreground">
            India's projected SDG progress timeline towards 2030 targets
          </p>
        </div>

        <Card className="p-8 shadow-elevated border-border mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-accent rounded-full">
              <Target className="w-8 h-8 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">SDG 2030 Targets</h2>
              <p className="text-muted-foreground">Projected milestone achievements by year</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gradient-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Literacy Rate Target</p>
              <p className="text-2xl font-bold text-primary">95%</p>
            </div>
            <div className="p-4 bg-gradient-accent/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Clean Water Access</p>
              <p className="text-2xl font-bold text-accent">90%</p>
            </div>
            <div className="p-4 bg-success/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Renewable Energy</p>
              <p className="text-2xl font-bold text-success">85%</p>
            </div>
            <div className="p-4 bg-warning/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">CO₂ Reduction</p>
              <p className="text-2xl font-bold text-warning">60%</p>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {milestones.map((milestone, idx) => {
            const isPast = milestone.year < currentYear;
            const isCurrent = milestone.year === currentYear;
            
            return (
              <Card
                key={milestone.year}
                className={`p-6 shadow-card hover:shadow-elevated transition-all duration-300 border-border ${
                  isCurrent ? 'border-2 border-primary' : ''
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-full ${
                    isPast ? 'bg-success/20' : isCurrent ? 'bg-primary/20' : 'bg-muted'
                  }`}>
                    <Calendar className={`w-6 h-6 ${
                      isPast ? 'text-success' : isCurrent ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary">{milestone.year}</h3>
                    <p className="text-sm text-muted-foreground">
                      {isPast ? 'Completed' : isCurrent ? 'Current Year' : 'Projected'}
                    </p>
                  </div>
                  {isCurrent && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">In Progress</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">Literacy Rate</span>
                      <span className="text-sm font-bold text-primary">{milestone.literacy}%</span>
                    </div>
                    <Progress value={milestone.literacy} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">Clean Water Access</span>
                      <span className="text-sm font-bold text-accent">{milestone.water}%</span>
                    </div>
                    <Progress value={milestone.water} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">Renewable Energy</span>
                      <span className="text-sm font-bold text-success">{milestone.energy}%</span>
                    </div>
                    <Progress value={milestone.energy} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">CO₂ Reduction</span>
                      <span className="text-sm font-bold text-warning">{milestone.co2}%</span>
                    </div>
                    <Progress value={milestone.co2} className="h-2" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Vision2030;
