import logo from "./logo.svg";
import Main from "./components/Main/Main";
import { useTheme } from "./context/ThemeContext";

function App() {
  const {theme} = useTheme()

  return (
    <div className={"transition-all  bg-gradient-to-r from-sky-400 to-cyan-300 flex justify-center items-center dark:bg-slate-800 w-screen h-screen " +
    (theme === "dark" ? "dark" : "")}>
      <Main />
    </div>
  );
}

export default App;
