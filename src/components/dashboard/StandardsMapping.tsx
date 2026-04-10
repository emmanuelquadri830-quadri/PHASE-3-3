import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, BarChart3, Layers, Zap } from "lucide-react";

export function StandardsMapping() {
  const standards = [
    { name: "Heart of Algebra", progress: 85, count: 124 },
    { name: "Problem Solving", progress: 62, count: 89 },
    { name: "Passport to Advanced Math", progress: 45, count: 67 },
    { name: "Geometry & Trig", progress: 30, count: 42 },
  ];

  return (
    <div className="space-y-4">
      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Standards Coverage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {standards.map((s) => (
            <div key={s.name} className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <span>{s.name}</span>
                <span>{s.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500" 
                  style={{ width: `${s.progress}%` }} 
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="shadow-sm border-border/50 p-4 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Zap className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">1,284</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Generated</span>
          </div>
        </Card>
        <Card className="shadow-sm border-border/50 p-4 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
            <Layers className="w-4 h-4 text-green-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">99.2%</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Accuracy Rate</span>
          </div>
        </Card>
      </div>

      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary/40" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium">Algebraic Functions Q-{i}42</span>
                  <span className="text-[10px] text-muted-foreground">Generated 4m ago • SAT Math</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
