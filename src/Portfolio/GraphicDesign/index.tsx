// GraphicDesign.tsx
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

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
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const elRef = useRef<HTMLSpanElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const loadedCountRef = useRef(0);

  useLayoutEffect(() => {
    const data = sessionStorage.getItem("transitionData");
    if (!data) {
      setAnimating(false);
      console.log("ERROR: no data found");
      return;
    }

    const { x, y, width, height } = JSON.parse(data);

    const el = elRef.current;
    if (!el) {
      setAnimating(false);
      console.log("ERROR: no reference found");
      return;
    }

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.transition = "all 600ms ease";
    el.style.fontSize = "1rem";
    el.style.transform = "none";

    requestAnimationFrame(() => {
      el.style.display = "flex";
      el.style.left = "50%";
      el.style.top = "10px";
      el.style.width = "100%";
      el.style.height = "100%";
      el.style.justifyContent = "center";
      el.style.transform = "translateX(-50%)";
      el.style.fontSize = "100px";
    });

    const finish = () => {
      setAnimating(false);
      sessionStorage.removeItem("transitionData");
    };

    const handleTransitionEnd = () => finish();
    el.addEventListener("transitionend", handleTransitionEnd, { once: true });

    const fallback = setTimeout(finish, 700);

    return () => {
      el.removeEventListener("transitionend", handleTransitionEnd);
      clearTimeout(fallback);
    };
  }, []);

  const handleImageLoad = () => {
    loadedCountRef.current += 1;
    if (loadedCountRef.current === brochure.length) {
      setImagesLoaded(true);
    }
  };

  // Horizontal scroll animation with GSAP
  useEffect(() => {
    if (animating || !galleryRef.current || !imagesLoaded) return;

    // Small delay to ensure Safari has calculated dimensions
    const timer = setTimeout(() => {
      const gallery = galleryRef.current;
      if (!gallery) return;

      const scrollDistance = gallery.scrollWidth - window.innerWidth;

      console.log("Gallery width:", gallery.scrollWidth);
      console.log("Window width:", window.innerWidth);
      console.log("Scroll distance:", scrollDistance);

      const scrollTrigger = gsap.to(gallery, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: "#sectionPin",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: ".pin-wrap-sticky",
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        scrollTrigger.scrollTrigger?.kill();
        scrollTrigger.kill();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [animating, imagesLoaded]);

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

      {/* BROCHURE */}
      <div id="sectionPin">
        <div className="pin-wrap-sticky">
          <div className="pin-wrap">
            <div ref={galleryRef} className="brochure-gallery">
              {brochure.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Brochure ${index + 1}`}
                  className="brochure-img"
                  onLoad={handleImageLoad}
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