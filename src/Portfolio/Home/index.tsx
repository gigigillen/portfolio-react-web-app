// HomePage.tsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [logoClasses, setLogoClasses] = useState<string[]>(["", ""]);
  const [introPhase, setIntroPhase] = useState<"show" | "fade" | "hidden">(
    "show"
  );
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const inTimeouts = logoClasses.map((_, idx) =>
      setTimeout(() => {
        setLogoClasses((prev) => {
          const updated = [...prev];
          updated[idx] = "active";
          return updated;
        });
      }, (idx + 1) * 400)
    );

    const outTimeout = setTimeout(() => {
      logoClasses.forEach((_, idx) => {
        setTimeout(() => {
          setLogoClasses((prev) => {
            const updated = [...prev];
            updated[idx] = "fade";
            return updated;
          });
        }, (idx + 1) * 200);
      });
    }, 1500);

    const fadeTimeout = setTimeout(() => setIntroPhase("fade"), 3500);
    const hideTimeout = setTimeout(() => setIntroPhase("hidden"), 4500);
    const contentTimeout = setTimeout(() => setContentVisible(true), 4500);

    return () => {
      inTimeouts.forEach(clearTimeout);
      clearTimeout(outTimeout);
      clearTimeout(fadeTimeout);
      clearTimeout(hideTimeout);
      clearTimeout(contentTimeout);
    };
  }, []);

  const items = [
    { path: "/Portfolio/GraphicDesign", label: "graphic design" },
    { path: "/Portfolio/ExperienceDesign", label: "experience design" },
    { path: "/Portfolio/Swe", label: "swe" },
    { path: "/Portfolio/Styling", label: "styling" },
  ];

  return (
    <div className="content">
      {introPhase !== "hidden" && (
        <div className={`intro ${introPhase === "fade" ? "fade-out" : ""}`}>
          <span className={`logo ${logoClasses[0]}`}>GRACE</span>
          <span className={`logo ${logoClasses[1]}`}>AMES</span>
        </div>
      )}

      <div className={`row ${contentVisible ? "visible" : ""}`}>
        <div className="col-3" />
        <div className="col-3">
          {items.map((item, idx) => (
            <div key={item.path}>
              <Link
                to={item.path}
                className={`text-decoration-none text-reset home-page-link ${
                  contentVisible ? "visible" : ""
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  // Prevent Link's default navigation so we can set the rect first
                  e.preventDefault();

                  // Use currentTarget to get the actual element clicked (the anchor)
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

                  sessionStorage.setItem(
                    "transitionData",
                    JSON.stringify({
                      label: item.label, //"graphic design"
                      x: rect.x, //position
                      y: rect.y, //position
                      width: rect.width,    //records initial size of object
                      height: rect.height,  //records initial size of object
                    })
                  );
                  console.log(`SIZE B4: ${rect.width}, ${rect.height}`)

                  // Navigate *after* we've stored the rect
                  navigate(item.path);
                }}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="col-6" />
      </div>
    </div>
  );
}
