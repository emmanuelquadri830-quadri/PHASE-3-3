import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { generateQuestion, Question } from "@/lib/gemini";
import { motion, AnimatePresence } from "motion/react";

export function QuestionGenerator({ onQuestionGenerated }: { onQuestionGenerated: (q: Question) => void }) {
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    testType: "SAT",
    subject: "Mathematics",
    difficulty: "Medium",
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const question = await generateQuestion(params);
      onQuestionGenerated(question);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Smart Generator
            </CardTitle>
            <CardDescription>Configure AI parameters for test-aligned content</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/20">
            v2.4 Engine
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Test Standard</Label>
            <Select 
              value={params.testType} 
              onValueChange={(v) => setParams(p => ({ ...p, testType: v }))}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select Test" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SAT">SAT Digital</SelectItem>
                <SelectItem value="ACT">ACT Standard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subject Area</Label>
            <Select 
              value={params.subject} 
              onValueChange={(v) => setParams(p => ({ ...p, subject: v }))}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Reading">Reading & Writing</SelectItem>
                <SelectItem value="Science">Science (ACT Only)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Difficulty Level</Label>
            <span className="text-xs font-bold text-primary">{params.difficulty}</span>
          </div>
          <Slider 
            defaultValue={[50]} 
            max={100} 
            step={50} 
            onValueChange={(v) => {
              const levels = ["Easy", "Medium", "Hard"];
              setParams(p => ({ ...p, difficulty: levels[v[0] / 50] }));
            }}
            className="py-2"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
            <span>Foundational</span>
            <span>Intermediate</span>
            <span>Advanced</span>
          </div>
        </div>

        <div className="pt-2">
          <Button 
            className="w-full h-10 font-bold tracking-tight" 
            disabled={loading}
            onClick={handleGenerate}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Synthesizing Content...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Question
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-accent/50 border border-border/50">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            <span className="text-[10px] font-medium">Standards Aligned</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-accent/50 border border-border/50">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            <span className="text-[10px] font-medium">Validation Active</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
