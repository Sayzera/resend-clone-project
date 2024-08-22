import { Role } from "@prisma/client";

export const roles = {
  [Role.ROLE_ADMIN]: ["CREATE", "READ", "UPDATE", "DELETE"],
  ROLE_ASISTAN: ["CREATE", "READ", "UPDATE"],
  ROLE_USER: ["READ"],
};


