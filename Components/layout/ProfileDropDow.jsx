"use client"
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react';
import ThemeButtons from '../ui/ThemeSwitcher';
const ProfileDropDow = ({ onClose }) => {
    const PageRef = useRef();
    const handleClickOutside = (e) => {
        if (!PageRef.current?.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <motion.div
            ref={PageRef}
            initial={{
                scale: .3,
                opacity: 0
            }}
            exit={{
                scale: .3,
                opacity: 0
            }}
            animate={{
                scale: 1,
                opacity: 1,
                transformOrigin: "top right"
            }}
            style={{
                filter: `drop-shadow(-5px 5px 5px var(--filter-color))`
            }}
            className='absolute top-0 right-0 bg-background p-2 rounded w-[220]'
        >
            <div className="flex gap-2">
                <div className="p-[1] border-2 border-chart-1/50 rounded-full">
                    <img className='w-[40] min-w-[40]  object-top h-[40] rounded-full object-cover' src="https://i.pinimg.com/736x/af/a4/a2/afa4a2754f1c3745f6435d256e9b6fb4.jpg" alt="" />
                </div>
                <div className="truncate w-full">
                    <h1 className='truncate font-semibold tracking'>Mustapha Iderkaoui</h1>
                    <h1 className='truncate text-sm font-medium opacity-70 tracking'><i className="bi bi-person-gear"></i> Admin</h1>
                </div>

            </div>
            <ThemeButtons />
        </motion.div>
    )
}

export default ProfileDropDow
