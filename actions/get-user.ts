import { db } from "@/lib/db";

interface GetUserProps {
  userId: string;
}

export const getUsersSelect = async () => {
  try {
    const xprisma = db.$extends({
      result: {
        user: {
          label: {
            // the dependencies
            needs: { email: true },
            compute(user) {
              // the computation logic
              return `${user?.email}`;
            },
          },
          item: {
            needs: { id: true },
            compute(user) {
              return `${user?.id}`;
            },
          },
        },
      },
    });

    const users = await xprisma.user.findMany({
      where: {
        role: "USER",
      },
      select: {
        label: true,
        item: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch (error) {
    console.log("[GET_USERS]", error);
    return { error: "Algo salió mal!" };
  }
};

export const getUser = async ({ userId }: GetUserProps) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        userDetail: true,
        address: true,
        phones: true,
        affiliate: true,
        documents: true,
        beneficiaries: {
          include: {
            documents: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.log("[GET_USER]", error);
  }
};
