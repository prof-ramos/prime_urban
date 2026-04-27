import { getAllPublishedProperties } from "@/lib/payload/properties"
import { REVALIDATE_TIMES } from "@/lib/payload/revalidate"
import { ImoveisListing } from "@/components/imoveis-listing"

export const revalidate = REVALIDATE_TIMES.PROPERTIES

export default async function PropertiesPage() {
  const properties = await getAllPublishedProperties()
  return <ImoveisListing initialProperties={properties} />
}
