import { Link, useLocation } from "react-router-dom";
import "./styles.css";

export default function Navigation() {
  const location = useLocation();
  const isStylingPage = location.pathname === "/Portfolio/Styling";

  return (
    <div>
      <div
        className={`row nav-bar align-items-center fixed-top ${
          isStylingPage ? "inverted-nav-bar" : ""
        }`}
      >
        <div className="col-6 d-flex justify-content-left nav-bar-home-link">
          <Link
            key="/Portfolio/Home"
            to="/Portfolio/Home"
            className="text-decoration-none text-reset"
          >
            GRACE AMES
          </Link>
        </div>
        <div className="col-6 d-flex justify-content-around nav-bar-page-links">
          <Link
            key="/Portfolio/GraphicDesign"
            to="/Portfolio/GraphicDesign"
            className="text-decoration-none text-reset"
          >
            graphic design
          </Link>
          <Link
            key="/Portfolio/ExperienceDesign"
            to="/Portfolio/ExperienceDesign"
            className="text-decoration-none text-reset"
          >
            experience design
          </Link>
          <Link
            key="/Portfolio/Swe"
            to="/Portfolio/Swe"
            className="text-decoration-none text-reset"
          >
            swe
          </Link>
          <Link
            key="/Portfolio/Styling"
            to="/Portfolio/Styling"
            className="text-decoration-none text-reset"
          >
            styling
          </Link>
        </div>
      </div>
    </div>
  );
}
