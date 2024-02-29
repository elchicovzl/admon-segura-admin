"use client"

import * as React from "react";
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandInput } from "../ui/command";
import { Calendar } from "../ui/calendar";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const DatePicker = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, value, onChange, form, ...props }, ref) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    {value ? (
                        format(value, "PPP", {locale: es})
                    ) : (
                        <span>Selecciona una fecha</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent ref={ref} className="w-full p-0 ">
                <Calendar
                    mode="single"
                    locale={es}
                    selected={value}
                    onSelect={onChange}
                    captionLayout="dropdown-buttons"
                    fromYear={1950}
                    toYear={2025}
                    /* disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    } */
                    initialFocus
                  />
                </PopoverContent>
        </Popover>
    )});

    export default DatePicker;