export const YAML_TEMPLATE = `
resume:
  info:
    name: "Hieu Doan"
    title: "Senior Software Engineer"
    mobile: "+84 123 456 789"
    email: "hieu@example.com"
    website: "https://hieudoanm.github.io"
    address: "Ho Chi Minh City, Vietnam"
  theme: "modern"
  ats:
    keywords: ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS"]
  sections:
    experiences:
      - company: "Tech Solutions Inc."
        position: "Senior Frontend Engineer"
        start_date: "2020-01"
        end_date: "Present"
        highlights:
          - "Led the development of a high-traffic e-commerce platform using React and Next.js."
          - "Optimized application performance, reducing load times by 40%."
    education:
      - institution: "University of Science"
        degree: "Bachelor of Computer Science"
        start_date: "2012-09"
        end_date: "2016-06"
    projects:
      - name: "Resume Builder"
        description: "A real-time YAML-based resume generator."
        link: "https://github.com/hieudoanm/resume-builder"
    skills:
      - name: "Languages"
        keywords: ["JavaScript", "TypeScript", "Python", "Go"]
      - name: "Frameworks"
        keywords: ["React", "Next.js", "Node.js", "Express"]
`;

export type ParseResult =
  | { ok: true; doc: unknown }
  | { ok: false; error: string };
