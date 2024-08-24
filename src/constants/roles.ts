import { Role } from "@prisma/client";

export const roles = {
  [Role.ROLE_ADMIN]: ["CREATE", "READ", "UPDATE", "DELETE"],
  [Role.ROLE_ASISTAN]: ["CREATE", "READ", "UPDATE"],
  [Role.ROLE_USER]: ["READ"],
};


