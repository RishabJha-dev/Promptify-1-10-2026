export type CourseCategory = 'all' | 'dsa' | 'frontend' | 'backend' | 'fullstack';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  avatar: string;
  headline: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  currentStreak: number;
  maxStreak: number;
  hoursStudied: number;
  totalProblemsSolved: number;
  contestRating: number;
  rankTitle: string;
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  bookmarkedPostIds: string[];
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isPrivate?: boolean;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  type: 'video' | 'coding' | 'article';
  durationMinutes: number;
  isCompleted: boolean;
  summary: string;
  instructorNotes: string;
  codeStarter?: string;
  codeSolution?: string;
  language?: string;
  testCases?: TestCase[];
}

export interface Module {
  id: string;
  title: string;
  durationHours: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  category: 'dsa' | 'frontend' | 'backend' | 'fullstack';
  categoryLabel: string;
  level: DifficultyLevel;
  description: string;
  longDescription: string;
  durationHours: number;
  totalLessons: number;
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  thumbnail: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  prerequisites: string[];
  skillsGained: string[];
  modules: Module[];
}

export interface Problem {
  id: string;
  contestId: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptanceRate: number;
  points: number;
  tags: string[];
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    javascript: string;
    typescript: string;
    python: string;
    cpp: string;
  };
  testCases: TestCase[];
}

export interface Contest {
  id: string;
  title: string;
  status: 'live' | 'upcoming' | 'past';
  startDate: string;
  durationMinutes: number;
  participantsCount: number;
  difficulty: DifficultyLevel;
  prizePool?: string;
  registered: boolean;
  description: string;
  problems: Problem[];
}

export interface LeaderboardEntry {
  rank: number;
  studentName: string;
  avatar: string;
  score: number;
  rating: number;
  problemsSolved: number;
  timeTaken: string;
  rankTitle: string;
  isCurrentUser?: boolean;
}

export interface CommunityReply {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: 'Student' | 'Teacher' | 'Teaching Assistant';
    isVerifiedInstructor?: boolean;
  };
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  votes: number;
  hasUpvoted?: boolean;
  isAcceptedSolution: boolean;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: 'Student' | 'Teacher' | 'Teaching Assistant';
    badge: string;
  };
  title: string;
  content: string;
  category: 'dsa' | 'frontend' | 'backend' | 'career' | 'general';
  tags: string[];
  votes: number;
  hasUpvoted?: boolean;
  isSolved: boolean;
  createdAt: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  replies: CommunityReply[];
}

export interface DailyActivity {
  day: string;
  date: string;
  hours: number;
  problemsCount: number;
  level: 0 | 1 | 2 | 3;
}
