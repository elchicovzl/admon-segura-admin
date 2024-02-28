import { db } from "@/lib/db";

interface GetUserProps {
  userId: string;
}

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

    console.log(user);

    return user;
  } catch (error) {
    console.log("[GET_USER]", error);
  }
};
