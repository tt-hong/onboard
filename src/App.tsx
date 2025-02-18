import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./layouts/main";

const HomePage = lazy(() =>
  import("./pages/home").then((m) => ({
    default: m.HomePage,
  }))
);

const ProjectPage = lazy(() =>
  import("./pages/projects").then((m) => ({
    default: m.ProjectPage,
  }))
);

const ExperiencePage = lazy(() =>
  import("./pages/exp").then((m) => ({
    default: m.ExperiencePage,
  }))
);

const PageLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageLoading />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/exp"
            element={
              <Suspense fallback={<PageLoading />}>
                <ExperiencePage />
              </Suspense>
            }
          />
          <Route
            path="/projects"
            element={
              <Suspense fallback={<PageLoading />}>
                <ProjectPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
