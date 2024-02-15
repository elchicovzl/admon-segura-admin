"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema, UserSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { UsersDto } from "@/types";

export const register = async (values: UsersDto) => {
  const validatedFields = UserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { 
    email,
    password, 
    userDetails, 
    address, 
    phones, 
    affiliate 
  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const details = await db.userDetails.create({
    data: {
      userId: user.id,
      firstName: userDetails?.firstName,
      lastname: userDetails?.lastname,
      age: userDetails?.age,
      identification: userDetails?.identification,
      salary: userDetails?.salary,
      ocupation: userDetails?.ocupation
    }
  });

  const userAddress = await db.address.create({
    data: {
      userId: user.id,
      department: address?.department,
      city: address?.city,
      neighborhood: address?.neighborhood,
      address: address?.address
    }
  });

  const userPhones = await db.phones.create({
    data: {
      userId: user.id,
      cellphone: phones?.cellphone,
      homephone: phones?.homephone
    }
  });

  const thisYear = Number("2024")
  const admissionDate = new Date(thisYear, 2, 14)

  const userAffiliate = await db.affiliate.create({
    data: {
      userId: user.id,
      eps: affiliate?.eps,
      arl: affiliate?.arl,
      healt: affiliate?.healt,
      admissionDate: admissionDate,
      compensationBox: affiliate?.compensationBox,
      typeContributorId: "clsm08a5a0000barngmkexfnj",
    }
  });


  /* const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  ); */

  return { success: "Usuario creado con exito!" };
};
