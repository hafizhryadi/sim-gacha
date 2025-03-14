'use client'

import { useState } from "react"
import Draw from "./Draw"
import PrizeList from "./PrizeList"

const prob = `H	2	1.590%	
G	1	0.790%
F	12	9.520%
E	12	9.530%
D	5	3.970%
C	14	11.110%
B	36	28.570%
A	44	34.920%`

const StateInput = () => {
    const [state] = useState<string>(prob)
    const [draw, setDraw] = useState<boolean>(false)

    return (
        <>
            <div className="flex flex-col h-full w-full justify-center items-center">
                <Draw state={state} draw={draw} setDraw={setDraw}/>
            </div>
            <div className="flex flex-col h-[500px] lg:flex-row lg:gap-5 lg:justify-center">
                <div className="relative mt-10 basis-[50%] h-full hidden lg:block lg:overflow-scroll">
                    <p className="text-center font-bold">Prize List</p>
                    <PrizeList state={state}/>
                </div>
                <div className={draw ? "flex flex-col m-5 lg:hidden" : "group flex flex-col m-5 lg:hidden"}>
                    <span className="text-xl text-center border-solid border-black border-2 bg-white text-black cursor-pointer">
                        Prize List
                    </span>
                    <div className="relative group h-0 duration-500 overflow-scroll group-hover:h-[500px]">
                        <PrizeList state={state}/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default StateInput
