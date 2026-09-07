import type { ComponentType } from 'react';
import type { TemplateProps } from './types';

import { CeremonyTemplate } from './classic/CeremonyTemplate';
import { ClassicTemplate } from './classic/ClassicTemplate';
import { ElegantTemplate } from './classic/ElegantTemplate';
import { InkwellTemplate } from './classic/InkwellTemplate';
import { PinnacleTemplate } from './classic/PinnacleTemplate';
import { TerraTemplate } from './classic/TerraTemplate';
import { TopazTemplate } from './classic/TopazTemplate';
import { VintageTemplate } from './classic/VintageTemplate';

import { AlignTemplate } from './minimal/AlignTemplate';
import { CompactTemplate } from './minimal/CompactTemplate';
import { LatticeTemplate } from './minimal/LatticeTemplate';
import { MinimalTemplate } from './minimal/MinimalTemplate';
import { QuartzTemplate } from './minimal/QuartzTemplate';
import { SimpleTemplate } from './minimal/SimpleTemplate';
import { SlateTemplate } from './minimal/SlateTemplate';
import { ZenTemplate } from './minimal/ZenTemplate';

import { AuroraTemplate } from './sidebar/AuroraTemplate';
import { BeaconTemplate } from './sidebar/BeaconTemplate';
import { DuskTemplate } from './sidebar/DuskTemplate';
import { HarborTemplate } from './sidebar/HarborTemplate';
import { IrisTemplate } from './sidebar/IrisTemplate';
import { ModernTemplate } from './sidebar/ModernTemplate';
import { NovaTemplate } from './sidebar/NovaTemplate';
import { WillowTemplate } from './sidebar/WillowTemplate';

import { EmberTemplate } from './bands/EmberTemplate';
import { ExecutiveTemplate } from './bands/ExecutiveTemplate';
import { KineticTemplate } from './bands/KineticTemplate';
import { MeadowTemplate } from './bands/MeadowTemplate';
import { SterlingTemplate } from './bands/SterlingTemplate';
import { SummitTemplate } from './bands/SummitTemplate';
import { TimberTemplate } from './bands/TimberTemplate';
import { WaveTemplate } from './bands/WaveTemplate';

import { AmberTemplate } from './colorful/AmberTemplate';
import { AzureTemplate } from './colorful/AzureTemplate';
import { GlowTemplate } from './colorful/GlowTemplate';
import { PrismTemplate } from './colorful/PrismTemplate';
import { PulseTemplate } from './colorful/PulseTemplate';
import { SaffronTemplate } from './colorful/SaffronTemplate';
import { SolTemplate } from './colorful/SolTemplate';
import { SolsticeTemplate } from './colorful/SolsticeTemplate';

import { FloraTemplate } from './natural/FloraTemplate';
import { GroveTemplate } from './natural/GroveTemplate';
import { NectarTemplate } from './natural/NectarTemplate';
import { OasisTemplate } from './natural/OasisTemplate';
import { PeaksTemplate } from './natural/PeaksTemplate';
import { PineTemplate } from './natural/PineTemplate';
import { RidgeTemplate } from './natural/RidgeTemplate';
import { TideTemplate } from './natural/TideTemplate';

import { BreezeTemplate } from './soft/BreezeTemplate';
import { CanvasTemplate } from './soft/CanvasTemplate';
import { CopperTemplate } from './soft/CopperTemplate';
import { CoralTemplate } from './soft/CoralTemplate';
import { MarbleTemplate } from './soft/MarbleTemplate';
import { OpalTemplate } from './soft/OpalTemplate';
import { RoseTemplate } from './soft/RoseTemplate';
import { SherbetTemplate } from './soft/SherbetTemplate';

