import { Container } from "reactstrap";

export function Footer() {
  return (
    <footer
      style={{
        padding: "24px 0",
        borderTop: "1px solid #30364F",
        marginTop: "48px",
      }}
    >
      <Container>
        <p
          style={{
            textAlign: "center",
            color: "#6B6B5A",
            margin: 0,
          }}
        >
          Need to all static pages here!
        </p>
      </Container>
    </footer>
  );
}