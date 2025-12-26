"use client";

import { useMainContext } from "@/context/MainContext";
import {
    SunIcon,
    MoonIcon,
    ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

export default function ThemeButtons({ }) {
    const { settheme, theme } = useMainContext()
    return (
        <div className="flex bg-sidebar border border-foreground/10 rounded-md mt-4 px-1 w-fit  items-center gap-2">
            {/* Light */}
            <button
                onClick={() => settheme("light")}
                className="flex items-center gap-2  p-1  transition text-sm"
            >
                <SunIcon className="w-5 h-5 " />
            </button>

            {/* Dark */}
            <button
                onClick={() => settheme("dark")}
                className="flex items-center gap-2  p-1  transition text-sm"
            >
                <MoonIcon className="w-5 h-5 " />
            </button>

            {/* Auto / System */}
            <button
                onClick={() => settheme("auto")}
                className="flex items-center gap-2  p-1  transition text-sm"
            >
                <ComputerDesktopIcon className="w-5 h-5" />
            </button>
        </div>
    );
}
