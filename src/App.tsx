import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  Bot,
  Presentation,
  Award,
  CheckCircle2,
  BookOpen,
  Users,
  Lightbulb,
  Video
} from 'lucide-react';

// --- Data Structure derived from User Screenshots ---

const COURSE_DATA = [
  {
    id: 'w1',
    week: 1,
    phase: 'Phase 1: Foundations',
    title: 'Founding Your Company',
    subtitle: 'Excel Empire: Lesson 1',
    icon: <Building2 className="w-6 h-6" />,
    color: 'bg-blue-600',
    description: "You are the founder of a new SME. Your goal is to digitize your business logic from scratch.",
    learningObj: "Establish data structure, master entry-level calculations, and understand cell referencing.",
    deliverables: [
      { title: "Task 1: Company Setup", desc: "Define name, branding, and core identity." },
      { title: "Task 2: Employee Roster", desc: "Data entry and basic formatting." },
      { title: "Task 3: Capitalization Table", desc: "Basic formulas and SUM functions." },
      { title: "Task 4: Initial Inventory", desc: "Structuring data tables." },
      { title: "Task 5: Company Dashboard", desc: "Introduction to visual data summary." }
    ],
    mode: "Self-Guided Simulation"
  },
  {
    id: 'w2',
    week: 2,
    phase: 'Phase 1: Foundations',
    title: 'Expanding Operations',
    subtitle: 'Excel Empire: Lesson 2',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'bg-blue-500',
    description: "Your business is scaling. You need dynamic tools to track sales, customers, and performance.",
    learningObj: "Apply complex logic (IF, VLOOKUP) and creating dynamic reports.",
    deliverables: [
      { title: "Task 1: Enhanced Dashboard", desc: "Upgrading visualizations based on new data." },
      { title: "Task 2: Sales Tracking System", desc: "Implementing logical functions for transactions." },
      { title: "Task 3: Customer Database", desc: "Managing large datasets and filtering." },
      { title: "Task 4: Pivot Tables", desc: "Aggregating data for managerial views." },
      { title: "Task 5: Customer Insights", desc: "Deriving meaning from raw numbers." }
    ],
    mode: "Deep-Dive Problem Solving"
  },
  {
    id: 'w3',
    week: 3,
    phase: 'Phase 2: AI Consultant',
    title: 'Generating the Challenge',
    subtitle: 'AI-Augmented Design',
    icon: <Bot className="w-6 h-6" />,
    color: 'bg-purple-600',
    description: "Switch roles from Business Owner to Consultant. Use LLMs to generate realistic business scenarios.",
    learningObj: "Prompt engineering, data validation, and understanding the structure of business problems.",
    deliverables: [
      { title: "Step 1: The Prompt", desc: "Input Country + Topic (e.g., Belgium + Social Media) into the LLM." },
      { title: "Step 2: Generate 5 Challenges", desc: "The AI creates the problem statements." },
      { title: "Step 3: Data Generation", desc: "Acquire the raw mock-up data from the AI." },
      { title: "Step 4: Validation", desc: "CRITICAL: Verify the AI's logic and numbers before proceeding." }
    ],
    mode: "AI Collaboration & Verification"
  },
  {
    id: 'w4',
    week: 4,
    phase: 'Phase 2: AI Consultant',
    title: 'Solving & Presenting',
    subtitle: 'The Consultant Report',
    icon: <Presentation className="w-6 h-6" />,
    color: 'bg-purple-500',
    description: "Analyze the data you generated and present your findings to your 'Manager' (classmates).",
    learningObj: "Data visualization, storytelling with data, and professional communication.",
    deliverables: [
      { title: "Analysis", desc: "Solve the specific exercises generated in Week 3." },
      { title: "Visual Report", desc: "Create a dashboard/visuals that answer the problem statement." },
      { title: "Presentation (6 mins)", desc: "Present ONE key insight to the class." },
      { title: "Peer Review", desc: "Evaluate the logic of other groups." }
    ],
    mode: "Group Work & Presentation"
  },
  {
    id: 'w5',
    week: 5,
    phase: 'Phase 3: Capstone',
    title: 'Excel Your Way',
    subtitle: 'Independent Mastery',
    icon: <Award className="w-6 h-6" />,
    color: 'bg-emerald-600',
    description: "Transfer your skills to a novel context. Identify a personal problem and build a tool to solve it.",
    learningObj: "Independent problem identification, full-stack Excel development, and pitching.",
    deliverables: [
      { title: "Section 1: The Workbook", desc: "The functional Excel tool (Core logic & UI)." },
      { title: "Section 2: The Report", desc: "Word doc explaining the method, sources, and manual." },
      { title: "Section 3: Video Pitch", desc: "Recorded presentation demonstrating the tool's value." },
      { title: "Submission", desc: "Upload via Canvas (Total Eval: 60% of Grade)." }
    ],
    mode: "Independent Project"
  }
];

