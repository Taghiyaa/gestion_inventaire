import database from "@/lib/middlewares/database";
import productSchema from "@/schemas/productSchema";
import { ObjectId } from "mongodb";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next/types";
const handler = nextConnect()
  .use(database)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = req;
    try {
      const data = await db
        .collection("products")
        .aggregate([
          {
            $lookup: {
              from: "categories",
              localField: "categorie",
              foreignField: "_id",
              as: "categorie",
            },
          },
          {
            $addFields: {
              categorie: { $first: "$categorie" },
            },
          },
        ])
        .toArray();
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { body, db } = req;
    try {
      productSchema.validate(body);
    } catch (err) {
      console.log(err);
      return res.status(400);
    }
    try {
      const categorie = await db
        .collection("categories")
        .findOne({ _id: new ObjectId(body.categorie as string) });
      if (!categorie) return res.status(400);
      await db.collection("products").insertOne({
        ...body,
        categorie: new ObjectId(body.categorie as string),
      });
      return res
        .status(201)
        .json({ message: "le produit a été ajouté avec succée" });
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  });
export default handler;
