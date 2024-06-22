import clientPromise from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function database(
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) {
  let db;
  try {
    db = (await clientPromise).db("inventaire");
  } catch (error: any) {
    console.log(error?.message);
    res.status(500).send(error?.message);
    throw new Error(error?.message);
  }
  req.db = db;
  next();
}
