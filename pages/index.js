import Layout from "../components/layout";
import { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";

const Home = ({ session }) => {
  const [stripe, setStripe] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    setStripe(window.Stripe(process.env.STRIPE_PUBLIC));
  }, []);

  const handleCheckout = async () => {
    const { error } = await stripe.redirectToCheckout({
      sessionId: session
    });
    if (error) setError(error.message);
  };

  return (
    <Layout>
      <div className="container">
        <h1>My Book</h1>
        <div className="image-container">
          <img src="/book.jpg" alt="My Book" />
        </div>
        <div className="description-container">
          <p>Techonomics Stripe Demo</p>
        </div>
        {error && (
          <div className="warning">
            <p>{error}</p>
          </div>
        )}
        <button onClick={handleCheckout}>Buy Now</button>
      </div>
      <p className="disclaimer">
        This is a sample checkout page. There's no real book. You can test the
        complete checkout flow by using Stripe's test card number 4242 4242 4242
        4242.
      </p>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          padding: 1rem 0;
        }
        h1 {
          color: #2d3748;
        }
        .image-container {
          overflow: hidden;
          border-radius: 0.5rem;
        }
        .image-container img {
          max-width: 15rem;
          object-fit: cover;
          display: block;
          margin: auto;
        }
        .description-container {
          max-width: 15rem;
        }
        .warning {
          max-width: 10rem;
          background-color: #fff5f5;
          color: #c53030;
          text-align: center;
          padding: 1rem 0.75rem;
          border-radius: 0.25rem;
          border-width: 1px;
          border-color: #fc8181;
          border-style: solid;
          margin: 0 0 1rem 0;
        }
        button {
          padding: 0.5rem 3rem;
          background-color: #4c51bf;
          color: white;
          border-width: 0;
          font-weight: bold;
          border-radius: 0.25rem;
        }
        .disclaimer {
          color: #e53e3e;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

Home.getInitialProps = async ctx => {
  const res = await fetch(
    `${process.env.NODE_ENV === "development" ? "http://" : "https://"}${ctx.req
      .headers["x-forwarded-host"] || ctx.req.headers.host}/api/checkout`
  );
  const json = await res.json();
  return { session: json.id };
};

export default Home;
