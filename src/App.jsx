import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AboutSection from "./components/AboutSection.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import IntroSection from "./components/IntroSection.jsx";
import LabSection from "./components/LabSection.jsx";
import Navbar from "./components/Navbar.jsx";
import PlatformsSection from "./components/PlatformsSection.jsx";
import ProjectsSection from "./components/ProjectsSection.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import WorldNotesSection from "./components/WorldNotesSection.jsx";
import BookManagerPage from "./pages/BookManagerPage.jsx";
import DataDashboardPage from "./pages/DataDashboardPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import VisualCasePage from "./pages/VisualCasePage.jsx";

function getRoute() {
  const hash = window.location.hash;
  const gameMatch = hash.match(/^#\/games\/(.+)$/);
  const projectMatch = hash.match(/^#\/projects\/(.+)$/);
  const appMatch = hash.match(/^#\/apps\/(.+)$/);
  const visualMatch = hash.match(/^#\/visual\/(.+)$/);
  return {
    appId: appMatch?.[1] ?? null,
    gameId: gameMatch?.[1] ?? null,
    projectId: projectMatch?.[1] ?? null,
    visualId: visualMatch?.[1] ?? null,
  };
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const { appId, gameId, projectId, visualId } = route;

  useEffect(() => {
    function handleHashChange() {
      const nextRoute = getRoute();
      setRoute(nextRoute);

      if (nextRoute.appId || nextRoute.gameId || nextRoute.projectId || nextRoute.visualId) {
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }

      const id = decodeURIComponent(window.location.hash.replace("#", ""));
      window.setTimeout(() => {
        if (!id) {
          window.scrollTo({ top: 0, behavior: "auto" });
          return;
        }

        document.getElementById(id)?.scrollIntoView({ block: "start" });
      }, 0);
    }

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <motion.div
      className="min-h-screen overflow-hidden bg-white text-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <ScrollProgress />
      {appId === "book-manager" ? (
        <BookManagerPage />
      ) : appId === "data-dashboard" ? (
        <DataDashboardPage />
      ) : gameId ? (
        <GamePage gameId={gameId} />
      ) : visualId ? (
        <VisualCasePage caseId={visualId} />
      ) : projectId ? (
        <ProjectPage projectId={projectId} />
      ) : (
        <>
          <Navbar />
          <main>
            <Hero />
            <IntroSection />
            <AboutSection />
            <ProjectsSection />
            <PlatformsSection />
            <LabSection />
            <WorldNotesSection />
          </main>
          <Footer />
        </>
      )}
    </motion.div>
  );
}