import { AcademicTemplate } from './specialty/AcademicTemplate';
import { BoldTemplate } from './specialty/BoldTemplate';
import { CreativeTemplate } from './specialty/CreativeTemplate';
import { MuseTemplate } from './specialty/MuseTemplate';
import { OrbitTemplate } from './specialty/OrbitTemplate';
import { ProfessionalTemplate } from './specialty/ProfessionalTemplate';
import { SierraTemplate } from './specialty/SierraTemplate';
import { TechnicalTemplate } from './specialty/TechnicalTemplate';

export const TEMPLATE_GROUPS = [
  { id: 'classic', label: 'Classic & Formal' },
  { id: 'minimal', label: 'Minimal & Clean' },
  { id: 'sidebar', label: 'Sidebar Layouts' },
  { id: 'bands', label: 'Header Bands' },
  { id: 'colorful', label: 'Colorful & Gradient' },
  { id: 'natural', label: 'Nature & Earth' },
  { id: 'soft', label: 'Soft & Neutral' },
  { id: 'specialty', label: 'Specialty' },
] as const;

export type TemplateGroupId = (typeof TEMPLATE_GROUPS)[number]['id'];

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  group: TemplateGroupId;
  component: ComponentType<TemplateProps>;
}

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless serif layout with a centered header.',
    group: 'classic',
    component: ClassicTemplate,
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Refined serif layout with a muted palette.',
    group: 'classic',
    component: ElegantTemplate,
  },
  {
    id: 'topaz',
    name: 'Topaz',
    description: 'Golden serif layout for a luxurious feel.',
    group: 'classic',
    component: TopazTemplate,
  },
  {
    id: 'inkwell',
    name: 'Inkwell',
    description: 'Vintage letterpress styling on cream paper.',
    group: 'classic',
    component: InkwellTemplate,
  },
  {
    id: 'pinnacle',
    name: 'Pinnacle',
    description: 'Centered small-caps with fine rules.',
    group: 'classic',
    component: PinnacleTemplate,
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Classic letterpress centerpiece with rules.',
    group: 'classic',
    component: VintageTemplate,
  },
  {
    id: 'terra',
    name: 'Terra',
    description: 'Earthen serif layout with wheat rules.',
    group: 'classic',
    component: TerraTemplate,
  },
  {
    id: 'ceremony',
    name: 'Ceremony',
    description: 'Refined indigo header for formal occasions.',
    group: 'classic',
    component: CeremonyTemplate,
  },

  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Airy, clean, and typography-focused.',
    group: 'minimal',
    component: MinimalTemplate,
  },
  {
    id: 'slate',
    name: 'Slate',
    description: 'Monochrome sophistication with fine rules.',
    group: 'minimal',
    component: SlateTemplate,
  },
  {
    id: 'quartz',
    name: 'Quartz',
    description: 'Airy layout with soft violet accents.',
    group: 'minimal',
    component: QuartzTemplate,
  },
  {
    id: 'lattice',
    name: 'Lattice',
    description: 'Geometric dotted grid with ruled sections.',
    group: 'minimal',
    component: LatticeTemplate,
  },
  {
    id: 'simple',
    name: 'Simple',
    description: 'Plain, direct, and easy to scan.',
    group: 'minimal',
    component: SimpleTemplate,
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Dense single-page resume for tight experience.',
    group: 'minimal',
    component: CompactTemplate,
  },
  {
    id: 'align',
    name: 'Align',
    description: 'Strict grid with left-aligned section labels.',
    group: 'minimal',
    component: AlignTemplate,
  },
  {
    id: 'zen',
    name: 'Zen',
    description: 'Centered, airy, and editorial in its calm.',
    group: 'minimal',
    component: ZenTemplate,
  },

  {
    id: 'modern',
    name: 'Modern',
    description: 'Two columns with a colored sidebar.',
    group: 'sidebar',
    component: ModernTemplate,
  },
  {
    id: 'beacon',
    name: 'Beacon',
    description: 'Navy sidebar with warm amber highlights.',
    group: 'sidebar',
    component: BeaconTemplate,
  },
  {
    id: 'nova',
    name: 'Nova',
    description: 'Dark futuristic layout with neon accents.',
    group: 'sidebar',
    component: NovaTemplate,
  },
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Gradient header with a vibrant palette.',
    group: 'sidebar',
    component: AuroraTemplate,
  },
  {
    id: 'dusk',
    name: 'Dusk',
    description: 'Twilight sideband with dusk-glowing labels.',
    group: 'sidebar',
    component: DuskTemplate,
  },
  {
    id: 'iris',
    name: 'Iris',
    description: 'Violet side panel with petal-shaped accents.',
    group: 'sidebar',
    component: IrisTemplate,
  },
  {
    id: 'harbor',
    name: 'Harbor',
    description: 'Nautical navy side rail with white space.',
    group: 'sidebar',
    component: HarborTemplate,
  },
  {
    id: 'willow',
    name: 'Willow',
    description: 'Green sidebar with nature-led labels.',
    group: 'sidebar',
    component: WillowTemplate,
  },

  {
    id: 'executive',
    name: 'Executive',
    description: 'Distinctive dark header band for leadership roles.',
    group: 'bands',
    component: ExecutiveTemplate,
  },
  {
    id: 'meadow',
    name: 'Meadow',
    description: 'Calming green palette inspired by nature.',
    group: 'bands',
    component: MeadowTemplate,
  },
  {
    id: 'ember',
    name: 'Ember',
    description: 'Warm orange gradient with cozy accents.',
    group: 'bands',
    component: EmberTemplate,
  },
  {
    id: 'timber',
    name: 'Timber',
    description: 'Earthy brown tones on a warm background.',
    group: 'bands',
    component: TimberTemplate,
  },
  {
    id: 'sterling',
    name: 'Sterling',
    description: 'Finance-focused navy header with clean lines.',
    group: 'bands',
    component: SterlingTemplate,
  },
  {
    id: 'summit',
    name: 'Summit',
    description: 'Bold navy header with an angled edge.',
    group: 'bands',
    component: SummitTemplate,
  },
  {
    id: 'wave',
    name: 'Wave',
    description: 'Fluid gradient bands with a curved header.',
    group: 'bands',
    component: WaveTemplate,
  },
  {
    id: 'kinetic',
    name: 'Kinetic',
    description: 'Angular header with a diagonal color block.',
    group: 'bands',
    component: KineticTemplate,
  },

  {
    id: 'amber',
    name: 'Amber',
    description: 'Warm amber gradient with soft rounded panels.',
    group: 'colorful',
    component: AmberTemplate,
  },
  {
    id: 'azure',
    name: 'Azure',
    description: 'Cool blue gradient with crisp white panels.',
    group: 'colorful',
    component: AzureTemplate,
  },
  {
    id: 'sol',
    name: 'Sol',
    description: 'Sunshine banner with warm amber details.',
    group: 'colorful',
    component: SolTemplate,
  },
  {
    id: 'solstice',
    name: 'Solstice',
    description: 'Starry dark canvas with moonlit rules.',
    group: 'colorful',
    component: SolsticeTemplate,
  },
  {
    id: 'glow',
    name: 'Glow',
    description: 'Midnight base with luminous teal highlights.',
    group: 'colorful',
    component: GlowTemplate,
  },
  {
    id: 'pulse',
    name: 'Pulse',
    description: 'Techy monospace look with cyan signals.',
    group: 'colorful',
    component: PulseTemplate,
  },
  {
    id: 'saffron',
    name: 'Saffron',
    description: 'Spiced orange header over gentle linen.',
    group: 'colorful',
    component: SaffronTemplate,
  },
  {
    id: 'prism',
    name: 'Prism',
    description: 'Rainbow side rail over a clean stack.',
    group: 'colorful',
    component: PrismTemplate,
  },

  {
    id: 'grove',
    name: 'Grove',
    description: 'Forest-toned bars and leaf-inspired headings.',
    group: 'natural',
    component: GroveTemplate,
  },
  {
    id: 'flora',
    name: 'Flora',
    description: 'Botanical green accents on a soft garden wash.',
    group: 'natural',
    component: FloraTemplate,
  },
  {
    id: 'pine',
    name: 'Pine',
    description: 'Evergreen header with crisp white canvas.',
    group: 'natural',
    component: PineTemplate,
  },
  {
    id: 'nectar',
    name: 'Nectar',
    description: 'Honey and goldenrod palette with soft honeycomb.',
    group: 'natural',
    component: NectarTemplate,
  },
  {
    id: 'oasis',
    name: 'Oasis',
    description: 'Desert vista with teal accents and airy space.',
    group: 'natural',
    component: OasisTemplate,
  },
  {
    id: 'peaks',
    name: 'Peaks',
    description: 'Alpine frames with muted slate mountains.',
    group: 'natural',
    component: PeaksTemplate,
  },
  {
    id: 'tide',
    name: 'Tide',
    description: 'Seafoam header with teal wave line.',
    group: 'natural',
    component: TideTemplate,
  },
  {
    id: 'ridge',
    name: 'Ridge',
    description: 'Rugged double header with earthy tones.',
    group: 'natural',
    component: RidgeTemplate,
  },

  {
    id: 'sherbet',
    name: 'Sherbet',
    description: 'Pastel sorbet header with pill frames.',
    group: 'soft',
    component: SherbetTemplate,
  },
  {
    id: 'rose',
    name: 'Rose',
    description: 'Soft blush gradients with refined serif.',
    group: 'soft',
    component: RoseTemplate,
  },
  {
    id: 'opal',
    name: 'Opal',
    description: 'Iridescent top band with tonal pastels.',
    group: 'soft',
    component: OpalTemplate,
  },
  {
    id: 'marble',
    name: 'Marble',
    description: 'Stone-gray polished header with thin rules.',
    group: 'soft',
    component: MarbleTemplate,
  },
  {
    id: 'canvas',
    name: 'Canvas',
    description: 'Art-studio neutrals with an accent header strip.',
    group: 'soft',
    component: CanvasTemplate,
  },
  {
    id: 'breeze',
    name: 'Breeze',
    description: 'Light, breathable layout with sky-blue rules.',
    group: 'soft',
    component: BreezeTemplate,
  },
  {
    id: 'copper',
    name: 'Copper',
    description: 'Warm metallic panel with elegant slab accents.',
    group: 'soft',
    component: CopperTemplate,
  },
  {
    id: 'coral',
    name: 'Coral',
    description: 'Vibrant coral band with a playful nameplate.',
    group: 'soft',
    component: CoralTemplate,
  },

  {
    id: 'technical',
    name: 'Technical',
    description: 'Monospace styling with a skills-first focus.',
    group: 'specialty',
    component: TechnicalTemplate,
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Formal layout built for research and academia.',
    group: 'specialty',
    component: AcademicTemplate,
  },
  {
    id: 'orbit',
    name: 'Orbit',
    description: 'Rounded layout with a colorful initials badge.',
    group: 'specialty',
    component: OrbitTemplate,
  },
  {
    id: 'sierra',
    name: 'Sierra',
    description: 'Clean layout with a bold left accent bar.',
    group: 'specialty',
    component: SierraTemplate,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold color blocks and playful accents.',
    group: 'specialty',
    component: CreativeTemplate,
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Strong typography with high contrast.',
    group: 'specialty',
    component: BoldTemplate,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clear structure with refined small-caps headings.',
    group: 'specialty',
    component: ProfessionalTemplate,
  },
  {
    id: 'muse',
    name: 'Muse',
    description: 'Creative black band with electric blue pop.',
    group: 'specialty',
    component: MuseTemplate,
  },
];

export const getTemplate = (id: string): ResumeTemplate =>
  RESUME_TEMPLATES.find((template) => template.id === id) ??
  RESUME_TEMPLATES[0];
