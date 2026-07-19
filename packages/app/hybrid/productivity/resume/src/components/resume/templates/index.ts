import type { ComponentType } from 'react';
import type { TemplateProps } from './types';
import { AcademicTemplate } from './AcademicTemplate';
import { AlignTemplate } from './AlignTemplate';
import { AuroraTemplate } from './AuroraTemplate';
import { BeaconTemplate } from './BeaconTemplate';
import { BoldTemplate } from './BoldTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { CompactTemplate } from './CompactTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { ElegantTemplate } from './ElegantTemplate';
import { EmberTemplate } from './EmberTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { InkwellTemplate } from './InkwellTemplate';
import { KineticTemplate } from './KineticTemplate';
import { LatticeTemplate } from './LatticeTemplate';
import { MeadowTemplate } from './MeadowTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { ModernTemplate } from './ModernTemplate';
import { NovaTemplate } from './NovaTemplate';
import { OrbitTemplate } from './OrbitTemplate';
import { PinnacleTemplate } from './PinnacleTemplate';
import { ProfessionalTemplate } from './ProfessionalTemplate';
import { PulseTemplate } from './PulseTemplate';
import { QuartzTemplate } from './QuartzTemplate';
import { SierraTemplate } from './SierraTemplate';
import { SimpleTemplate } from './SimpleTemplate';
import { SlateTemplate } from './SlateTemplate';
import { SterlingTemplate } from './SterlingTemplate';
import { SummitTemplate } from './SummitTemplate';
import { TechnicalTemplate } from './TechnicalTemplate';
import { TimberTemplate } from './TimberTemplate';
import { TopazTemplate } from './TopazTemplate';
import { WaveTemplate } from './WaveTemplate';

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  component: ComponentType<TemplateProps>;
}

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless serif layout with a centered header.',
    component: ClassicTemplate,
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two columns with a colored sidebar.',
    component: ModernTemplate,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Airy, clean, and typography-focused.',
    component: MinimalTemplate,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clear structure with refined small-caps headings.',
    component: ProfessionalTemplate,
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Distinctive dark header band for leadership roles.',
    component: ExecutiveTemplate,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold color blocks and playful accents.',
    component: CreativeTemplate,
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Formal layout built for research and academia.',
    component: AcademicTemplate,
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Monospace styling with a skills-first focus.',
    component: TechnicalTemplate,
  },
  {
    id: 'simple',
    name: 'Simple',
    description: 'Plain, direct, and easy to scan.',
    component: SimpleTemplate,
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Dense single-page resume for tight experience.',
    component: CompactTemplate,
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Strong typography with high contrast.',
    component: BoldTemplate,
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Refined serif layout with a muted palette.',
    component: ElegantTemplate,
  },
  {
    id: 'nova',
    name: 'Nova',
    description: 'Dark futuristic layout with neon accents.',
    component: NovaTemplate,
  },
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Gradient header with a vibrant palette.',
    component: AuroraTemplate,
  },
  {
    id: 'sierra',
    name: 'Sierra',
    description: 'Clean layout with a bold left accent bar.',
    component: SierraTemplate,
  },
  {
    id: 'lattice',
    name: 'Lattice',
    description: 'Geometric dotted grid with ruled sections.',
    component: LatticeTemplate,
  },
  {
    id: 'pinnacle',
    name: 'Pinnacle',
    description: 'Centered small-caps with fine rules.',
    component: PinnacleTemplate,
  },
  {
    id: 'kinetic',
    name: 'Kinetic',
    description: 'Angular header with a diagonal color block.',
    component: KineticTemplate,
  },
  {
    id: 'beacon',
    name: 'Beacon',
    description: 'Navy sidebar with warm amber highlights.',
    component: BeaconTemplate,
  },
  {
    id: 'meadow',
    name: 'Meadow',
    description: 'Calming green palette inspired by nature.',
    component: MeadowTemplate,
  },
  {
    id: 'ember',
    name: 'Ember',
    description: 'Warm orange gradient with cozy accents.',
    component: EmberTemplate,
  },
  {
    id: 'slate',
    name: 'Slate',
    description: 'Monochrome sophistication with fine rules.',
    component: SlateTemplate,
  },
  {
    id: 'quartz',
    name: 'Quartz',
    description: 'Airy layout with soft violet accents.',
    component: QuartzTemplate,
  },
  {
    id: 'topaz',
    name: 'Topaz',
    description: 'Golden serif layout for a luxurious feel.',
    component: TopazTemplate,
  },
  {
    id: 'align',
    name: 'Align',
    description: 'Strict grid with left-aligned section labels.',
    component: AlignTemplate,
  },
  {
    id: 'pulse',
    name: 'Pulse',
    description: 'Techy monospace look with cyan signals.',
    component: PulseTemplate,
  },
  {
    id: 'orbit',
    name: 'Orbit',
    description: 'Rounded layout with a colorful initials badge.',
    component: OrbitTemplate,
  },
  {
    id: 'timber',
    name: 'Timber',
    description: 'Earthy brown tones on a warm background.',
    component: TimberTemplate,
  },
  {
    id: 'inkwell',
    name: 'Inkwell',
    description: 'Vintage letterpress styling on cream paper.',
    component: InkwellTemplate,
  },
  {
    id: 'sterling',
    name: 'Sterling',
    description: 'Finance-focused navy header with clean lines.',
    component: SterlingTemplate,
  },
  {
    id: 'summit',
    name: 'Summit',
    description: 'Bold navy header with an angled edge.',
    component: SummitTemplate,
  },
  {
    id: 'wave',
    name: 'Wave',
    description: 'Fluid gradient bands with a curved header.',
    component: WaveTemplate,
  },
];

export const getTemplate = (id: string): ResumeTemplate =>
  RESUME_TEMPLATES.find((template) => template.id === id) ??
  RESUME_TEMPLATES[0];
