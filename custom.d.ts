import { Db } from "mongodb";

declare module "next" {
  interface NextApiRequest {
    db: Db;
  }
}
