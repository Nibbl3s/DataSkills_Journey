import { useState } from 'react';
import {
  BookOpen,
  Users,
  Lightbulb,
  CheckCircle2,
  Video,
  ListChecks,
  CalendarClock,
  FileEdit,
  BarChart3,
  Link2,
  ExternalLink,
  FileSpreadsheet,
} from 'lucide-react';
import type { WeekData, ProgressState, DeadlineState, NotesState, AssessmentState } from './types';
import { COURSE_DATA } from './data';
import { useLocalStorage } from './hooks/useLocalStorage';

import ProgressTracker from './components/ProgressTracker';
import DeadlinePlanner from './components/DeadlinePlanner';
import NotesJournal from './components/NotesJournal';
import SelfAssessment from './components/SelfAssessment';
import ResourceHub from './components/ResourceHub';

// --- Tab Configuration ---

type TabId = 'progress' | 'deadlines' | 'notes' | 'assessment' | 'resources';

const TABS: { id: TabId; label: string; icon: typeof ListChecks }[] = [
  { id: 'progress', label: 'Progress', icon: ListChecks },
  { id: 'deadlines', label: 'Deadlines', icon: CalendarClock },
  { id: 'notes', label: 'Notes', icon: FileEdit },
  { id: 'assessment', label: 'Self-Check', icon: BarChart3 },
  { id: 'resources', label: 'Resources', icon: Link2 },
];

// --- Helper: compute week completion % from progress state ---

function getWeekPercent(progress: ProgressState, item: WeekData): number {
  const wp = progress[item.id];
  if (!wp) return 0;
  const done = Object.values(wp).filter(Boolean).length;
  return item.deliverables.length > 0 ? Math.round((done / item.deliverables.length) * 100) : 0;
}

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

const TimelineNode = ({
  item,
  isSelected,
  onClick,
  percent,
}: {
  item: WeekData;
  isSelected: boolean;
  onClick: (i: WeekData) => void;
  percent: number;
}) => {
  // SVG ring parameters
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <button
      onClick={() => onClick(item)}
      className="relative flex flex-col items-center w-full group transition-all duration-300 ease-in-out"
    >
      {/* Connector Line */}
      <div className="absolute top-8 left-1/2 w-full h-1 bg-slate-200 -z-10 hidden md:block group-last:hidden"></div>

      {/* Circle Icon with progress ring */}
      <div className="relative mb-4">
        {percent > 0 && (
          <svg
            className="absolute -inset-1 w-[4.5rem] h-[4.5rem] -rotate-90"
            viewBox="0 0 72 72"
          >
            <circle
              cx="36"
              cy="36"
              r={radius}
              fill="none"
              stroke={percent === 100 ? '#10b981' : '#3b82f6'}
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
        )}
        <div
          className={`
          w-16 h-16 rounded-full flex items-center justify-center shadow-lg
          transition-all duration-300 border-4 
          ${isSelected
              ? `${item.color} text-white border-white scale-110`
              : 'bg-white text-slate-500 border-slate-100 hover:border-blue-100 hover:text-blue-600'
            }
        `}
        >
          {item.icon}
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
          Week {item.week}
        </div>
        <div className={`text-sm font-bold ${isSelected ? 'text-slate-800' : 'text-slate-500'}`}>
          {item.title}
        </div>
        {percent > 0 && (
          <div
            className={`text-xs mt-1 font-medium ${percent === 100 ? 'text-emerald-500' : 'text-blue-400'
              }`}
          >
            {percent}%
          </div>
        )}
      </div>
    </button>
  );
};

