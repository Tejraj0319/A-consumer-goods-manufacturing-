
import { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import './darkMode.css'

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <button onClick={toggleDarkMode} className="btn btn-primary">{darkMode ? <MdLightMode /> : <MdDarkMode />}</button>
  );
}

export default DarkModeToggle;
