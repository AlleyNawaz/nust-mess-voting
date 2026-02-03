"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, VoteEntry, VoteSession, MealType, DayOfWeek } from '@/lib/types';

interface VotingContextType {
    user: User | null;
    setUser: (user: User) => void;
    mainMenuVotes: VoteEntry[];
    ramadanMenuVotes: VoteEntry[];
    addVote: (type: 'main' | 'ramadan', vote: VoteEntry) => void;
    removeVote: (type: 'main' | 'ramadan', day: DayOfWeek, meal: MealType) => void;
    getVote: (type: 'main' | 'ramadan', day: DayOfWeek, meal: MealType) => VoteEntry | undefined;
    phase: 'main' | 'ramadan' | 'completed';
    setPhase: (phase: 'main' | 'ramadan' | 'completed') => void;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export function VotingProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [mainMenuVotes, setMainMenuVotes] = useState<VoteEntry[]>([]);
    const [ramadanMenuVotes, setRamadanMenuVotes] = useState<VoteEntry[]>([]);
    const [phase, setPhase] = useState<'main' | 'ramadan' | 'completed'>('main');

    const addVote = (type: 'main' | 'ramadan', vote: VoteEntry) => {
        const setter = type === 'main' ? setMainMenuVotes : setRamadanMenuVotes;
        setter((prev) => {
            // Remove existing vote for this slot if exists
            const filtered = prev.filter(v => !(v.day === vote.day && v.meal === vote.meal));
            return [...filtered, vote];
        });
    };

    const removeVote = (type: 'main' | 'ramadan', day: DayOfWeek, meal: MealType) => {
        const setter = type === 'main' ? setMainMenuVotes : setRamadanMenuVotes;
        setter((prev) => prev.filter(v => !(v.day === day && v.meal === meal)));
    };

    const getVote = (type: 'main' | 'ramadan', day: DayOfWeek, meal: MealType) => {
        const source = type === 'main' ? mainMenuVotes : ramadanMenuVotes;
        return source.find(v => v.day === day && v.meal === meal);
    };

    return (
        <VotingContext.Provider value={{
            user,
            setUser,
            mainMenuVotes,
            ramadanMenuVotes,
            addVote,
            removeVote,
            getVote,
            phase,
            setPhase
        }}>
            {children}
        </VotingContext.Provider>
    );
}

export function useVoting() {
    const context = useContext(VotingContext);
    if (context === undefined) {
        throw new Error('useVoting must be used within a VotingProvider');
    }
    return context;
}
