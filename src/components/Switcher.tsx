import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../hooks/useDarkSide";

export default function Switcher() {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );

    const toggleDarkMode = (checked: boolean) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <>
            <div className="p-1 rounded-full shadow dark:bg-gray-600">
                <DarkModeSwitch
                    sunColor="#333"
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    size={30}
                />
            </div>
        </>
    );
}