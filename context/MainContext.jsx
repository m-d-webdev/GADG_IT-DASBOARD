"use client"
import { AuthMe, RefreshToken } from "@/api/auth";
import LoginPage from "@/Components/layout/Login";
import { useContext, createContext, useState, useEffect } from "react"
const MainContextE = createContext();

const MainContext = ({ children }) => {
    const [theme, settheme] = useState(null)
    const [user, setUser] = useState(null);
    const [isLoading, setisLoading] = useState(false);

    // ############# --------- ############

    const Refresh_token = async () => {
        setisLoading(true)
        const res = await RefreshToken();
        if (res.failed) {
            setisLoading(false)
            return
        };
        setUser(res.user);
        setisLoading(false)

    }

    const AuthUser = async () => {
        setisLoading(true)
        const res = await AuthMe();
        if (res.failed) {
            Refresh_token()
            return
        };
        setUser(res.user);
        setisLoading(false)

    }



    useEffect(() => {
        AuthUser()
        if (typeof (localStorage) != "undefined" && typeof (window) != "undefined" && typeof (document) != "undefined") {
            const LocalTheme = localStorage.getItem("theme") ?? "auto";
            settheme(LocalTheme)
        }
    }, []);


    useEffect(() => {
        if (theme == null) return;

        if (typeof (localStorage) != "undefined" && typeof (window) != "undefined" && typeof (document) != "undefined") {

            theme == "dark"
                ? document.documentElement.classList.add("dark")
                : theme == "light"
                    ? document.documentElement.classList.remove("dark")
                    : window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? document.documentElement.classList.add("dark")
                        : document.documentElement.classList.remove("dark");

            localStorage.setItem("theme", theme)

        }
    }, [theme]);


    return (
        <MainContextE.Provider value={{
            theme,
            settheme,
            user,
            setUser,
            isLoading
        }}     >
            {
                user ?
                    children
                    : <LoginPage />
            }
        </MainContextE.Provider>
    )
}
export const useMainContext = () => {
    const {
        theme,
        settheme,
        user,
        setUser,
        isLoading
    }
        = useContext(MainContextE)
    return {
        theme,
        settheme,
        user,
        setUser,
        isLoading
    }
}

export default MainContext
