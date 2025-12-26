import { CompanyName } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const Logo = ({ className, textClass }) => {
  return (
    <Link href={"/"} className='flex gap-2  items-center'>
      <div className=" p-[1] pl-[4] pr-[2] bg-chart-1 rounded-[4] text-white">
        <i className={`bi bi-tencent-qq ${className}`}></i>
      </div>
      {/* <i className="bi bi-emoji-sunglasses text-chart-1"></i> */}
      <h2 className={`${textClass} font-black  tracking-tighter text-chart-1 `}>{CompanyName}</h2>
    </Link>
  )
}

export default Logo
