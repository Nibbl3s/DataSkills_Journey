import type { ReactNode } from 'react';

// --- Core Data Types ---

export interface Deliverable {
    title: string;
    desc: string;
}

export interface WeekData {
    id: string;
    week: number;
    phase: string;
    title: string;
    subtitle: string;
    icon: ReactNode;
    color: string;
    description: string;
    learningObj: string;
    deliverables: Deliverable[];
    mode: string;
}

// --- Feature: Resource Hub ---

export interface Resource {
    title: string;
    url: string;
    type: 'template' | 'tutorial' | 'video' | 'reference';
}

// --- Feature: Self-Assessment ---

export interface SkillItem {
    id: string;
    label: string;
}

export type ConfidenceLevel = 'not-yet' | 'getting-there' | 'confident';

// --- Persisted State Shapes ---

export interface ProgressState {
    [weekId: string]: {
        [taskIndex: number]: boolean;
    };
}

export interface DeadlineState {
    [weekId: string]: {
        [taskIndex: number]: string; // ISO date string
    };
}

export interface NotesState {
    [weekId: string]: string;
}

export interface AssessmentState {
    [weekId: string]: {
        [skillId: string]: ConfidenceLevel;
    };
}
