import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import Image from "next/image";


const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <>
    <LoginButton  asChild>
        <Button className="flex items-center gap-x-2 rounded-none font-medium text-gray-800/[.8] hover:text-gray-800 sm:border-s sm:border-gray/[.4] sm:my-6 sm:ps-6" variant="link" size="sm">
            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="font-medium ">Iniciar Sesion</span>
            
        </Button>
    </LoginButton>
    </>
  )
}
