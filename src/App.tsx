import React, { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { QuestionGenerator } from "./components/dashboard/QuestionGenerator";
import { QuestionDisplay } from "./components/dashboard/QuestionDisplay";
import { StandardsMapping } from "./components/dashboard/StandardsMapping";
import { Question } from "./lib/gemini";
import { Search, Bell, HelpCircle } from "lucide-react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search questions, standards, or topics..." 
                className="pl-10 h-9 bg-accent/50 border-none focus-visible:ring-1"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <HelpCircle className="w-4 h-4" />
            </Button>
            <div className="h-4 w-[1px] bg-border mx-2" />
            <Button size="sm" className="font-bold tracking-tight">
              Export Dataset
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold tracking-tight">Question Engine</h1>
              <p className="text-muted-foreground text-sm">
                Generate and validate test-aligned content using our proprietary AI models.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-8">
              {/* Left Column: Controls */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <QuestionGenerator onQuestionGenerated={setCurrentQuestion} />
                <div className="p-6 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Engine Status</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Latency</span>
                    <span className="text-sm font-mono text-primary">1.2s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Model</span>
                    <span className="text-sm font-mono text-primary">Gemini 3 Flash</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uptime</span>
                    <span className="text-sm font-mono text-primary">99.99%</span>
                  </div>
                </div>
              </div>

              {/* Middle Column: Display */}
              <div className="col-span-12 lg:col-span-5">
                <QuestionDisplay question={currentQuestion} />
              </div>

              {/* Right Column: Analytics */}
              <div className="col-span-12 lg:col-span-3">
                <StandardsMapping />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
