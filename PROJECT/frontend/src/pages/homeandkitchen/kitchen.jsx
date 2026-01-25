import { Container, Row, Col } from "reactstrap";
import { Navigation } from "../components/Navigation";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { Footer } from "../components/Footer";

const products = [
  {
    id: 1,
    name: "Ceramic Cooking Pot",
    description:
      "Versatile ceramic pot with lid, perfect for soups, stews, and slow-cooked meals.",
    price: "$78.00",
    image: "/images/kitchen-pot.jpg",
  },
  {
    id: 2,
    name: "Wooden Cutting Board",
    description:
      "Artisan-crafted cutting board made from sustainable hardwood with ergonomic handle.",
    price: "$42.00",
    image: "/images/kitchen-board.jpg",
  },
  {
    id: 3,
    name: "Handmade Ceramic Mug",
    description:
      "Beautiful speckled ceramic mug, handcrafted by local artisans for your morning coffee.",
    price: "$28.00",
    image: "/images/kitchen-mug.jpg",
  },
  {
    id: 4,
    name: "Wooden Utensil Set",
    description:
      "Complete set of cooking utensils including spoon, spatula, and whisk in natural wood.",
    price: "$35.00",
    image: "/images/kitchen-utensils.jpg",
  },
  {
    id: 5,
    name: "Glass Storage Jars",
    description:
      "Set of airtight glass jars with bamboo lids for storing pantry essentials in style.",
    price: "$48.00",
    image: "/images/kitchen-jars.jpg",
  },
  {
    id: 6,
    name: "Modern Electric Kettle",
    description:
      "Sleek electric kettle with rapid boil technology and auto shut-off for safety.",
    price: "$65.00",
    image: "/images/kitchen-kettle.jpg",
  },
  {
    id: 7,
    name: "Ceramic Teapot",
    description:
      "Elegant ceramic teapot with wooden handle and built-in strainer. Holds 32oz. Perfect for loose leaf tea.",
    price: "$52.00",
    image: "/images/kitchen-teapot.jpg",
  },
  {
    id: 8,
    name: "Wooden Spice Rack",
    description:
      "Wall-mounted spice rack with 12 glass jars and chalkboard labels. Keeps your spices organized.",
    price: "$68.00",
    image: "/images/kitchen-spice.jpg",
  },
  {
    id: 9,
    name: "High-Power Blender",
    description:
      "Professional-grade blender with 1500W motor. Perfect for smoothies, soups, and nut butters.",
    price: "$189.00",
    image: "/images/kitchen-blender.jpg",
  },
  {
    id: 10,
    name: "Stoneware Dinner Set",
    description:
      "16-piece dinnerware set in natural cream. Includes dinner plates, salad plates, bowls, and mugs for 4.",
    price: "$145.00",
    image: "/images/kitchen-plates.jpg",
  },
  {
    id: 11,
    name: "Linen Kitchen Towels",
    description:
      "Set of 4 premium linen kitchen towels with natural stripe pattern. Highly absorbent and quick-drying.",
    price: "$32.00",
    image: "/images/kitchen-towels.jpg",
  },
  {
    id: 12,
    name: "Marble Mortar & Pestle",
    description:
      "Solid white marble mortar and pestle for grinding spices and making fresh pesto.",
    price: "$45.00",
    image: "/images/kitchen-mortar.jpg",
  },
];

export default function KitchenPage() {
  return (
    <div style={{ backgroundColor: "#F0F0DB", minHeight: "100vh" }}>
      <Navigation />
      <main style={{ padding: "48px 0" }}>
        <Container>
          <PageHeader
            title="Kitchen"
            description="Equip your kitchen with essential tools and beautiful accessories for everyday cooking and entertaining."
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