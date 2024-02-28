"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterSchema, UserSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import {
  BeneficiaryUserType,
  DocumentBeneficiaryType,
  DocumentUserType,
  UsersDto,
} from "@/types";

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
    affiliate,
    documents,
    beneficiaries,
  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  try {
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const createDocuments: DocumentUserType[] = [];

    documents?.documents?.map((doc, index) => {
      const docObj: DocumentUserType = {
        userId: user.id,
        source: doc,
      };

      createDocuments.push(docObj);
    });

    const [details, userAddress, userPhones, userAffiliate, userDocuments] =
      await db.$transaction([
        db.userDetails.create({
          data: {
            userId: user.id,
            firstName: userDetails?.firstName,
            lastname: userDetails?.lastname,
            age: userDetails?.age,
            identification: userDetails?.identification,
            salary: userDetails?.salary,
            ocupation: userDetails?.ocupation,
          },
        }),

        db.address.create({
          data: {
            userId: user.id,
            department: address?.department,
            city: address?.city,
            neighborhood: address?.neighborhood,
            address: address?.address,
          },
        }),

        db.phones.create({
          data: {
            userId: user.id,
            cellphone: phones?.cellphone,
            homephone: phones?.homephone,
          },
        }),

        db.affiliate.create({
          data: {
            userId: user.id,
            eps: affiliate?.eps,
            arl: affiliate?.arl,
            healt: affiliate?.healt,
            admissionDate: affiliate?.admissionDate,
            compensationBox: affiliate?.compensationBox,
            typeContributorId: "clsm08a5a0000barngmkexfnj",
          },
        }),

        db.document.createMany({
          data: createDocuments,
          skipDuplicates: true,
        }),
      ]);

    const beneficiariesData: BeneficiaryUserType[] = [];

    const documentsBeneficiaries = [];

    beneficiaries?.map((beneficiary, index) => {
      const objBene = db.beneficiary.create({
        data: {
          userId: user.id,
          affiliateId: userAffiliate.id,
          firstName: beneficiary.firstname,
          lastname: beneficiary.lastname,
          identification: beneficiary.identification,
          relationship: beneficiary.relationship,
        },
      });

      //@ts-ignore
      beneficiariesData.push(objBene);
    });

    //@ts-ignore
    const beneficiariesCreate = await db.$transaction(beneficiariesData, {});

    const createDocumentsBene: DocumentBeneficiaryType[] = [];
    beneficiariesCreate?.map(
      (beneficiaryCreated: BeneficiaryUserType, index) => {
        beneficiaries?.map((beneficiary, index) => {
          if (beneficiary.identification == beneficiaryCreated.identification) {
            console.log("guardar bene");

            beneficiary.documents?.map((doc, index) => {
              const docBeneObj: DocumentBeneficiaryType = {
                //@ts-ignore
                beneficiaryId: beneficiaryCreated.id,
                source: doc,
              };

              createDocumentsBene.push(docBeneObj);
            });
          }
        });
      }
    );

    if (createDocumentsBene.length > 0) {
      const somes = await db.document.createMany({
        data: createDocumentsBene,
        skipDuplicates: true,
      });
    }
  } catch (error) {
    console.log(error);
    return { error: "Algo salió mal!" };
  }

  /* const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  ); */

  return { success: "Usuario creado con exito!" };
};
