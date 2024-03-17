import {
  PiBroomFill,
  PiCopyFill,
  PiGlobeFill,
  PiFloppyDiskFill,
  PiMoonFill,
  PiPauseFill,
  PiPlayFill,
  PiStopFill,
  PiSunFill,
} from "react-icons/pi";
import { Card } from "./components/Card";
import { Clock } from "./components/Clock";
import { Stopwatch } from "./components/Stopwatch";
import { SettingsCard } from "./components/SettingsCard";
import themeContext from "./ThemeContext";
import { useContext, useState } from "react";
import { useStopwatch } from "./components/Stopwatch/useStopwatch";
import { Divider } from "./components/Divider";
import { BR, ES, US } from "country-flag-icons/react/1x1";

function App() {
  const themeCtx = useContext(themeContext);

  const stopwatch = useStopwatch();

  const [theme, setTheme] = useState(themeCtx);

  if (theme === "light") document.body.classList.add("light");

  function handleTheme() {
    if (theme === "light")
      setTheme("dark"), document.body.classList.replace("light", "dark");
    else {
      setTheme("light");
      if (document.body.classList.contains("dark"))
        document.body.classList.replace("dark", "light");
    }
  }

  return (
    <themeContext.Provider value={theme}>
      <div className="flex justify-center">
        <div className="w-[calc(96*4px*3+32px)] flex flex-wrap justify-start items-center py-4 gap-4">
          <SettingsCard.Root>
            <SettingsCard.Dropdown
              options={[
                { icon: US, value: "english" },
                { icon: BR, value: "portuguese" },
                { icon: ES, value: "spanish" },
              ]}
              defaultOption={{ icon: US, value: "english" }}
              icon={PiGlobeFill}
            ></SettingsCard.Dropdown>
            <SettingsCard.Toggle
              icon={{ toggle: PiMoonFill, toggled: PiSunFill }}
              toggled={theme == "light" ? false : true}
              onClick={() => {
                handleTheme();
              }}
            />
          </SettingsCard.Root>
          <Card.Root variant="sm" title="calendar">
            <></>
          </Card.Root>
          <Card.Root variant="sm" title="clock">
            <div className="w-full h-full flex flex-col gap-4">
              <Clock.Time />
              <Divider direction="h" />
              <div className="w-full h-full flex flex-col items-center gap-4">
                <Clock.Weekday />
                <Clock.Date />
              </div>
            </div>
          </Card.Root>
          <Card.Root variant="sm" title="timer">
            <div className="w-full h-full flex flex-col gap-4">
              <Stopwatch.Timer />
              <Divider direction="h" />
              <Stopwatch.Watched />
              <div className="flex justify-between">
                <Stopwatch.Action.Toggle
                  toggled={false}
                  icon={{ toggle: PiPlayFill, toggled: PiPauseFill }}
                  variant="primary"
                  onClick={() => stopwatch.actions.handleStopwatch()}
                />
                <Stopwatch.Action.Icon icon={PiStopFill} variant="danger" />
                <Stopwatch.Action.Icon icon={PiCopyFill} variant="secondary" />
                <Stopwatch.Action.Icon
                  icon={PiFloppyDiskFill}
                  variant="success"
                />
                <Stopwatch.Action.Icon icon={PiBroomFill} variant="danger" />
              </div>
            </div>
          </Card.Root>
          <Card.Root variant="lg">
            <></>
          </Card.Root>
        </div>
      </div>
    </themeContext.Provider>
  );
}

export default App;
