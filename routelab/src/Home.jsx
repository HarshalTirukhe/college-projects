import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          Route<span>Lab</span>
        </div>

        <div className="badge">
          React • Routing
        </div>

      </nav>


      <main className="hero">

        <p className="eyebrow">
          LEARNING BY BUILDING
        </p>

        <h1>
          Learn React
          <br />
          Navigation.
        </h1>

        <p className="description">
          A tiny project built to understand
          client-side routing in React.
        </p>

        <button
          onClick={() => navigate("/details")}
        >
          Explore Details →
        </button>

      </main>


      <section className="features">

        <div className="feature">
          <p className="feature-number">01</p>
          <p className="feature-title">BrowserRouter</p>
        </div>

        <div className="feature">
          <p className="feature-number">02</p>
          <p className="feature-title">Routes & Route</p>
        </div>

        <div className="feature">
          <p className="feature-number">03</p>
          <p className="feature-title">useNavigate()</p>
        </div>

      </section>

    </div>
  );
}

export default Home;