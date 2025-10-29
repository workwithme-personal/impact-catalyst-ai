import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  delay?: number;
}

export const StatCard = ({ title, value, unit, icon: Icon, delay = 0 }: StatCardProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return (
    <Card className="p-6 shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in border-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-primary animate-counter">
              {count.toFixed(0)}
            </span>
            <span className="text-lg text-muted-foreground">{unit}</span>
          </div>
        </div>
        <div className="p-4 bg-gradient-accent rounded-full">
          <Icon className="w-8 h-8 text-accent-foreground" />
        </div>
      </div>
    </Card>
  );
};
