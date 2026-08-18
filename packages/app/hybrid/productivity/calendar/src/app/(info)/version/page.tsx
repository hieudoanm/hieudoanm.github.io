import { FC } from 'react'
import { Header } from '@/components/organisms/Header'
import { VersionTemplate } from '@/components/templates/VersionTemplate'

const VersionPage: FC = () => (
  <div className="flex flex-col">
    <Header />
    <VersionTemplate version="0.0.0" />
  </div>
)

export default VersionPage
