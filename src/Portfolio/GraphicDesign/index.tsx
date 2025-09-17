// GraphicDesign.tsx
import { useLayoutEffect, useRef, useState } from "react";
import "./styles.css";

const brochure = [
  "images/brochure.png",
  "images/brochure2.png",
  "images/brochure3.png",
  "images/brochure4.png",
  "images/brochure5.png",
  "images/brochure6.png",
  "images/brochure7.png",
  "images/brochure8.png",
  "images/brochure9.png",
  "images/brochure10.png",
  "images/brochure11.png",
  "images/brochure12.png",
  "images/brochure13.png",
];

export default function GraphicDesign() {
  const [animating, setAnimating] = useState(true);
  const elRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const data = sessionStorage.getItem("transitionData");
    if (!data) {
      setAnimating(false);
      console.log("ERROR: no data found"); //TODO: throw actual errors
      return;
    }

    const { x, y, width, height } = JSON.parse(data);

    const el = elRef.current;
    if (!el) {
      setAnimating(false);
      console.log("ERROR: no reference found");
      return;
    }

    // BEGINING OF ANIMATION
    // el.style.position = "fixed";
    el.style.left = `${x}px`; //old position
    el.style.top = `${y}px`; //old position
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.transition = "all 600ms ease";
    // set initial visual size that matches the ORIGIN
    el.style.fontSize = "1rem";
    el.style.transform = "none";

    // Give the browser a frame, then move to final position
    requestAnimationFrame(() => {
      // final position — match your .graphic-title final CSS (here: top:20px left:20px)
      el.style.display = "flex";
      el.style.left = "50%"; // anchors left position to center of screen
      el.style.top = "10px"; // near the top
      el.style.width = "100%"; //same size as final
      el.style.height = "100%"; //same size as final
      el.style.justifyContent = "center";
      el.style.transform = "translateX(-50%)"; // shift left by 50% of its width, so it's centered
      el.style.fontSize = "100px";
    });

    // After transition ends, clear animating flag
    const finish = () => {
      setAnimating(false);
      // optional: cleanup stored transitionData
      sessionStorage.removeItem("transitionData");
    };

    const handleTransitionEnd = () => finish();
    el.addEventListener("transitionend", handleTransitionEnd, { once: true });

    // fallback in case transitionend doesn't fire
    const fallback = setTimeout(finish, 700);

    return () => {
      el.removeEventListener("transitionend", handleTransitionEnd);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div>
      {animating ? (
        <span ref={elRef} className="graphic-title">
          graphic design
        </span>
      ) : (
        <span className="graphic-title">graphic design</span>
      )}

      <div className={`content-wrapper ${animating ? "hidden" : "visible"}`}>
        <div className="row justify-content-center">
          <img src="images/coded.png" alt="Coded" className="coded-img" />
        </div>
      </div>

      {/* BORCHURE */}
      <div id="sectionPin">
        <div className="pin-wrap-sticky">
          <div className="pin-wrap">
            <div className="brochure-gallery">
              {brochure.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Brochure ${index + 1}`}
                  className="brochure-img"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
          <img src="images/coded.png" alt="Coded" className="coded-img" />
        </div>
    </div>
  );
}
