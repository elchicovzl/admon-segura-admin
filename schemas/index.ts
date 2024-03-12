import * as z from "zod";
import { StatusList, UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const EditUserSchema = z.object({
  id: z.string(),
  email: z.optional(z.string()),
  password: z.optional(z.string()),
  userDetail: z.optional(
    z.object({
      userId: z.string(),
      firstname: z.optional(z.string()),
      lastname: z.optional(z.string()),
      identification: z.optional(z.string()),
      ocupation: z.optional(z.string()),
      birthdate: z.optional(z.coerce.date()),
    })
  ),
  address: z.optional(
    z.object({
      userId: z.string(),
      department: z.optional(z.string()),
      city: z.optional(z.string()),
      neighborhood: z.optional(z.string()),
      address: z.optional(z.string()),
    })
  ),
  phones: z.optional(
    z.object({
      userId: z.string(),
      cellphone: z.optional(z.string()),
      homephone: z.optional(z.string()),
    })
  ),
  documents: z.optional(
    z.array(
      z.optional(
        z.object({
          userId: z.string(),
          source: z.string(),
        })
      ),
      z.optional(z.string())
    )
  ),
});

export const AffiliateSchema = z.object({
  userId: z.string(),
  healt: z.optional(z.string()),
  eps: z.optional(z.string()),
  arl: z.optional(z.string()),
  salary: z.optional(z.string()),
  compensationBox: z.optional(z.string()),
  typeContributorId: z.string(),
  admissionDate: z.optional(z.coerce.date()),

  beneficiaries: z.optional(
    z.array(
      z.object({
        firstname: z.optional(z.string()),
        lastname: z.optional(z.string()),
        identification: z.optional(z.string()),
        relationship: z.optional(z.string()),
        documents: z.optional(z.array(z.string())),
      })
    )
  ),
});

export const UserSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),

  userDetail: z.optional(
    z.object({
      userId: z.string(),
      firstname: z.optional(z.string()),
      lastname: z.optional(z.string()),
      identification: z.optional(z.string()),
      ocupation: z.optional(z.string()),
      birthdate: z.optional(z.coerce.date()),
    })
  ),

  address: z.optional(
    z.object({
      userId: z.string(),
      department: z.optional(z.string()),
      city: z.optional(z.string()),
      neighborhood: z.optional(z.string()),
      address: z.optional(z.string()),
    })
  ),

  phones: z.optional(
    z.object({
      userId: z.string(),
      cellphone: z.optional(z.string()),
      homephone: z.optional(z.string()),
    })
  ),

  affiliate: z.optional(
    z.object({
      userId: z.string(),
      healt: z.optional(z.string()),
      eps: z.optional(z.string()),
      arl: z.optional(z.string()),
      salary: z.optional(z.string()),
      compensationBox: z.optional(z.string()),
      typeContributorId: z.optional(z.string()),
      admissionDate: z.optional(z.coerce.date()),
    })
  ),

  documents: z.optional(
    z.object({
      userId: z.string(),
      documents: z.optional(z.array(z.string())),
    })
  ),

  beneficiaries: z.optional(
    z.array(
      z.object({
        firstname: z.optional(z.string()),
        lastname: z.optional(z.string()),
        identification: z.optional(z.string()),
        relationship: z.optional(z.string()),
        documents: z.optional(z.array(z.string())),
      })
    )
  ),
});
