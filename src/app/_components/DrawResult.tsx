/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DrawResultProps {
    setModal: any;
    display: Array<any>;
    setDraw: any;
    compare: any;
}

const DrawResult = (props: DrawResultProps) => {
    const {setModal, display, setDraw, compare} = props;
    const modalRef = useRef<HTMLInputElement>(null)

    const closeModal = (e: any) => {
        if (modalRef.current === e.target) {
            setDraw(false);
            setModal(false);
        }
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-10" ref={modalRef} onClick={(e) => closeModal(e)}>
            <Card >
                <CardHeader>
                    <CardTitle>Result</CardTitle>
                </CardHeader>
              <CardContent >
                {display.map((value: string, index: number) => (
                        <div key={index}>
                            {Object.entries(value).map(([key, value]) => (
                                <div className="flex flex-col justify-center text-xl" key={key} style={{color: compare.filter((obj: any) => obj[0] === key)[0][2] <= 20 ? "red" : "black"}}>
                                    <div className="text-lg">{key} x{value}</div>
                                </div>
                            ))}
                        </div>
                    ))}
              </CardContent>
            </Card>
            </div>
            {/* <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-10" ref={modalRef} onClick={(e) => closeModal(e)}>
                <div className="flex justify-center items-center w-full max-h-screen bg-white border-solid border-2 border-black p-5 mx-2 sm:w-[380px] rounded-md overflow-auto">
                    {display.map((value: string, index: number) => (
                        <div key={index}>
                            {Object.entries(value).map(([key, value]) => (
                                <div className="flex flex-col justify-center items-center text-xl" key={key} style={{color: compare.filter((obj: any) => obj[0] === key)[0][2] <= 20 ? "red" : "black"}}>
                                    <div className="text-lg">{key} x{value}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div> */}
        </>
    )
}

export default DrawResult;