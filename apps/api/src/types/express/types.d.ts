import type { User } from "@/types/global/types.js";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
