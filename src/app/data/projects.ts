export type Employer = 'Publicis Sapient' | 'TCS';
export type ProjectFilter = 'All work' | Employer;
export interface Project {
  readonly name: string;
  readonly category: Employer;
  readonly type: string;
  readonly style: string;
  readonly metric: string;
  readonly label: string;
  readonly description: string;
  readonly stack: string;
}
export const PROJECTS: readonly Project[] = [
  {
    name: 'Automotive finance onboarding',
    category: 'Publicis Sapient',
    type: 'Authentication / Onboarding / Performance',
    style: 'orbit',
    metric: '80% → 90%',
    label: 'Account-creation conversion',
    description:
      'Redesigned authentication and onboarding flows for a major automotive-finance client, streamlining decision trees and improving platform performance. UX and performance improvements also cut call-center support requests by 50%.',
    stack: 'Angular / Frontend architecture / UX optimization',
  },
  {
    name: 'SBI Card Connect Portal',
    category: 'TCS',
    type: 'Financial services / Customer portal',
    style: 'forma',
    metric: '+60%',
    label: 'Customer traffic',
    description:
      'Built a high-performance Connect Portal for SBI Card, driving a 60% increase in customer traffic. Developed responsive web experiences and reusable UI component libraries to improve consistency and maintainability.',
    stack: 'Angular / TypeScript / JavaScript / CSS3',
  },
  {
    name: 'SBI Card dispute resolution',
    category: 'TCS',
    type: 'Financial services / Digital self-service',
    style: 'offscript',
    metric: '-30%',
    label: 'Call-center inquiry load',
    description:
      'Developed an online dispute-resolution portal for SBI Card, cutting call-center inquiry load by 30% and giving customers a responsive digital channel to resolve disputes.',
    stack: 'Angular / Responsive web development / Reusable components',
  },
];