// --- Components ---

const Hero = () => (
  <div className="bg-slate-900 text-white p-8 rounded-2xl mb-8 shadow-xl">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Data Skills: The Student Journey</h1>
      <p className="text-slate-300 text-lg">
        From SME Founder to Data Consultant. A 5-week roadmap to Excel mastery.
      </p>
      <div className="flex gap-4 mt-6 text-sm font-medium">
        <div className="flex items-center gap-2">
          <span className="bg-blue-600 w-3 h-3 rounded-full"></span> Simulation
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-purple-600 w-3 h-3 rounded-full"></span> AI Consultant
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-emerald-600 w-3 h-3 rounded-full"></span> Capstone
        </div>
      </div>
    </div>
  </div>
);

const TimelineNode = ({ item, isSelected, onClick }: { item: any, isSelected: boolean, onClick: (i: any) => void }) => {
  return (
    <button
      onClick={() => onClick(item)}
      className={`
        relative flex flex-col items-center w-full group
        transition-all duration-300 ease-in-out
      `}
    >
      {/* Connector Line */}
      <div className="absolute top-8 left-1/2 w-full h-1 bg-slate-200 -z-10 hidden md:block group-last:hidden"></div>

      {/* Circle Icon */}
      <div className={`
        w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-4
        transition-all duration-300 border-4 
        ${isSelected
          ? `${item.color} text-white border-white scale-110`
          : 'bg-white text-slate-500 border-slate-100 hover:border-blue-100 hover:text-blue-600'
        }
      `}>
        {item.icon}
      </div>

      {/* Label */}
      <div className="text-center">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Week {item.week}</div>
        <div className={`text-sm font-bold ${isSelected ? 'text-slate-800' : 'text-slate-500'}`}>
          {item.title}
        </div>
      </div>
    </button>
  );
};

const DetailView = ({ item }: { item: any }) => {
  if (!item) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className={`${item.color} text-white p-8`}>
        <div className="flex items-center gap-3 mb-2 opacity-90">
          <span className="uppercase tracking-widest text-xs font-bold border border-white/30 px-2 py-1 rounded">
            {item.phase}
          </span>
          <span className="text-xs font-medium">Week {item.week}</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">{item.title}</h2>
        <h3 className="text-xl opacity-90 font-light">{item.subtitle}</h3>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-3 gap-8 p-8">

        {/* Left Col: Context */}
        <div className="md:col-span-1 space-y-6">
          <div>
            <h4 className="flex items-center gap-2 text-slate-800 font-bold mb-3">
              <BookOpen className="w-5 h-5 text-slate-400" />
              The Scenario
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-slate-800 font-bold mb-3">
              <Lightbulb className="w-5 h-5 text-slate-400" />
              Learning Goal
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {item.learningObj}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Assessment Mode</h4>
            <div className="flex items-center gap-2 text-slate-700 font-medium text-sm">
              {item.week >= 4 ? <Users className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              {item.mode}
            </div>
          </div>
        </div>

        {/* Right Col: Deliverables */}
        <div className="md:col-span-2">
          <h4 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-slate-400" />
            Key Tasks & Deliverables
          </h4>
          <div className="grid gap-3">
            {item.deliverables.map((task: any, idx: number) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors"
              >
                <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${item.color}`}>
                  {idx + 1}
                </div>
                <div>
                  <h5 className="text-slate-800 font-semibold text-sm">{task.title}</h5>
                  <p className="text-slate-500 text-xs mt-1">{task.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {item.week === 5 && (
            <div className="mt-6 p-4 bg-emerald-50 text-emerald-800 rounded-lg text-sm border border-emerald-100 flex gap-3">
              <Video className="w-5 h-5 shrink-0" />
              <p>
                <strong>Final Reminder:</strong> The Capstone requires a video pitch. This is your chance to sell your solution, not just show formulas.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedWeek, setSelectedWeek] = useState(COURSE_DATA[0]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <Hero />

        {/* Desktop Timeline */}
        <div className="mb-12 hidden md:flex justify-between items-start gap-4 px-8">
          {COURSE_DATA.map((item) => (
            <TimelineNode
              key={item.id}
              item={item}
              isSelected={selectedWeek.id === item.id}
              onClick={setSelectedWeek}
            />
          ))}
        </div>

        {/* Mobile Navigation (Tabs) */}
        <div className="md:hidden flex overflow-x-auto gap-2 mb-8 pb-2">
          {COURSE_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedWeek(item)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold
                ${selectedWeek.id === item.id
                  ? `${item.color} text-white`
                  : 'bg-white text-slate-600 shadow-sm'}
              `}
            >
              Week {item.week}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <DetailView item={selectedWeek} />

        {/* Footer */}
        <div className="mt-12 text-center text-slate-400 text-sm">
          <p>Course: Data Skills • Instructor: [Your Name]</p>
        </div>
      </div>
    </div>
  );
}