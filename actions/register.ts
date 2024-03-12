"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import {
  AffiliateSchema,
  EditUserSchema,
  RegisterSchema,
  UserSchema,
} from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import {
  AffiliateDto,
  BeneficiaryUserType,
  DocumentBeneficiaryType,
  DocumentUserType,
  UserEditDto,
  UsersDto,
} from "@/types";
import { z } from "zod";

export const registerAffiliate = async (values: AffiliateDto) => {
  const validatedFields = AffiliateSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { ["beneficiaries"]: excludedKey, ...affiliate } = validatedFields.data;

  try {
    const affiliateResult = await db.affiliate.create({
      data: affiliate,
    });
  } catch (error) {
    console.log("[REGISTER_AFFILIATE]", error);
    return { error: "Algo salió mal!" };
  }
};

export const register = async (values: UsersDto) => {
  const validatedFields = UserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    email,
    password,
    userDetail,
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
            firstname: userDetail?.firstname,
            lastname: userDetail?.lastname,
            identification: userDetail?.identification,
            birthdate: userDetail?.birthdate,
            ocupation: userDetail?.ocupation,
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
            salary: affiliate?.salary,
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
          firstname: beneficiary.firstname,
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

export const updateUser = async (values: UserEditDto) => {
  const validatedFields = EditUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  console.log("actualizando usuario--", values);

  const { id, email, password, userDetail } = validatedFields.data;

  const createDocuments: DocumentUserType[] = [];

  values.documents?.map((doc, index) => {
    const docObj: DocumentUserType = {
      userId: doc.userId,
      source: doc.source,
    };

    createDocuments.push(docObj);
  });

  try {
    const updatedUser = await db.user.update({
      where: { id: id },
      data: {
        email: values?.email,
        userDetail: {
          update: {
            where: {
              userId: id,
            },
            data: {
              firstname: values.userDetail?.firstname,
              lastname: values.userDetail?.lastname,
              identification: values.userDetail?.identification,
              birthdate: values.userDetail?.birthdate,
              ocupation: values.userDetail?.ocupation,
            },
          },
        },
        address: {
          update: {
            where: {
              userId: id,
            },
            data: {
              address: values.address?.address,
              city: values.address?.city,
              department: values.address?.department,
              neighborhood: values.address?.neighborhood,
            },
          },
        },
        phones: {
          update: {
            where: {
              userId: id,
            },
            data: {
              cellphone: values.phones?.cellphone,
              homephone: values.phones?.homephone,
            },
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Algo salió mal!" };
  }

  return { success: "Usuario actualizado con exito!" };
};
