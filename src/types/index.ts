export type Difficulty = 'easy' | 'medium' | 'hard'
export type Level = 'junior' | 'mid' | 'senior'

export interface Resource {
  type: 'article' | 'video' | 'docs' | 'course'
  title: string
  url: string
  free: boolean
}

export interface Topic {
  id: string
  title: string
  level: Level
  difficulty: Difficulty
  estimatedHours: number
  description: string
  whyItMatters: string
  mustKnowWithout: string[]
  resources: Resource[]
}

export interface Phase {
  id: string
  title: string
  topics: Topic[]
}

export interface Roadmap {
  id: string
  title: string
  description: string
  phases: Phase[]
}

export interface UserProgress {
  topicId: string
  completed: boolean
}

export interface UserNote {
  topicId: string
  content: string
}

export interface ProjectTask {
  id: string
  title: string
  difficulty: Difficulty
  estimatedHours: number
  description: string
  criteria: string
  resources: Resource[]
}

export interface ProjectPhase {
  id: string
  title: string
  tasks: ProjectTask[]
}

export interface Project {
  id: string
  title: string
  description: string
  stack: string
  domain: string
  phases: ProjectPhase[]
}
