import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

export default function Styling() {
  const styling = [
    "images/styling/styling2.png",
    "images/styling/styling3.png",
    "images/styling/styling4.png",
    "images/styling/styling5.png",
    "images/styling/styling6.png",
    "images/styling/styling7.png",
    "images/styling/styling8.png",
    "images/styling/styling9.png",
    "images/styling/styling10.png",
    "images/styling/styling11.png",
    "images/styling/styling12.png",
    "images/styling/styling13.png",
    "images/styling/styling14.png",
    "images/styling/styling15.png",
    "images/styling/styling16.png",
    "images/styling/styling17.png",
    "images/styling/styling18.png",
    "images/styling/styling19.png",
    "images/styling/styling20.png",
    "images/styling/styling21.png",
    "images/styling/styling22.png",
    "images/styling/styling23.png",
    "images/styling/styling24.png",
    "images/styling/styling25.png",
    "images/styling/styling26.png",
    "images/styling/styling27.png",
    "images/styling/styling28.png",
  ];

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const loadedCountRef = useRef(0);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    document.body.style.backgroundColor = "#000000";
    document.documentElement.style.backgroundColor = "#000000";

    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
  
    const scrollTriggers: gsap.core.Tween[] = [];
  
    const setupAnimations = () => {
      // Kill existing animations
      scrollTriggers.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
      scrollTriggers.length = 0;
  
      columnsRef.current.forEach((column, index) => {
        if (!column) return;
  
        // Columns 0 and 2 (outer) - animate them slowly downward
        if (index % 2 === 0) {
          const columnHeight = column.offsetHeight;
          const viewportHeight = window.innerHeight;
          const startY = -(columnHeight - viewportHeight);
          const endY = columnHeight - viewportHeight;
  
          const tween = gsap.fromTo(
            column,
            {
              y: startY,
            },
            {
              y: endY,
              ease: "none",
              scrollTrigger: {
                trigger: ".background-color",
                start: "top top",
                end: "bottom bottom",
                scrub: true, // Changed to true for immediate response
                invalidateOnRefresh: true,
              },
            }
          );
          scrollTriggers.push(tween);
        }
      });
    };
  
    setupAnimations();
  
    // Recalculate on window resize
    const handleResize = () => {
      setupAnimations();
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
      scrollTriggers.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [imagesLoaded]);

  const handleImageLoad = () => {
    loadedCountRef.current += 1;
    if (loadedCountRef.current === styling.length) {
      setTimeout(() => {
        setImagesLoaded(true);
      }, 100);
    }
  };

  const columnCount = 3;
  const chunkedStyling: string[][] = [[], [], []];

  styling.forEach((item, index) => {
    chunkedStyling[index % columnCount].push(item);
  });

  return (
    <div className="background-color">
      <div className="columns">
        {chunkedStyling.map((column, colIndex) => (
          <div
            className={`column ${colIndex % 2 === 0 ? "column-reverse" : ""}`}
            key={colIndex}
            ref={(el) => {
              columnsRef.current[colIndex] = el;
            }}
          >
            {column.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`${src}`}
                width="350px"
                height="350px"
                onLoad={handleImageLoad}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}