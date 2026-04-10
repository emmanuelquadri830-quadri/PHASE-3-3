import React from "react";
import { 
  LayoutDashboard, 
  BookOpen, 
  Settings, 
  BarChart3, 
  BrainCircuit,
  GraduationCap,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BrainCircuit, label: "Question Engine", active: false },
  { icon: BookOpen, label: "Curriculum", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: History, label: "Generation History", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export function Sidebar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-64 border-r bg-card h-screen flex flex-col p-4">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <GraduationCap className="text-primary-foreground w-5 h-5" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-bold text-sm tracking-tight">The Learning</span>
          <span className="font-bold text-sm tracking-tight text-primary">Company</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              item.active 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t">
        <div className="px-2 mb-4">
          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-2">
            Visual Theme
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(["classic", "modern", "academic", "ocean"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={cn(
                  "text-[10px] py-1 px-2 rounded border capitalize transition-all",
                  theme === t 
                    ? "border-primary bg-primary/10 text-primary font-bold" 
                    : "border-border hover:bg-accent"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold">
            EQ
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium">Emmanuel Q.</span>
            <span className="text-[10px] text-muted-foreground">Admin Access</span>
          </div>
        </div>
      </div>
    </div>
  );
}
