import { Container, Row, Col } from "reactstrap";
import { Navigation } from "../components/Navigation";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { Footer } from "../components/Footer";

const products = [
  {
    id: 1,
    name: "Ceramic Vase with Pampas",
    description:
      "Elegant minimalist ceramic vase paired with dried pampas grass for a natural, bohemian touch.",
    price: "$45.00",
    image: "/images/decor-vase.jpg",
  },
  {
    id: 2,
    name: "Amber Scented Candle",
    description:
      "Luxury hand-poured candle in amber glass jar with warm vanilla and sandalwood notes.",
    price: "$32.00",
    image: "/images/decor-candle.jpg",
  },
  {
    id: 3,
    name: "Textured Linen Pillow",
    description:
      "Soft textured throw pillow in neutral beige tones, perfect for adding warmth to any space.",
    price: "$38.00",
    image: "/images/decor-pillow.jpg",
  },
  {
    id: 4,
    name: "Round Wooden Mirror",
    description:
      "Decorative wall mirror with natural wooden frame, adding depth and light to your room.",
    price: "$89.00",
    image: "/images/decor-mirror.jpg",
  },
  {
    id: 5,
    name: "Knitted Throw Blanket",
    description:
      "Cozy chunky knit throw blanket in cream, ideal for cool evenings and lazy weekends.",
    price: "$65.00",
    image: "/images/decor-blanket.jpg",
  },
  {
    id: 6,
    name: "Potted Succulent",
    description:
      "Low-maintenance succulent in handcrafted terracotta pot, bringing life to any corner.",
    price: "$24.00",
    image: "/images/decor-plant.jpg",
  },
  {
    id: 7,
    name: "Botanical Art Frame",
    description:
      "Elegant wooden frame featuring vintage botanical print. Ready to hang with premium mounting hardware.",
    price: "$42.00",
    image: "/images/decor-frame.jpg",
  },
  {
    id: 8,
    name: "Minimalist Wall Clock",
    description:
      "Modern wall clock with natural wood frame and silent quartz movement. Adds sophistication to any space.",
    price: "$65.00",
    image: "/images/decor-clock.jpg",
  },
  {
    id: 9,
    name: "Seagrass Storage Basket",
    description:
      "Handwoven seagrass basket perfect for blankets, toys, or laundry. Natural texture adds warmth to any room.",
    price: "$38.00",
    image: "/images/decor-basket.jpg",
  },
  {
    id: 10,
    name: "Handwoven Jute Rug",
    description:
      "Natural jute area rug with soft texture. Durable and sustainable, perfect for living rooms or bedrooms.",
    price: "$129.00",
    image: "/images/decor-rug.jpg",
  },
  {
    id: 11,
    name: "Sheer Linen Curtains",
    description:
      "Light-filtering linen curtains in natural white. Set of 2 panels with rod pocket design. Machine washable.",
    price: "$85.00",
    image: "/images/decor-curtains.jpg",
  },
  {
    id: 12,
    name: "Decorative Wooden Tray",
    description:
      "Handcrafted wooden serving tray with handles. Perfect for breakfast in bed or coffee table styling.",
    price: "$45.00",
    image: "/images/decor-tray.jpg",
  },
];

export default function HomeDecorPage() {
  return (
    <div style={{ backgroundColor: "#F0F0DB", minHeight: "100vh" }}>
      <Navigation />
      <main style={{ padding: "48px 0" }}>
        <Container>
          <PageHeader
            title="Home Decor"
            description="Elevate your living space with our curated collection of decorative accents, from elegant vases to cozy textiles."
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