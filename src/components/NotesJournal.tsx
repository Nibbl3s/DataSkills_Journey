import { useState, useEffect, useRef } from 'react';
import { FileText, Download } from 'lucide-react';
import type { WeekData, NotesState } from '../types';
import { COURSE_DATA } from '../data';

interface NotesJournalProps {
    item: WeekData;
    notes: NotesState;
    setNotes: (value: NotesState | ((prev: NotesState) => NotesState)) => void;
}

export default function NotesJournal({ item, notes, setNotes }: NotesJournalProps) {
    const [localText, setLocalText] = useState(notes[item.id] || '');
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Sync local text when switching weeks
    useEffect(() => {
        setLocalText(notes[item.id] || '');
    }, [item.id, notes]);

    const handleChange = (text: string) => {
        setLocalText(text);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setNotes((prev) => ({ ...prev, [item.id]: text }));
        }, 400);
    };

    const exportMarkdown = () => {
        const lines = COURSE_DATA.map((week) => {
            const weekNotes = notes[week.id] || '';
            return `## Week ${week.week}: ${week.title}\n\n${weekNotes || '_No notes yet._'}\n`;
        }).join('\n---\n\n');

        const content = `# Data Skills Journey — My Notes\n\n${lines}`;
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data-skills-notes.md';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Your notes auto-save as you type
                </p>
                <button
                    onClick={exportMarkdown}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                >
                    <Download className="w-3.5 h-3.5" />
                    Export All Notes
                </button>
            </div>

            <textarea
                value={localText}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={`Write your reflections, key takeaways, or questions for Week ${item.week}...`}
                className="w-full h-48 p-4 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-300 resize-y focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-colors"
            />

            <div className="text-right text-xs text-slate-300">
                {localText.length} characters
            </div>
        </div>
    );
}
