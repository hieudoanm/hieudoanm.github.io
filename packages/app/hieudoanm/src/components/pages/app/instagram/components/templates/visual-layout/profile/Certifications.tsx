import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export const Certifications: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Certifications';
  const certs = (data.certs as Certification[]) ?? [
    {
      name: 'Google UX Design Professional',
      issuer: 'Google',
      date: '2023',
      credentialId: 'GUXD-12345',
    },
    {
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2022',
      credentialId: 'AWS-CP-67890',
    },
    {
      name: 'Certified Scrum Master',
      issuer: 'Scrum Alliance',
      date: '2021',
    },
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <span className="text-accent mb-3 text-[10px] font-bold tracking-[0.2em] uppercase">
        {title}
      </span>

      <div className="flex flex-1 flex-col gap-3">
        {certs.map((c, i) => (
          <div key={i} className="rounded-lg border border-[#e5e7eb] p-4">
            <div className="flex items-start justify-between">
              <span className="text-base-content text-xs font-bold">
                {c.name}
              </span>
              <span className="text-accent bg-accent/10 rounded px-2 py-0.5 text-[9px] font-semibold">
                {c.date}
              </span>
            </div>
            <span className="text-neutral mt-1 block text-[11px]">
              {c.issuer}
            </span>
            {c.credentialId && (
              <span className="text-neutral mt-1 block font-mono text-[9px]">
                ID: {c.credentialId}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Certifications.displayName = 'Certifications';
