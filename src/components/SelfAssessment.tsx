import type { WeekData, AssessmentState, ConfidenceLevel } from '../types';
import { SKILLS_DATA } from '../data';

interface SelfAssessmentProps {
    item: WeekData;
    assessment: AssessmentState;
    setAssessment: (value: AssessmentState | ((prev: AssessmentState) => AssessmentState)) => void;
}

const LEVELS: { value: ConfidenceLevel; emoji: string; label: string; color: string; bg: string }[] = [
    { value: 'not-yet', emoji: '🔴', label: 'Not Yet', color: 'text-red-600', bg: 'bg-red-50 border-red-200 hover:bg-red-100' },
    { value: 'getting-there', emoji: '🟡', label: 'Getting There', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200 hover:bg-amber-100' },
    { value: 'confident', emoji: '🟢', label: 'Confident', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100' },
];

export default function SelfAssessment({ item, assessment, setAssessment }: SelfAssessmentProps) {
    const skills = SKILLS_DATA[item.id] || [];
    const weekAssessment = assessment[item.id] || {};

    const setRating = (skillId: string, level: ConfidenceLevel) => {
        setAssessment((prev) => ({
            ...prev,
            [item.id]: {
                ...(prev[item.id] || {}),
                [skillId]: level,
            },
        }));
    };

    // Compute summary counts for this week
    const counts = { 'not-yet': 0, 'getting-there': 0, 'confident': 0, unrated: 0 };
    skills.forEach((skill) => {
        const r = weekAssessment[skill.id];
        if (r) counts[r]++;
        else counts.unrated++;
    });

    return (
        <div className="space-y-4">
            {/* Summary bar */}
            {skills.length > 0 && (
                <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">🟢 {counts.confident}</span>
                    <span className="flex items-center gap-1">🟡 {counts['getting-there']}</span>
                    <span className="flex items-center gap-1">🔴 {counts['not-yet']}</span>
                    {counts.unrated > 0 && (
                        <span className="text-slate-300">· {counts.unrated} unrated</span>
                    )}
                </div>
            )}

            {/* Stacked progress bar */}
            {skills.length > 0 && (
                <div className="flex h-2.5 rounded-full overflow-hidden bg-slate-100">
                    {counts.confident > 0 && (
                        <div className="bg-emerald-400 transition-all duration-500" style={{ width: `${(counts.confident / skills.length) * 100}%` }} />
                    )}
                    {counts['getting-there'] > 0 && (
                        <div className="bg-amber-400 transition-all duration-500" style={{ width: `${(counts['getting-there'] / skills.length) * 100}%` }} />
                    )}
                    {counts['not-yet'] > 0 && (
                        <div className="bg-red-400 transition-all duration-500" style={{ width: `${(counts['not-yet'] / skills.length) * 100}%` }} />
                    )}
                </div>
            )}

            {/* Skills list */}
            <div className="space-y-3">
                {skills.map((skill) => {
                    const currentLevel = weekAssessment[skill.id];
                    return (
                        <div key={skill.id} className="p-3 rounded-lg bg-white border border-slate-100">
                            <p className="text-sm text-slate-700 mb-2">{skill.label}</p>
                            <div className="flex gap-2">
                                {LEVELS.map((level) => (
                                    <button
                                        key={level.value}
                                        onClick={() => setRating(skill.id, level.value)}
                                        className={`
                      flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
                      border transition-all duration-200
                      ${currentLevel === level.value
                                                ? `${level.bg} ${level.color} ring-2 ring-offset-1 ring-current`
                                                : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300'
                                            }
                    `}
                                    >
                                        <span>{level.emoji}</span>
                                        {level.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
