import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { CoursesView } from './components/CoursesView';
import { ContestsView } from './components/ContestsView';
import { CommunityView } from './components/CommunityView';
import { ArchitectureModal } from './components/ArchitectureModal';
import { ProfileModal } from './components/ProfileModal';
import {
  INITIAL_STUDENT_PROFILE,
  COURSES_DATA,
  CONTESTS_DATA,
  LEADERBOARD_DATA,
  COMMUNITY_POSTS,
  DAILY_ACTIVITIES
} from './data/mockData';
import { Course, Contest, CommunityPost, CommunityReply, StudentProfile } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'courses' | 'contests' | 'community'>('dashboard');
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTeacherMode, setIsTeacherMode] = useState(false);

  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('skilio_student');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_STUDENT_PROFILE;
  });

  const [courses, setCourses] = useState(COURSES_DATA);
  const [contests, setContests] = useState(CONTESTS_DATA);
  const [leaderboard, setLeaderboard] = useState(LEADERBOARD_DATA);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    try {
      const saved = localStorage.getItem('skilio_posts');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return COMMUNITY_POSTS;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    try {
      localStorage.setItem('skilio_student', JSON.stringify(student));
    } catch (e) {}
  }, [student]);

  useEffect(() => {
    try {
      localStorage.setItem('skilio_posts', JSON.stringify(communityPosts));
    } catch (e) {}
  }, [communityPosts]);

  const handleToggleEnroll = (courseId: string) => {
    setStudent((prev) => {
      const isEnrolled = prev.enrolledCourseIds.includes(courseId);
      const updated = isEnrolled
        ? prev.enrolledCourseIds.filter((id) => id !== courseId)
        : [...prev.enrolledCourseIds, courseId];

      showToast(isEnrolled ? 'Course dropped from dashboard.' : 'Successfully enrolled in course track!');
      return { ...prev, enrolledCourseIds: updated };
    });
  };

  const handleToggleCompleteLesson = (lessonId: string) => {
    setStudent((prev) => {
      const isCompleted = prev.completedLessonIds.includes(lessonId);
      const updated = isCompleted
        ? prev.completedLessonIds.filter((id) => id !== lessonId)
        : [...prev.completedLessonIds, lessonId];

      const newHours = isCompleted
        ? Math.max(0, prev.hoursStudied - 0.75)
        : +(prev.hoursStudied + 0.75).toFixed(1);

      const newXp = isCompleted ? prev.xp - 50 : prev.xp + 100;

      showToast(isCompleted ? 'Lesson marked incomplete.' : 'Lesson completed! +100 XP awarded.');

      return {
        ...prev,
        completedLessonIds: updated,
        hoursStudied: newHours,
        xp: Math.max(0, newXp),
      };
    });
  };

  const handleSolveProblem = (points: number) => {
    setStudent((prev) => {
      const newRating = prev.contestRating + 24;
      const newScore = prev.xp + points;
      const newProblems = prev.totalProblemsSolved + 1;

      setLeaderboard((prevLb) =>
        prevLb.map((entry) =>
          entry.isCurrentUser
            ? {
                ...entry,
                score: entry.score + points,
                problemsSolved: Math.min(3, entry.problemsSolved + 1),
                rating: newRating,
              }
            : entry
        )
      );

      showToast(`Challenge Solved! +${points} Contest Points & +24 Rating!`);

      return {
        ...prev,
        totalProblemsSolved: newProblems,
        contestRating: newRating,
        xp: newScore,
      };
    });
  };

  const handleRegisterContest = (contestId: string) => {
    setContests((prev) =>
      prev.map((c) =>
        c.id === contestId ? { ...c, registered: !c.registered } : c
      )
    );
    showToast('Registration confirmed for upcoming contest arena!');
  };

  const handleAddPost = (newPostData: Omit<CommunityPost, 'id' | 'votes' | 'replies' | 'createdAt'>) => {
    const newPost: CommunityPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      votes: 1,
      hasUpvoted: true,
      createdAt: 'Just now',
      replies: [],
    };
    setCommunityPosts((prev) => [newPost, ...prev]);
    showToast('Your question was posted to the student forum!');
  };

  const handleAddReply = (
    postId: string,
    replyData: Omit<CommunityReply, 'id' | 'votes' | 'createdAt' | 'isAcceptedSolution'>
  ) => {
    const newReply: CommunityReply = {
      ...replyData,
      id: `rep-${Date.now()}`,
      votes: 0,
      isAcceptedSolution: false,
      createdAt: 'Just now',
    };

    setCommunityPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, replies: [...post.replies, newReply] }
          : post
      )
    );
    showToast('Reply published to discussion thread!');
  };

  const handleToggleVotePost = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const hasVoted = p.hasUpvoted;
        return {
          ...p,
          hasUpvoted: !hasVoted,
          votes: hasVoted ? p.votes - 1 : p.votes + 1,
        };
      })
    );
  };

  const handleToggleVoteReply = (postId: string, replyId: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          replies: post.replies.map((r) => {
            if (r.id !== replyId) return r;
            const hasVoted = r.hasUpvoted;
            return {
              ...r,
              hasUpvoted: !hasVoted,
              votes: hasVoted ? r.votes - 1 : r.votes + 1,
            };
          }),
        };
      })
    );
  };

  const handleMarkAcceptedSolution = (postId: string, replyId: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          isSolved: true,
          replies: post.replies.map((r) => ({
            ...r,
            isAcceptedSolution: r.id === replyId,
          })),
        };
      })
    );
    showToast('Marked as accepted solution!');
  };

  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setStudent((prev) => ({ ...prev, ...updated }));
    showToast('Profile information successfully saved!');
  };

  const handleResetData = () => {
    setStudent(INITIAL_STUDENT_PROFILE);
    setCommunityPosts(COMMUNITY_POSTS);
    setContests(CONTESTS_DATA);
    try {
      localStorage.removeItem('skilio_student');
      localStorage.removeItem('skilio_posts');
    } catch (e) {}
    setIsProfileOpen(false);
    showToast('Platform demo state reset to baseline.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        student={student}
        isTeacherMode={isTeacherMode}
        onToggleTeacherMode={() => setIsTeacherMode(!isTeacherMode)}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentTab === 'dashboard' && (
          <DashboardView
            student={student}
            courses={courses}
            contests={contests}
            activities={DAILY_ACTIVITIES}
            onOpenCourse={() => setCurrentTab('courses')}
            onOpenContest={() => setCurrentTab('contests')}
            onNavigateToTab={setCurrentTab}
            isTeacherMode={isTeacherMode}
          />
        )}

        {currentTab === 'courses' && (
          <CoursesView
            courses={courses}
            enrolledCourseIds={student.enrolledCourseIds}
            completedLessonIds={student.completedLessonIds}
            onToggleEnroll={handleToggleEnroll}
            onToggleCompleteLesson={handleToggleCompleteLesson}
            isTeacherMode={isTeacherMode}
          />
        )}

        {currentTab === 'contests' && (
          <ContestsView
            contests={contests}
            leaderboard={leaderboard}
            student={student}
            onSolveProblem={handleSolveProblem}
            onRegisterContest={handleRegisterContest}
            isTeacherMode={isTeacherMode}
          />
        )}

        {currentTab === 'community' && (
          <CommunityView
            posts={communityPosts}
            student={student}
            onAddPost={handleAddPost}
            onAddReply={handleAddReply}
            onToggleVotePost={handleToggleVotePost}
            onToggleVoteReply={handleToggleVoteReply}
            onMarkAcceptedSolution={handleMarkAcceptedSolution}
            isTeacherMode={isTeacherMode}
          />
        )}
      </main>

      {isArchitectureOpen && (
        <ArchitectureModal onClose={() => setIsArchitectureOpen(false)} />
      )}

      {isProfileOpen && (
        <ProfileModal
          student={student}
          onClose={() => setIsProfileOpen(false)}
          onUpdateProfile={handleUpdateProfile}
          onResetData={handleResetData}
          isTeacherMode={isTeacherMode}
        />
      )}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-cyan-500/40 bg-slate-900 px-4 py-3 text-xs font-semibold text-slate-100 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-4 w-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
