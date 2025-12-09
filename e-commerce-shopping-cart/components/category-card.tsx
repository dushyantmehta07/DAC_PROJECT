import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/lib/data"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={category.image_url || "/placeholder.svg"}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
          <CardContent className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-semibold text-lg text-card">{category.name}</h3>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
