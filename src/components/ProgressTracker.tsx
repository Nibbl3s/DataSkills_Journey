import { CheckSquare, Square } from 'lucide-react';
import type { WeekData, ProgressState } from '../types';

interface ProgressTrackerProps {
    item: WeekData;
    progress: ProgressState;
    setProgress: (value: ProgressState | ((prev: ProgressState) => ProgressState)) => void;
}

export default function ProgressTracker({ item, progress, setProgress }: ProgressTrackerProps) {
    const weekProgress = progress[item.id] || {};
    const total = item.deliverables.length;
    const completed = Object.values(weekProgress).filter(Boolean).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    const toggleTask = (idx: number) => {
        setProgress((prev) => ({
            ...prev,
            [item.id]: {
                ...(prev[item.id] || {}),
                [idx]: !(prev[item.id]?.[idx]),
            },
        }));
    };

    return (
        <div className="space-y-4">
            {/* Progress bar */}
            <div className="flex items-center gap-4">
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${percent === 100 ? 'bg-emerald-500' : 'bg-blue-500'
                            }`}
                        style={{ width: `${percent}%` }}
                    />
                </div>
                <span className={`text-sm font-bold min-w-[3rem] text-right ${percent === 100 ? 'text-emerald-600' : 'text-slate-600'
                    }`}>
                    {percent}%
                </span>
            </div>

            <p className="text-xs text-slate-400">
                {completed} of {total} tasks completed
            </p>

            {/* Task checkboxes */}
            <div className="space-y-2">
                {item.deliverables.map((task, idx) => {
                    const done = weekProgress[idx] || false;
                    return (
                        <button
                            key={idx}
                            onClick={() => toggleTask(idx)}
                            className={`
                w-full flex items-center gap-3 p-3 rounded-lg text-left
                transition-all duration-200 border
                ${done
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                    : 'bg-white border-slate-100 text-slate-700 hover:border-slate-300'
                                }
              `}
                        >
                            {done
                                ? <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                                : <Square className="w-5 h-5 text-slate-300 shrink-0" />
                            }
                            <div>
                                <span className={`text-sm font-medium ${done ? 'line-through opacity-70' : ''}`}>
                                    {task.title}
                                </span>
                                <p className={`text-xs mt-0.5 ${done ? 'opacity-50' : 'text-slate-400'}`}>
                                    {task.desc}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
