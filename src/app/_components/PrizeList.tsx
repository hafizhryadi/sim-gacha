/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface PrizelistsProps {
    state: any
}

const PrizeList = (props: PrizelistsProps) => {
    const {state} = props
    const [display, setDisplay] = useState<any>([])

    useEffect(() => {
        if (state) {
            const data = typeof state === "string" ? state.split("\n") : state.toString().split("\n")
            const parsedItems: object[] = []

            // put in prize
            data.forEach((item: string) => {
                const getItems = item.split("\t")
                const object = {...getItems}
                parsedItems.push(object)
            })

            setDisplay(parsedItems)
        } else {
            setDisplay([])
        }
    }, [state])

    return (
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Items</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Chance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {display.map((value: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{value[0]}</TableCell>
              <TableCell>{value[1]}</TableCell>
              <TableCell>{value[2]}</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
    )
}

export default PrizeList