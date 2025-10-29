import { Navbar } from "@/components/Navbar";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { GraduationCap, Droplet, Zap, Leaf, ArrowRight, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-data">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight">
              Empowering India's 2030 Vision
            </h1>
            <p className="text-xl text-muted-foreground">
              Data-driven simulation and planning platform for achieving Sustainable Development Goals through optimized budget allocation
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/simulation">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-elevated">
                  Start Simulation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/impact">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  View Impact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Current SDG Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Literacy Rate"
              value={74}
              unit="%"
              icon={GraduationCap}
              delay={0}
            />
            <StatCard
              title="Clean Water Access"
              value={62}
              unit="%"
              icon={Droplet}
              delay={200}
            />
            <StatCard
              title="Renewable Energy"
              value={38}
              unit="%"
              icon={Zap}
              delay={400}
            />
            <StatCard
              title="CO₂ Reduction"
              value={12}
              unit="%"
              icon={Leaf}
              delay={600}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg shadow-card hover:shadow-elevated transition-all duration-300 animate-slide-up border border-border">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Budget Simulation</h3>
              <p className="text-muted-foreground">
                Interactive sliders to allocate budget across sectors and see real-time impact projections
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow-card hover:shadow-elevated transition-all duration-300 animate-slide-up border border-border" style={{ animationDelay: '100ms' }}>
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Optimization Engine</h3>
              <p className="text-muted-foreground">
                AI-powered budget optimization to maximize SDG impact and efficiency scores
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow-card hover:shadow-elevated transition-all duration-300 animate-slide-up border border-border" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Scenario Management</h3>
              <p className="text-muted-foreground">
                Save, compare, and analyze multiple budget scenarios to find the best strategy
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
