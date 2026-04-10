import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Question } from "@/lib/gemini";
import { motion } from "motion/react";
import { FileText, CheckCircle2, Info, ShieldCheck } from "lucide-react";

export function QuestionDisplay({ question }: { question: Question | null }) {
  if (!question) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-xl bg-accent/20">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-muted-foreground opacity-50" />
        </div>
        <h3 className="text-lg font-bold text-muted-foreground">No Question Generated</h3>
        <p className="text-sm text-muted-foreground/70 max-w-xs mt-2">
          Configure the generator on the left and click "Generate" to create test-ready content.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Card className="shadow-sm border-border/50 overflow-hidden">
        <div className="h-1 bg-primary w-full" />
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-2">
              <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider px-2 py-0">
                {question.testType}
              </Badge>
              <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider px-2 py-0 border-primary/30 text-primary bg-primary/5">
                {question.subject}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100">
              <ShieldCheck className="w-3 h-3" />
              VALIDATED {question.validationScore}%
            </div>
          </div>
          <CardTitle className="text-xl font-bold leading-tight">
            {question.topic}
          </CardTitle>
          <p className="text-xs text-muted-foreground font-medium">
            Standard Alignment: <span className="text-foreground">{question.standard}</span>
          </p>
        </CardHeader>
        <Separator className="mx-6 w-auto" />
        <CardContent className="pt-6 space-y-6">
          <div className="prose prose-sm max-w-none">
            <p className="text-base font-medium leading-relaxed text-foreground/90">
              {question.questionText}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, idx) => {
              const label = String.fromCharCode(65 + idx);
              const isCorrect = label === question.correctAnswer;
              return (
                <div 
                  key={idx}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    isCorrect 
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                      : "border-border hover:border-primary/30 hover:bg-accent/50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    isCorrect ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"
                  }`}>
                    {label}
                  </div>
                  <span className="text-sm font-medium">{option}</span>
                  {isCorrect && <CheckCircle2 className="ml-auto w-5 h-5 text-primary" />}
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-accent/30 border border-border/50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
              <Info className="w-3 h-3" />
              Pedagogical Explanation
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {question.explanation}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
