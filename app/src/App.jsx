import { useState, useEffect } from "react";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import MainApp from "./screens/MainApp";
 
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [loggedIn, setLoggedIn] = useState(false);
 
  useEffect(() => {
    if (screen === "splash") {
      const t = setTimeout(() => setScreen("login"), 2800);
      return () => clearTimeout(t);
    }
  }, [screen]);
 
  if (screen === "splash") return <SplashScreen />;
  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  return <MainApp />;
}
 