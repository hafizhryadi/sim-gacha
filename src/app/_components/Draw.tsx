/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react";
import DrawResult from "./DrawResult";
import { Button } from "@/components/ui/button"

interface DrawProps {
    draw: boolean;
    setDraw: any;
    state: any;
}

const Draw = (props: DrawProps) => {
    const {state, draw, setDraw} = props;
    const [prize, setPrize] = useState<any>([]);
    const [display, setDisplay] = useState<any>([]);
    const [compare, setCompare] = useState<any>([]);
    const [lickbox, setLickbox] = useState<string[]>([]);
    const [error, setError] = useState<string>("");
    const [modal, setModal] = useState<boolean>(false);

    useEffect(() => {
        if (prize.length > 0) {
            const countedNames = prize.reduce(function (allNames: any, name: any) {
                if (name in allNames) {
                    allNames[name] += 1;
                } else {
                    allNames[name] = 1
                }
                return allNames
            }, {})
            setDisplay([countedNames])
        }
    }, [prize]);

    useEffect(() => {
        setError("");
    }, [state]);

    useEffect(() => {
        if (state) {
            const data = state.toString().split("\n");
            const allItems: object[] = [];
            const compare: object[] = [];

            // put in the prize
            data.forEach((item:string) => {
                const getItems = item.split("\t");
                const object = {...getItems};
                allItems.push(object);
            });

            // used to compare the probability in result page
            data.forEach((item: string) => {
                const getItems = item.split("\t")
                const object = {...getItems};
                compare.push(object);
            });

            setCompare(compare);

            // Debugging, do not execute further when it occurs    
            let debug = false;
            allItems.forEach((item: object) => {
                if (Object.keys(item).length < 3) {
                    debug = true
                }
            });

            if (debug) {
                setError("Format error");
                return;
            }

            // take out all the probabilities and then get the probability with the longest decimal point
            let longest = 0
            const temp = allItems.map((prob: any) => prob["2"])

            temp.forEach((prob) => {
                let after_point = ""
                const check = prob.includes(".")
                if (check) {
                    after_point = prob.split(".")[1].split("%")[0]
                }
                if (after_point.length > longest) {
                    longest = after_point.length
                }
            })

            const multiple = Math.pow(10, longest)

            // make the probability an integer (add 0)
            allItems.forEach((value: any) => {
                value[2] = parseFloat(value[2]) * multiple
            })

            const max = multiple * 100
            const lickBox: string[] = []

            const check = allItems.reduce(
                (acc, curr: any) => acc + parseInt(curr[2]), 0
            )

            if (check !== max) {
                setError("All probability must reach 100%")
            }

            for (let i = 0; i < max; i++) {
                allItems.forEach((value: any) => {
                    if (value[2] > 0) {
                        lickBox.push(value)
                        value[2] -= 1
                    }
                })
            }

            setLickbox(lickBox)
        }
    }, [state])

    const pick = (times: number) => {
        setDraw(true)
        setTimeout(() => {
            setPrize([])
            for (let i = 0; i < times; i++) {
                const result = lickbox[Math.floor(Math.random() * lickbox.length)][0]
                setPrize((prev: string[]) => [...prev, result])
                setModal(true)
            }
        }, 2000)
    }
    
    return (
        <>
            <>
                {error && (
                    <div className="text-center mt-5 text-red-500 font-bold text-2xl">
                        {error}
                    </div>
                )}
                <br />
                <div className="flex justify-beetween">
                    <Button className={error || draw || !state ? "border-solid border-2 border-gray-500 bg-white text-gray-500 p-2 rounded-sm m-3" : "border-solid border-2 border-black bg-white text-black p-2 rounded-sm hover:bg-gray-400 m-3"} 
                    onClick={() => pick(1)} 
                    disabled = {error || draw || !state ? true : false}>Pull 1</Button>
                    <Button className={error || draw || !state ? "border-solid border-2 border-gray-500 bg-white text-gray-500 p-2 rounded-sm m-3" : "border-solid border-2 border-black bg-white text-black p-2 rounded-sm hover:bg-gray-400 m-3"} 
                    onClick={() => pick(10)} 
                    disabled = {error || draw || !state ? true : false}>Pull 10</Button>
                    <Button className={error || draw || !state ? "border-solid border-2 border-gray-500 bg-white text-gray-500 p-2 rounded-sm m-3" : "border-solid border-2 border-black bg-white text-black p-2 rounded-sm hover:bg-gray-400 m-3"} 
                    onClick={() => pick(100)} 
                    disabled = {error || draw || !state ? true : false}>Pull 100</Button>
                </div>
                <br />
                {modal && (
                    <DrawResult
                        setModal={setModal}
                        display={display}
                        setDraw={setDraw}
                        compare={compare}
                    />
                )}
            </>
        </>
    )
}

export default Draw