import { FC } from 'react'
import { AboutTemplate } from '@/components/templates/AboutTemplate'

const AboutPage: FC = () => (
  <div className="flex flex-col">
    <AboutTemplate
      name="Calendar"
      description="A calendar productivity app with multiple views including daily, weekly, monthly, quarterly, half, and yearly."
      version="0.0.0"
      items={[
        { label: 'Package', value: '@hieudoanm.github.io/calendar' },
        { label: 'Framework', value: 'Next.js' },
        { label: 'Styling', value: 'TailwindCSS + DaisyUI' },
        { label: 'Theme', value: 'Nothing' },
      ]}
    />
  </div>
)

export default AboutPage
