
export enum ModuleType {
  PROBLEM_BASE = 'PROBLEM_BASE',
  RESOURCE = 'RESOURCE',
  SCAFFOLDING = 'SCAFFOLDING',
  COACHING = 'COACHING',
  COLLABORATION = 'COLLABORATION',
  REFLECTION = 'REFLECTION',
  ANALYTICAL_TEST = 'ANALYTICAL_TEST',
  ACHIEVEMENT_TEST = 'ACHIEVEMENT_TEST'
}

export interface Force {
  id: string;
  x: number;
  y: number;
  magnitude: number;
  angle: number;
  label: string;
}

export interface Scenario {
  id: string;
  title: string;
  image: string;
  description: string;
  questions: string[];
}
