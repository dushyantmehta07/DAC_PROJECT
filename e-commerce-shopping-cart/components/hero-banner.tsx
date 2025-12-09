import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            New Arrivals
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            Discover Amazing Products
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Shop the latest trends in electronics, fashion, home goods, and more. Enjoy exclusive deals and fast
            shipping on all orders.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/category/electronics">
              <Button size="lg" className="gap-2">
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/category/fashion">
              <Button size="lg" variant="outline">
                Explore Fashion
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-20 md:opacity-40" />
    </section>
  )
}
