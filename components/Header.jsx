
import { useTheme } from "../hooks/useTheme";

const Header = () => {

  const [isDark, setIsdark] = useTheme();


  // if(isDark) {
  //   document.body.classList.add('dark');
  // } else {
  //   document.body.classList.remove('dark');
  // }
  
  return (
    <header className={`header-container ${isDark ? 'dark' : ''}`}>
      <div className="header-content">
        <h2 className="title">
          <a href="/" title="CLick to go Home">Where in the world?</a>
        </h2>
        <p className="mode-switch" onClick={() => {
          setIsdark(!isDark);
          localStorage.setItem("isDarkMode", !isDark)
        }}>
          <i className={`fa-solid fa-${isDark ? 'sun' : 'moon'}`}></i>&nbsp;&nbsp;{isDark ? 'Light': 'Dark'} Mode
        </p>
      </div>
    </header>
  );
};

export default Header;
