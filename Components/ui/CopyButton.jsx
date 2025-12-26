"use client"

import { COPY_TEXT } from "@/lib/utils"
import { Copy } from "lucide-react"

const CopyButton = ({ text, className }) => {
    return (
        <button onClick={() => COPY_TEXT(text)} className={`${className} bg-background  border border-foreground/10 rounded-sm p-[4]`}>
            <Copy className="w-4 h-4 " />
        </button>
    )
}

export default CopyButton
