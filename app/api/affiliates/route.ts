import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request, context: any) {
    const affiliates = await db.affiliate.findMany({
     
        orderBy: {
          createdAt: "desc",
        },
    });

    return NextResponse.json(affiliates);
}