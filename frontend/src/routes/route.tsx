import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Hero from "../components/section/hero";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/home";
import LoginCard from "@/components/section/Login";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<Hero />} />
      </Route>

      <Route element={<Layout showNavbar={false} showFooter={false} />}>
        <Route path="/register" element={<LoginCard />} />
        <Route path="*" element={<Home />} />
      </Route>
    </>,
  ),
);
