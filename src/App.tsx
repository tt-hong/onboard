import { Provider } from "react-redux";
import { AchievementsPage } from "./pages/achievements";
import { appStore } from "./store";
import { ToastProvider } from "./components/toast";

export function App() {
  return (
    <Provider store={appStore}>
      <ToastProvider>
        <main className="py-10">
          <AchievementsPage />
        </main>
      </ToastProvider>
    </Provider>
  );
}
