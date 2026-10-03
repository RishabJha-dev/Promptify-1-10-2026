import React from 'react';
import { Flame, BookOpen, Trophy, MessageSquare, LayoutDashboard, Sparkles, GraduationCap } from 'lucide-react';
import { StudentProfile } from '../types';
import { SkilioLogo } from './SkilioLogo';

interface NavbarProps {
  currentTab: 'dashboard' | 'courses' | 'contests' | 'community';
  onSelectTab: (tab: 'dashboard' | 'courses' | 'contests' | 'community') => void;
  onOpenArchitecture: () => void;
  onOpenProfile: () => void;
  student: StudentProfile;
  isTeacherMode: boolean;
  onToggleTeacherMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenArchitecture,
  onOpenProfile,
  student,
  isTeacherMode,
  onToggleTeacherMode,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Official Skilio Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center text-left transition-opacity hover:opacity-95 focus:outline-none"
            title="Skilio · Learn · Grow · Achieve"
          >
            <SkilioLogo variant="compact" size="sm" showTagline={true} />
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
              currentTab === 'dashboard'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onSelectTab('courses')}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
              currentTab === 'courses'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Courses</span>
          </button>

          <button
            onClick={() => onSelectTab('contests')}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
              currentTab === 'contests'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="h-4 w-4" />
            <span>Contest Arena</span>
          </button>

          <button
            onClick={() => onSelectTab('community')}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
              currentTab === 'community'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Community & Doubts</span>
          </button>

          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-amber-400/90 hover:text-amber-300 transition-colors"
            title="Inspect System Architecture Blueprint"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>Blueprint & Arch</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tabular-nums"
            title={`${student.currentStreak} Days Consecutive Coding Streak! Max: ${student.maxStreak} days`}
          >
            <Flame className="h-4 w-4 text-amber-500 animate-pulse fill-amber-500/30" />
            <span>{student.currentStreak}d Streak</span>
          </div>

          <button
            onClick={onToggleTeacherMode}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
              isTeacherMode
                ? 'bg-purple-950/60 border-purple-500/50 text-purple-300 hover:bg-purple-900/60'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            <span>{isTeacherMode ? 'Teacher Mode: ON' : 'Teacher View'}</span>
          </button>

          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 pl-2 border-l border-slate-800 hover:opacity-90 transition-opacity text-left cursor-pointer"
            title="Open Profile & Milestones"
          >
            <img
              src={student.avatar}
              alt={student.name}
              className="h-8 w-8 rounded-full border border-cyan-500/40 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-200 leading-tight truncate max-w-[100px]">
                {isTeacherMode ? 'Prof. Rishab' : student.name}
              </span>
              <span className="text-[11px] text-slate-400 tabular-nums">
                {isTeacherMode ? 'Head Instructor' : `Lvl ${student.level} · ${student.contestRating}`}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
