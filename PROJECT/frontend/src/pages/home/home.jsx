import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

const categories = [
  {
    title: "Home Decor",
    description: "Beautiful accents for your living space",
    href: "/home-decor",
    image: "/images/decor-vase.jpg",
  },
  {
    title: "Furniture",
    description: "Stylish and comfortable pieces",
    href: "/furniture",
    image: "/images/furniture-chair.jpg",
  },
  {
    title: "Kitchen",
    description: "Essential tools for your culinary adventures",
    href: "/kitchen",
    image: "/images/kitchen-pot.jpg",
  },
];

const features = [
  {
    title: "Free Shipping",
    description: "On orders over $50",
    icon: "🚚",
  },
  {
    title: "Secure Payment",
    description: "100% protected transactions",
    icon: "🔒",
  },
  {
    title: "24/7 Support",
    description: "Dedicated customer service",
    icon: "🎧",
  },
];

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#F0F0DB", minHeight: "100vh" }}>
      <Navigation />

      {/* Hero Section */}
      <section style={{ padding: "80px 0" }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg="8" className="text-center">
              <h1
                style={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  color: "#2D2D2D",
                  marginBottom: "24px",
                }}
              >
                Transform Your Space Into a Sanctuary
              </h1>
              <p
                style={{
                  fontSize: "1.25rem",
                  color: "#6B6B5A",
                  marginBottom: "32px",
                  lineHeight: "1.6",
                }}
              >
                Discover curated collections of home decor, furniture, and kitchen
                essentials designed to bring warmth and style to every corner of
                your home.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Button
                  tag={Link}
                  to="/home-decor"
                  size="lg"
                  style={{
                    backgroundColor: "#5C4A3D",
                    borderColor: "#5C4A3D",
                    borderRadius: "8px",
                    padding: "12px 32px",
                  }}
                >
                  Shop Now
                </Button>
                <Button
                  tag={Link}
                  to="/furniture"
                  size="lg"
                  outline
                  style={{
                    borderColor: "#5C4A3D",
                    color: "#5C4A3D",
                    borderRadius: "8px",
                    padding: "12px 32px",
                  }}
                >
                  Browse Furniture
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section style={{ padding: "64px 0" }}>
        <Container>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#2D2D2D",
                marginBottom: "16px",
              }}
            >
              Shop by Category
            </h2>
            <p style={{ color: "#6B6B5A", fontSize: "1.1rem" }}>
              Explore our carefully curated collections
            </p>
          </div>
          <Row>
            {categories.map((category) => (
              <Col md="4" key={category.href} className="mb-4">
                <Link to={category.href} style={{ textDecoration: "none" }}>
                  <Card
                    style={{
                      backgroundColor: "#FAFAF5",
                      border: "1px solid #D5D5C0",
                      borderRadius: "12px",
                      overflow: "hidden",
                      transition: "box-shadow 0.3s ease, transform 0.3s ease",
                      height: "100%",
                    }}
                    className="category-card"
                  >
                    <div style={{ overflow: "hidden" }}>
                      <img
                        src={category.image || "/placeholder.jpg"}
                        alt={category.title}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                        }}
                        className="category-image"
                      />
                    </div>
                    <CardBody style={{ padding: "24px" }}>
                      <CardTitle
                        tag="h3"
                        style={{
                          color: "#2D2D2D",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                        {category.title}
                      </CardTitle>
                      <CardText style={{ color: "#6B6B5A" }}>
                        {category.description}
                      </CardText>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: "64px 0",
          backgroundColor: "#FAFAF5",
          borderTop: "1px solid #D5D5C0",
          borderBottom: "1px solid #D5D5C0",
        }}
      >
        <Container>
          <Row>
            {features.map((feature) => (
              <Col md="4" key={feature.title} className="text-center mb-4">
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(92, 74, 61, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    fontSize: "1.5rem",
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#2D2D2D",
                    marginBottom: "8px",
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: "#6B6B5A" }}>{feature.description}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
}