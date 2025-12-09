"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    })
    toast({
      title: "Added to cart",
<<<<<<< HEAD
      description: `${product.name} added to your cart.`,
=======
      description: `${product.name} has been added to your cart.`,
>>>>>>> 5748c62f33fd6d3cc47034b20cd1204cc24d1268
    })
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors mb-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.review_count.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
<<<<<<< HEAD
          <span className="text-lg font-bold text-foreground">Rs.{product.price.toFixed(2)}</span>
          {product.original_price && (
            <span className="text-sm text-muted-foreground line-through">Rs.{product.original_price.toFixed(2)}</span>
=======
          <span className="text-lg font-bold text-foreground">&#8377;{product.price.toFixed(2)}</span>
          {product.original_price && (
            <span className="text-sm text-muted-foreground line-through">&#8377;{product.original_price.toFixed(2)}</span>
>>>>>>> 5748c62f33fd6d3cc47034b20cd1204cc24d1268
          )}
        </div>
        <Button
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.preventDefault()
            handleAddToCart()
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}
