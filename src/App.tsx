import {
  List,
  Popover,
  PopoverDomRef,
  ShellBar,
  ShellBarItem,
  ListItemStandard,
} from "@ui5/webcomponents-react";
import { createContext, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { Details } from "./Details.tsx";
import { Home } from "./Home.tsx";
import paletteIcon from "@ui5/webcomponents-icons/dist/palette.js";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

import ListMode from "@ui5/webcomponents/dist/types/ListSelectionMode.js";
import PopoverPlacementType from "@ui5/webcomponents/dist/types/PopoverPlacement.js";

const defaultTheme = "sap_horizon";
export const ThemeContext = createContext(defaultTheme);

const themes = [
  { key: "sap_horizon", name: "Morning Horizon (Light)" },
  { key: "sap_horizon_dark", name: "Evening Horizon (Dark)" },
  { key: "sap_horizon_hcb", name: "Horizon High Contrast Black" },
  { key: "sap_horizon_hcw", name: "Horizon High Contrast White" },
];

function App() {
  const navigate = useNavigate();
  const popoverRef = useRef<PopoverDomRef>(null);
  const [theme, setThemeState] = useState(defaultTheme);
  const handleLogoClick = () => {
    navigate("/");
  };
  const handleShellBarItemClick = (e) => {
    const { targetRef } = e.detail;
    popoverRef.current!.opener = targetRef;
    popoverRef.current!.open = true;
  };

  const handleThemeSwitch = (e) => {
    const { targetItem } = e.detail;
    setTheme(targetItem.dataset.key);
    setThemeState(targetItem.dataset.key);
  };

  return (
    <ThemeContext.Provider value={theme}>
      <ShellBar
        primaryTitle="Movie DB"
        logo={
          <img
            src="https://sap.github.io/ui5-webcomponents/img/footer/sap-1920-1440.svg"
            alt="SAP logo"
          />
        }
        onLogoClick={handleLogoClick}
      >
        <ShellBarItem
          icon={paletteIcon}
          onClick={handleShellBarItemClick}
          text="Change Theme"
        />
      </ShellBar>
      <div style={{ overflow: "auto", flexGrow: 1 }}>
        <Routes>
          <Route path="/details/:movieId" element={<Details />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Popover
        ref={popoverRef}
        placement={PopoverPlacementType.Bottom}
        className="contentNoPadding"
      >
        <List
          selectionMode={ListMode.Single}
          onSelectionChange={handleThemeSwitch}
        >
          {themes.map((item) => (
            <ListItemStandard
              data-key={item.key}
              key={item.key}
              selected={theme === item.key}
            >
              {item.name}
            </ListItemStandard>
          ))}
        </List>
      </Popover>
    </ThemeContext.Provider>
  );
}

export default App;
