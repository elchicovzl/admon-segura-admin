import { Icons } from "@/components/icons";
import { UserSchema } from "@/schemas";
import { PrismaClient, UserDetails } from "@prisma/client";

import * as z from "zod";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

function getDefaults<T extends z.ZodTypeAny>(
  schema: z.AnyZodObject | z.ZodEffects<any>
): z.infer<T> {
  // Check if it's a ZodEffect
  if (schema instanceof z.ZodEffects) {
    // Check if it's a recursive ZodEffect
    if (schema.innerType() instanceof z.ZodEffects)
      return getDefaults(schema.innerType());
    // return schema inner shape as a fresh zodObject
    return getDefaults(z.ZodObject.create(schema.innerType().shape));
  }

  function getDefaultValue(schema: z.ZodTypeAny): unknown {
    if (schema instanceof z.ZodDefault) return schema._def.defaultValue();
    // return an empty array if it is
    if (schema instanceof z.ZodArray) return [];
    // return an empty string if it is
    if (schema instanceof z.ZodString) return "";
    // return an empty date if it is
    if (schema instanceof z.ZodDate) {
      return Date.now();
    }
    // return an content of object recursivly
    if (schema instanceof z.ZodObject) return getDefaults(schema);

    if (!("innerType" in schema._def)) return undefined;
    return getDefaultValue(schema._def.innerType);
  }

  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      return [key, getDefaultValue(value)];
    })
  );
}

export const UserdefaultValue = getDefaults<typeof UserSchema>(UserSchema);

export type UsersDto = z.infer<typeof UserSchema>;

export type initialData = {
  email: string;
};

export interface EditUserDto extends UsersDto {
  id: string;
  userDetail: UserDetails;
}

export type DocumentUserType = {
  userId: string;
  source: string;
};

export type DocumentBeneficiaryType = {
  beneficiaryId: string;
  source: string;
};

export type PrismaTransactionClient = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;

export type BeneficiaryUserType = {
  userId: string;
  affiliateId: string;

  firstName?: string;
  lastname?: string;
  identification?: string;
  relationship?: string;
};

export type UsersColumns = {
  id: String;
  email: String;
  status: String;
  userDetails: {
    fullname: String;
    identification: String;
  };
};
