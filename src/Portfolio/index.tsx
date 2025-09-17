import { Navigate, Routes, Route } from "react-router";
import HomePage from "./Home";
import Navigation from "./Navigation";
import GraphicDesign from "./GraphicDesign";
import Swe from "./Swe";
import ExperienceDesign from "./ExperienceDesign";
import Styling from "./Styling";

export default function Labs() {
  return (
    <div className="">
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<Navigate to="Portfolio" />} />
        <Route path="Home/*" element={<HomePage />} />
        <Route path="GraphicDesign/*" element={<GraphicDesign />} />
        <Route path="ExperienceDesign/*" element={<ExperienceDesign />} />
        <Route path="Swe/*" element={<Swe />} />
        <Route path="Styling/*" element={<Styling />} />
      </Routes>
    </div>
  );
}
