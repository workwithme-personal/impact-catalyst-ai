import { Slider } from "@/components/ui/slider";

interface BudgetSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  color?: string;
}

export const BudgetSlider = ({ label, value, onChange, color = "primary" }: BudgetSliderProps) => {
  return (
    <div className="space-y-2 animate-slide-up">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-lg font-bold text-primary">{value}%</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        min={0}
        max={50}
        step={1}
        className="cursor-pointer"
      />
    </div>
  );
};