const DetailView = ({ item }: { item: WeekData }) => {
  if (!item) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
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
            <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-slate-800 font-bold mb-3">
              <Lightbulb className="w-5 h-5 text-slate-400" />
              Learning Goal
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">{item.learningObj}</p>
          </div>

          {item.id === 'w3' && (
            <div>
              <h4 className="flex items-center gap-2 text-slate-800 font-bold mb-3">
                <FileSpreadsheet className="w-5 h-5 text-slate-400" />
                Challenge Generators
              </h4>
              <div className="space-y-1.5">
                <a
                  className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border transition-all duration-200 group bg-blue-50 text-blue-600 border-blue-200 hover:shadow-sm"
                  href="https://chatgpt.com/g/g-68c7b9ac65c88191af3b9035c145b0a3-excel-exercise-generator"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="text-sm font-medium">ChatGPT Excel Exercise Generator</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
                <a
                  className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border transition-all duration-200 group bg-blue-50 text-blue-600 border-blue-200 hover:shadow-sm"
                  href="https://www.perplexity.ai/spaces/excel-challenges-creator-0gx2JeNeQQy92PMePI.nXw#0"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="text-sm font-medium">Perplexity Excel Challenges Creator</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              </div>
            </div>
          )}

          {item.id === 'w5' && (
            <div>
              <h4 className="flex items-center gap-2 text-slate-800 font-bold mb-3">
                <FileSpreadsheet className="w-5 h-5 text-slate-400" />
                Assignment Assistant
              </h4>
              <div className="space-y-1.5">
                <a
                  className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border transition-all duration-200 group bg-blue-50 text-blue-600 border-blue-200 hover:shadow-sm"
                  href="https://chatgpt.com/g/g-682c413345848191a86e9d24b1e88377-excel-your-way-the-assignment"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="text-sm font-medium">Excel Your Way Assignment Assistant</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              </div>
            </div>
          )}

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Assessment Mode</h4>
            <div className="flex items-center gap-2 text-slate-700 font-medium text-sm">
              {item.week >= 4 ? (
                <Users className="w-4 h-4" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
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
            {item.deliverables.map((task, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors"
              >
                <div
                  className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${item.color}`}
                >
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
                <strong>Final Reminder:</strong> The Capstone requires a video pitch. This is your
                chance to sell your solution, not just show formulas.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Feature Tabs Panel ---

const FeaturePanel = ({
  activeTab,
  item,
  progress,
  setProgress,
  deadlines,
  setDeadlines,
  notes,
  setNotes,
  assessment,
  setAssessment,
}: {
  activeTab: TabId;
  item: WeekData;
  progress: ProgressState;
  setProgress: (value: ProgressState | ((prev: ProgressState) => ProgressState)) => void;
  deadlines: DeadlineState;
  setDeadlines: (value: DeadlineState | ((prev: DeadlineState) => DeadlineState)) => void;
  notes: NotesState;
  setNotes: (value: NotesState | ((prev: NotesState) => NotesState)) => void;
  assessment: AssessmentState;
  setAssessment: (value: AssessmentState | ((prev: AssessmentState) => AssessmentState)) => void;
}) => {
  switch (activeTab) {
    case 'progress':
      return <ProgressTracker item={item} progress={progress} setProgress={setProgress} />;
    case 'deadlines':
      return <DeadlinePlanner item={item} deadlines={deadlines} setDeadlines={setDeadlines} />;
    case 'notes':
      return <NotesJournal item={item} notes={notes} setNotes={setNotes} />;
    case 'assessment':
      return <SelfAssessment item={item} assessment={assessment} setAssessment={setAssessment} />;
    case 'resources':
      return <ResourceHub item={item} />;
    default:
      return null;
  }
};

// --- Main App ---

export default function App() {
  const [selectedWeek, setSelectedWeek] = useState(COURSE_DATA[0]);
  const [activeTab, setActiveTab] = useState<TabId>('progress');

  // Persisted state
  const [progress, setProgress] = useLocalStorage<ProgressState>('dsj-progress', {});
  const [deadlines, setDeadlines] = useLocalStorage<DeadlineState>('dsj-deadlines', {});
  const [notes, setNotes] = useLocalStorage<NotesState>('dsj-notes', {});
  const [assessment, setAssessment] = useLocalStorage<AssessmentState>('dsj-assessment', {});

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
              percent={getWeekPercent(progress, item)}
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
                  : 'bg-white text-slate-600 shadow-sm'
                }
              `}
            >
              Week {item.week}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <DetailView item={selectedWeek} />

        {/* Feature Tabs */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Tab Bar */}
          <div className="flex border-b border-slate-100 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap
                    border-b-2 transition-all duration-200
                    ${isActive
                      ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <FeaturePanel
              activeTab={activeTab}
              item={selectedWeek}
              progress={progress}
              setProgress={setProgress}
              deadlines={deadlines}
              setDeadlines={setDeadlines}
              notes={notes}
              setNotes={setNotes}
              assessment={assessment}
              setAssessment={setAssessment}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-400 text-sm">
          <p>Course: Data Skills • Instructor: [Your Name]</p>
        </div>
      </div>
    </div>
  );
}