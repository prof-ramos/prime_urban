import { getAllPublishedProperties } from "@/lib/payload/properties"
import { ImoveisListing } from "@/components/imoveis-listing"

export const revalidate = 60

export default async function PropertiesPage() {
  const properties = await getAllPublishedProperties()
  return <ImoveisListing initialProperties={properties} />
}
