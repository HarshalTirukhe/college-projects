import { useNavigate } from "react-router";

function Details() {
  const navigate = useNavigate();

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          Route<span>Lab</span>
        </div>

        <div className="badge">
          /details
        </div>

      </nav>


      <main className="hero">

        <p className="eyebrow">
          ROUTE SUCCESS
        </p>

        <h1>
          You're on the
          <br />
          Details page.
        </h1>

        <p className="description">
          You navigated from the home page
          using React Router.
        </p>

        <button
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

      </main>

    </div>
  );
}

export default Details;