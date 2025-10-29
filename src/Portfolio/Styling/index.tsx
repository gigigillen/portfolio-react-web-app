import { useEffect } from "react";
import "./styles.css";

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

  useEffect(() => {
    // Set body background color on mount
    document.body.style.backgroundColor = "#000000";
    // Optional: set html too, for extra safety
    document.documentElement.style.backgroundColor = "#000000";

    // Clean up on unmount
    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  const columnCount = 3;
  const chunkedStyling = Array.from({ length: columnCount }, (_, i) =>
    styling.slice(i * Math.ceil(styling.length / columnCount), (i + 1) * Math.ceil(styling.length / columnCount))
  );

  return (
    <div className="background-color">
      <div className="columns">
        {chunkedStyling.map((column, colIndex) => (
          <div
            className={`column ${colIndex % 2 === 0 ? "column-reverse" : ""}`}
            key={colIndex}
          >
            {column.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`${src}`}
                width="350px"
                height="350px"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
