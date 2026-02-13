import { ExternalLink, FileSpreadsheet, PlayCircle, BookOpen, FileText } from 'lucide-react';
import type { WeekData, Resource } from '../types';
import { RESOURCES_DATA } from '../data';

interface ResourceHubProps {
    item: WeekData;
}

const TYPE_META: Record<Resource['type'], { icon: typeof FileText; label: string; color: string }> = {
    template: { icon: FileSpreadsheet, label: 'Template', color: 'bg-blue-50 text-blue-600 border-blue-200' },
    tutorial: { icon: BookOpen, label: 'Tutorial', color: 'bg-purple-50 text-purple-600 border-purple-200' },
    video: { icon: PlayCircle, label: 'Video', color: 'bg-rose-50 text-rose-600 border-rose-200' },
    reference: { icon: FileText, label: 'Reference', color: 'bg-amber-50 text-amber-600 border-amber-200' },
};

export default function ResourceHub({ item }: ResourceHubProps) {
    const resources = RESOURCES_DATA[item.id] || [];

    // Group by type
    const grouped = resources.reduce((acc, r) => {
        (acc[r.type] = acc[r.type] || []).push(r);
        return acc;
    }, {} as Record<string, Resource[]>);

    const typeOrder: Resource['type'][] = ['tutorial', 'video', 'template', 'reference'];

    return (
        <div className="space-y-4">
            {typeOrder.map((type) => {
                const items = grouped[type];
                if (!items || items.length === 0) return null;
                const meta = TYPE_META[type];
                const Icon = meta.icon;

                return (
                    <div key={type}>
                        <h5 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            <Icon className="w-3.5 h-3.5" />
                            {meta.label}s
                        </h5>
                        <div className="space-y-1.5">
                            {items.map((resource, idx) => (
                                <a
                                    key={idx}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`
                    flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg
                    border transition-all duration-200 group
                    ${meta.color} hover:shadow-sm
                  `}
                                >
                                    <span className="text-sm font-medium">{resource.title}</span>
                                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                </a>
                            ))}
                        </div>
                    </div>
                );
            })}

            {resources.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-8">
                    No resources available for this week yet.
                </p>
            )}
        </div>
    );
}
