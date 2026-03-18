// Exportações centralizadas de todos os projetos
export { payflowProject } from './payflow'
export { taskflowProject } from './taskflow'
export { nexusProject } from './nexus'

import { payflowProject } from './payflow'
import { taskflowProject } from './taskflow'
import { nexusProject } from './nexus'
import type { Project } from '../../types'

// Array com todos os projetos para uso em listagens
export const allProjects: Project[] = [payflowProject, taskflowProject, nexusProject]
