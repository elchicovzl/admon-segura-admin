"use client"
import * as React from "react";

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface valuesSelect {
    nameValue: String
    values : [{label:string, item:string }]
    onChangeProcess :  (value:string) => void
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>, valuesSelect {}

const SelectSearch = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, value, form, values, nameValue, onChangeProcess, ...props }, ref) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                className={cn(
                "w-full justify-between truncate",
                !value && "text-muted-foreground truncate"
                )}
            >
                {value
                    ? values.find(
                        (language) => language.item === value
                        )?.label
                    : "Seleccione"}
            </Button>
            </PopoverTrigger>
            <PopoverContent ref={ref} className="w-full p-0 ">
                  <Command>
                    <CommandInput placeholder="Buscar..." />
                    <CommandEmpty>No se encontró resultado.</CommandEmpty>
                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                      {values.map((language) => (
                        <CommandItem 
                          value={language.label}
                          key={language.item}
                          onSelect={() => {
                            form?.setValue(nameValue, language.item)

                            if (typeof onChangeProcess == "function") {
                              onChangeProcess(language.item)
                            }
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              language.item === value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {language.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
        </Popover>
    )
  });

  export default SelectSearch;