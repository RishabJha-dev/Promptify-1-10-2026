# 🎓 Skilio — Full Stack & DSA Educational Platform
> **LEARN · GROW · ACHIEVE**  
> A high-performance, dark-themed developer education ecosystem engineered for students to master **Data Structures & Algorithms (DSA)**, **Modern Frontend Engineering**, **Distributed Backend Systems**, and **Production Full Stack Web Architecture**.

---

## 📋 Table of Contents
- [Tech Stack Specification](#-tech-stack-specification)
- [Key Features](#-key-features)
  - [1. Student Analytics Dashboard](#1-student-analytics-dashboard)
  - [2. Curriculum Tracks & Monaco Sandbox](#2-curriculum-tracks--monaco-sandbox)
  - [3. Contest Arena & Live Leaderboard](#3-contest-arena--live-leaderboard)
  - [4. Community Doubt Clearing Forum](#4-community-doubt-clearing-forum)
  - [5. Interactive Architecture Blueprint](#5-interactive-architecture-blueprint)
- [System Architecture Topology](#-system-architecture-topology)
- [Database Schema (Prisma ORM)](#-database-schema-prisma-orm)
- [Docker Sandbox Execution Pipeline](#-docker-sandbox-execution-pipeline)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started & Installation](#-getting-started--installation)
- [Environment Variables](#-environment-variables)
- [Scripts & Commands](#-scripts--commands)
- [License](#-license)

---

## ⚡ Tech Stack Specification

| Part | Technology | Language | Architecture Role |
| :--- | :--- | :--- | :--- |
| **Frontend** | **Next.js + React** | **TypeScript** | App Router, Server Components (RSC), Client state management |
| **UI** | **Tailwind CSS + shadcn/ui** | **TypeScript / CSS** | Radix UI primitives, dark modern theme, accessible keyboard traps |
| **Backend API** | **NestJS** | **TypeScript** | Modular controllers, Dependency Injection, validation pipes, Swagger |
| **Database** | **PostgreSQL** | **SQL** | Relational 3NF data integrity, ACID transactions, B-Tree indexes |
| **ORM** | **Prisma** | **TypeScript** | Type-safe migrations, auto-generated TypeScript client, relations |
| **Authentication** | **Auth.js / Clerk** | **TypeScript** | Session tokens, multi-role RBAC (`STUDENT` vs `TEACHER`), HttpOnly cookies |
| **Cache** | **Redis** | — | **Sorted Sets (`ZSET`)** for live leaderboard rankings, rate limiting |
| **Real-time Community**| **WebSockets / Socket.IO** | **TypeScript** | Bidirectional doubt threads, live contest countdowns, presence |
| **Code Editor** | **Monaco Editor** | **TypeScript** | VS Code web engine, syntax highlighting, autocomplete, keybindings |
| **Code Execution** | **Docker sandbox** | **TypeScript + Docker**| Ephemeral containers, Linux cgroups v2 (256MB cap), 2.0s timeouts |
| **File Storage** | **S3-compatible storage** | — | AWS S3 / Cloudflare R2 for project downloads and code exports |
| **Video Delivery** | **Cloud storage + CDN** | — | HLS video chunk streaming via Cloudflare Stream / AWS CloudFront |
| **Deployment** | **Vercel + Railway / AWS**| — | Next.js on Vercel Edge; NestJS + Workers on Railway or AWS ECS |
| **Testing** | **Vitest / Jest + Playwright** | **TypeScript** | Unit testing services with Vitest; E2E flows with Playwright |
| **Version Control** | **GitHub** | — | GitHub Actions CI/CD pipeline, automated linting, test suites |

---

## 🚀 Key Features

### 1. Student Analytics Dashboard
- **Streak & Cadence Engine**: Consecutive coding streak counter (`14d flame 🔥`), maximum historical streak (`29d`), and weekly study heatmap across Monday–Sunday with proportional intensity levels.
- **Metric Analytics**: Live tracking of total hours studied (`68.5 hrs`), problems solved (`142`), and global competitive rating (`1748 · Knight`).
- **Course Continuations**: 1-click resumption of active modules with real-time course completion percentages.
- **Teacher's Masterclass Note**: Invariant guidance from Prof. Rishab on dry-running corner test cases and eliminating unhandled connection pool drops.

### 2. Curriculum Tracks & Monaco Sandbox
- **4 Specialized Tracks**:
  - **Data Structures & Algorithms**: Two-pointer convergence, sliding window, binary trees, dynamic programming space compression ($O(W)$), and graph traversals.
  - **Frontend Engineering**: React 19 concurrent work loops, virtual list DOM recycling, custom hook invariants, and Web Core Vitals.
  - **Backend Systems**: High-throughput HTTP engines, Redis cache-aside architectures, PostgreSQL connection pools, and distributed token-bucket rate limiting.
  - **Full Stack Web Architecture**: End-to-end type contracts, resilient WebSockets with exponential backoff, Docker containers, and CI/CD pipelines.
- **Monaco-Style IDE**: Gutter line numbers, Tab-key indentation (2 spaces), live cursor position (`Ln`, `Col`), test case runner, and progress persistence.

### 3. Contest Arena & Live Leaderboard
- **Live Speed Challenge #14**: Active contest with live, per-second ticking countdown timer.
- **In-Arena Problem Solver**: Split-screen problem specifications, multi-language selector (TypeScript, Python, C++, JavaScript), public test cases tabs, and Judge0-style test runners.
- **Live Scoring & Rating**: Submissions dynamically award points, increment rating by +24, and re-rank the global leaderboard.
- **Competitive Leaderboard**: Filterable rankings displaying solve times, Grandmaster/Master/Knight rank badges, and points.

### 4. Community Doubt Clearing Forum
- **Categorized Channels**: DSA Doubts, Frontend UI, Backend & DB, Career Roadmap, and General Dev discussions.
- **Question Submission**: Post doubts with title, category, explanation, topic tags, and syntax-highlighted code snippets.
- **Threaded Solutions**: Peer reviews, verified teacher answers with badges, upvoting, and "Mark as Accepted Solution".

### 5. Interactive Architecture Blueprint
- **Tech Stack Matrix**: 15-row table covering all infrastructure components and languages.
- **Prisma Schema (`schema.prisma`)**: Complete declarative database model with 1-click copy support.
- **Docker Sandbox Runner**: Container flags (`--network none`, `--memory 256m`, `timeout 2.0s`) for secure DSA and Web code execution.

---

## 🏗️ System Architecture Topology
