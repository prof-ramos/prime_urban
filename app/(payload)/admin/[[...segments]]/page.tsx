import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type AdminPageProps = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: AdminPageProps) =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: AdminPageProps) =>
  RootPage({ config, importMap, params, searchParams })

export default Page
