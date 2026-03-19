import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Hero from "../components/section/hero";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Hero />}>
      <Route path="/" element={<Hero />} />
      <Route path="/job/:id" element={<Hero />} />
      <Route path="*" element={<Hero />} />
    </Route>,
  ),
);
