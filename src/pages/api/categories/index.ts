import database from "@/lib/middlewares/database";
import categorieSchema from "@/schemas/categorieSchema";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next/types";
const handler = nextConnect()
  .use(database)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = req;
    try {
      const data = await db.collection("categories").find().toArray();
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { body, db } = req;
    try {
      categorieSchema.validate(body);
    } catch (err) {
      console.log(err);
      return res.status(400);
    }
    try {
      await db.collection("categories").insertOne(body);
      return res
        .status(201)
        .json({ message: "le Categorie a été ajouté avec succée" });
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  });
export default handler;
