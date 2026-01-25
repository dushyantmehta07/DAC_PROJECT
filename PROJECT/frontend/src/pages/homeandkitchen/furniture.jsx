import { Container, Row, Col } from "reactstrap";
import { Navigation } from "../components/Navigation";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { Footer } from "../components/Footer";

const products = [
  {
    id: 1,
    name: "Modern Armchair",
    description:
      "Scandinavian-inspired armchair with plush cushioning and clean lines for ultimate comfort.",
    price: "$349.00",
    image: "/images/furniture-chair.jpg",
  },
  {
    id: 2,
    name: "Oak Coffee Table",
    description:
      "Round coffee table crafted from natural oak with a warm finish, perfect for any living room.",
    price: "$275.00",
    image: "/images/furniture-table.jpg",
  },
  {
    id: 3,
    name: "Contemporary Floor Lamp",
    description:
      "Elegant floor lamp with fabric shade providing warm, ambient lighting for cozy evenings.",
    price: "$125.00",
    image: "/images/furniture-lamp.jpg",
  },
  {
    id: 4,
    name: "Floating Wall Shelf",
    description:
      "Minimalist wooden shelf with invisible mounting for displaying books and decor items.",
    price: "$55.00",
    image: "/images/furniture-shelf.jpg",
  },
  {
    id: 5,
    name: "Linen Sofa",
    description:
      "Three-seater sofa in natural linen fabric with deep seats and supportive cushions.",
    price: "$899.00",
    image: "/images/furniture-sofa.jpg",
  },
  {
    id: 6,
    name: "Rattan Sideboard",
    description:
      "Boho-inspired sideboard with rattan doors and ample storage for dining essentials.",
    price: "$425.00",
    image: "/images/furniture-cabinet.jpg",
  },
  {
    id: 7,
    name: "Entryway Bench",
    description:
      "Solid wood bench with cushioned seat in beige fabric. Includes lower shelf for shoe storage.",
    price: "$225.00",
    image: "/images/furniture-bench.jpg",
  },
  {
    id: 8,
    name: "Minimalist Writing Desk",
    description:
      "Clean-lined wooden desk with two drawers. Compact design perfect for home offices or bedrooms.",
    price: "$389.00",
    image: "/images/furniture-desk.jpg",
  },
  {
    id: 9,
    name: "Modern Nightstand",
    description:
      "Bedside table with drawer and open shelf. Solid wood construction with tapered legs.",
    price: "$175.00",
    image: "/images/furniture-nightstand.jpg",
  },
  {
    id: 10,
    name: "Open Bookcase",
    description:
      "Five-shelf bookcase with solid wood frame. Versatile design works in living rooms, offices, or bedrooms.",
    price: "$425.00",
    image: "/images/furniture-bookcase.jpg",
  },
  {
    id: 11,
    name: "Round Ottoman",
    description:
      "Upholstered ottoman with solid wood legs. Works as extra seating, footrest, or coffee table alternative.",
    price: "$189.00",
    image: "/images/furniture-ottoman.jpg",
  },
  {
    id: 12,
    name: "Scandinavian Dining Chair",
    description:
      "Curved back dining chair in natural wood. Ergonomic design for comfortable seating.",
    price: "$145.00",
    image: "/images/furniture-dining-chair.jpg",
  },
];

export default function FurniturePage() {
  return (
    <div style={{ backgroundColor: "#F0F0DB", minHeight: "100vh" }}>
      <Navigation />
      <main style={{ padding: "48px 0" }}>
        <Container>
          <PageHeader
            title="Furniture"
            description="Discover timeless furniture pieces designed for comfort, style, and lasting quality in your home."
          />
          <Row>
            {products.map((product) => (
              <Col sm="6" lg="4" key={product.id} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
}