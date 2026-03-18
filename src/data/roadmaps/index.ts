// Exportações centralizadas de todos os roadmaps
export { backendRoadmap } from './backend'
export { frontendRoadmap } from './frontend'
export { devopsRoadmap } from './devops'
export { databaseRoadmap } from './database'
export { systemDesignRoadmap } from './system-design'

import { backendRoadmap } from './backend'
import { frontendRoadmap } from './frontend'
import { devopsRoadmap } from './devops'
import { databaseRoadmap } from './database'
import { systemDesignRoadmap } from './system-design'
import type { Roadmap } from '../../types'

// Array com todos os roadmaps para uso em listagens
export const allRoadmaps: Roadmap[] = [
  backendRoadmap,
  frontendRoadmap,
  devopsRoadmap,
  databaseRoadmap,
  systemDesignRoadmap,
]
