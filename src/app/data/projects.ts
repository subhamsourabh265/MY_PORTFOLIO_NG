export type Employer = 'Publicis Sapient' | 'Tata Consultancy Services';
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
    name: 'Admin Portal',
    category: 'Publicis Sapient',
    type: 'Modernization / Identity and access management',
    style: 'orbit',
    metric: 'Angular 21',
    label: 'Security and performance modernization',
    description:
      'Modernized a legacy admin portal from PHP pages to Angular 21. Improved application security by integrating Azure AD through MSAL.js for authentication, authorization, and role-based access. Used modern Angular 21 features to improve application performance.',
    stack:
      'Angular 21 / JavaScript / TypeScript / HTML / SCSS / Azure AD / MSAL.js / AWS CloudWatch / CodeBuild / ECS / CodePipeline / Docker / SonarQube / Git',
  },
  {
    name: 'Van Insurance',
    category: 'Publicis Sapient',
    type: 'Insurance / Application architecture',
    style: 'forma',
    metric: 'Architecture',
    label: 'Improved insurance conversions',
    description:
      'Led architecture decisions and built a van insurance application from scratch, improving insurance conversions. The open-market product allows each underwriter to offer cover on their own terms.',
    stack:
      'Angular 14 / JavaScript / TypeScript / HTML / SCSS / AWS CloudWatch / CodeBuild / ECS / CodePipeline / Docker / SonarQube / Git',
  },
  {
    name: 'Universal Access',
    category: 'Publicis Sapient',
    type: 'SSO Integration / Authentication',
    style: 'orbit',
    metric: '95% conversion',
    label: 'Onboarding conversion',
    description:
      'Led integration of ForgeRock for SSO, logout, password reset, account registration and association across web and mobile, streamlining onboarding and enabling account reassociation inside the app to reduce support volume.',
    stack:
      'Angular 21 / TypeScript / Java 8 / Spring Boot / ForgeRock / AWS ECS / CodePipeline / CodeBuild / Cloudflare / SonarQube / GitHub',
  },
  {
    name: 'Your Account',
    category: 'Publicis Sapient',
    type: 'Customer portal / Account management',
    style: 'forma',
    metric: '↑ traffic',
    label: 'Customer traffic',
    description:
      'Rebuilt the Your Account web app with lazy-loaded routes and a UX overhaul; implemented add-on product flows that drove a significant share of overall traffic.',
    stack:
      'Angular 19 / TypeScript / JavaScript / HTML5 / CSS3 / Spring Boot / ForgeRock / AWS CodeBuild / Cloudflare / SonarQube / GitHub',
  },
  {
    name: 'Your Account Renewals',
    category: 'Publicis Sapient',
    type: 'Account renewals / UX',
    style: 'forma',
    metric: '↑ renewals traffic',
    label: 'Renewals engagement',
    description:
      'Added a Renewals experience allowing users to review and modify linked policies, using lazy-loaded routes and UX improvements to increase engagement.',
    stack:
      'Angular 21 / TypeScript / HTML5 / CSS3 / Spring Boot / ForgeRock / AWS ECS / CodePipeline / CodeBuild',
  },
  {
    name: 'Addons for Breakdown Cover',
    category: 'Publicis Sapient',
    type: 'Add-on products / Insurance',
    style: 'forma',
    metric: '↑ traffic & onboarding',
    label: 'Add-ons conversion',
    description:
      'Implemented add-ons such as Parts & Garage Cover, Key Cover, and Commercial Use Vehicle cover. Helped improve traffic and onboarding by optimizing the web apps and product flows.',
    stack:
      'Angular 15 / JavaScript / TypeScript / AWS CodeBuild / AWS CodePipeline / SonarQube / Git',
  },
  {
    name: 'Citiplanner & Citiwatch Migration',
    category: 'Tata Consultancy Services',
    type: 'Migration / Modernization',
    style: 'offscript',
    metric: '↑ traffic post-migration',
    label: 'Migration success',
    description:
      'Migrated a legacy Adobe Flash/Flex application to a modern Angular frontend; designed frontend architecture and led the build, improving performance and maintainability.',
    stack: 'Angular 11 / TypeScript / HTML5 / CSS3 / GitHub / SonarQube',
  },
  {
    name: 'Online Dispute Portal',
    category: 'Tata Consultancy Services',
    type: 'Digital self-service / Disputes',
    style: 'offscript',
    metric: '-50% support load',
    label: 'Call-center load',
    description:
      'Built an online dispute-resolution portal for SBI Card users, providing a responsive digital channel that substantially reduced call-center inquiries.',
    stack: 'Angular 8 / TypeScript / HTML5 / CSS3 / SVN / SonarQube',
  },
  {
    name: 'SBI Connect Portal',
    category: 'Tata Consultancy Services',
    type: 'Onboarding / Employee portal',
    style: 'forma',
    metric: '+60% traffic',
    label: 'Employee onboarding traffic',
    description:
      'Developed the Connect Portal enabling bank employees to onboard credit-card users; implemented a high-performance responsive web experience and reusable components.',
    stack: 'Angular 8 / TypeScript / HTML5 / CSS3 / SVN / SonarQube',
  },
  {
    name: 'Willow (IBM Watson Chatbot)',
    category: 'Tata Consultancy Services',
    type: 'Chatbot / Reliability engineering',
    style: 'orbit',
    metric: 'Reliability improvements',
    label: 'Chatbot reliability',
    description:
      'Worked on an IBM Watson-based chatbot for internal use, focusing on reliability, diagnostics and issue triage using Kibana, Datadog and CloudWatch.',
    stack: 'Node.js / Angular / AWS Lambda / CloudWatch / Datadog / Kibana',
  },
  {
    name: 'E-apply',
    category: 'Tata Consultancy Services',
    type: 'Modernization / Registration application',
    style: 'offscript',
    metric: '↑ applications',
    label: 'Credit-card applications',
    description:
      'Modernized the SBI Card registration application from JSP pages to Angular 8. Implemented lazy loading, accessibility improvements, and reactive forms to boost performance and increase credit-card applications.',
    stack: 'Angular 8 / TypeScript / JavaScript / HTML5 / SCSS / SVN',
  },
  {
    name: 'Kaufland Enterprise Product',
    category: 'Tata Consultancy Services',
    type: 'Enterprise application / Database development',
    style: 'offscript',
    metric: 'ASP.NET',
    label: 'Code quality and database development',
    description:
      'Contributed to the Kaufland Enterprise Product in my first project at Tata Consultancy Services. Addressed code-quality issues and created database schemas and tables under the guidance of senior developers.',
    stack: 'ASP.NET / SQL Server / DynamoDB',
  },
];
