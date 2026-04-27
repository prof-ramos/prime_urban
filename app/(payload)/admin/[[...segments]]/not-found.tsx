import config from '@payload-config'
import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Props = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const Page = ({ params, searchParams }: Props) =>
  NotFoundPage({ config, importMap, params, searchParams })

export default Page
