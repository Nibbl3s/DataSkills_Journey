import { Calendar, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import type { WeekData, DeadlineState } from '../types';

interface DeadlinePlannerProps {
    item: WeekData;
    deadlines: DeadlineState;
    setDeadlines: (value: DeadlineState | ((prev: DeadlineState) => DeadlineState)) => void;
}

function getUrgency(dateStr: string): { label: string; color: string; icon: typeof Clock } {
    if (!dateStr) return { label: 'No deadline set', color: 'text-slate-400', icon: Clock };
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const deadline = new Date(dateStr + 'T00:00:00');
    const diffMs = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: `${Math.abs(diffDays)}d overdue`, color: 'text-red-600', icon: AlertTriangle };
    if (diffDays === 0) return { label: 'Due today!', color: 'text-red-500', icon: AlertTriangle };
    if (diffDays <= 3) return { label: `${diffDays}d left`, color: 'text-amber-500', icon: Clock };
    return { label: `${diffDays}d left`, color: 'text-emerald-500', icon: CheckCircle };
}

export default function DeadlinePlanner({ item, deadlines, setDeadlines }: DeadlinePlannerProps) {
    const weekDeadlines = deadlines[item.id] || {};

    const setDeadline = (idx: number, date: string) => {
        setDeadlines((prev) => ({
            ...prev,
            [item.id]: {
                ...(prev[item.id] || {}),
                [idx]: date,
            },
        }));
    };

    const clearDeadline = (idx: number) => {
        setDeadlines((prev) => {
            const week = { ...(prev[item.id] || {}) };
            delete week[idx];
            return { ...prev, [item.id]: week };
        });
    };

    return (
        <div className="space-y-3">
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Set personal deadlines for each task
            </p>

            {item.deliverables.map((task, idx) => {
                const dateStr = weekDeadlines[idx] || '';
                const urgency = getUrgency(dateStr);
                const UrgencyIcon = urgency.icon;

                return (
                    <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-100 hover:border-slate-200 transition-colors"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-700 truncate">{task.title}</p>
                            <div className={`flex items-center gap-1 text-xs mt-0.5 ${urgency.color}`}>
                                <UrgencyIcon className="w-3 h-3" />
                                {urgency.label}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <input
                                type="date"
                                value={dateStr}
                                onChange={(e) => setDeadline(idx, e.target.value)}
                                className="text-xs border border-slate-200 rounded-md px-2 py-1.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            />
                            {dateStr && (
                                <button
                                    onClick={() => clearDeadline(idx)}
                                    className="text-xs text-slate-400 hover:text-red-400 transition-colors"
                                    title="Clear deadline"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
