import "./App.css";
import { Outlet } from "react-router-dom";
import TheHeader from "./components/TheHeader";
import TheFooter from "./components/TheFooter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./context/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <TheHeader />
          <Outlet />
        </QueryClientProvider>
      </AuthContextProvider>
      <TheFooter />
    </>
  );
}

export default App;
