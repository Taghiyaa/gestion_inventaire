import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import database from "@/lib/middlewares/database";
import { ObjectId } from "mongodb";
import productSchema from "@/schemas/productSchema";

const handler = nextConnect()
  .use(database)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      db,
      query: { id },
    } = req;

    try {
      // Convert 'id' to a MongoDB ObjectId
      const objectId = new ObjectId(id as string);
      const categorie = await db
        .collection("products")
        .findOne({ _id: objectId });

      if (categorie) {
        return res.status(200).json(categorie);
      } else {
        return res.status(404).json({ message: "categorie not found" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error accessing the database" });
    }
  })
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    const { db, body: dataToUpdate } = req;
    const { id: _id } = req.query;
    const today = new Date();

    try {
      productSchema.validate(dataToUpdate);
    } catch (err) {
      console.log(err);
      return res.status(400);
    }
    // Validate _id
    if (!_id) {
      return res.status(400).json({ message: "categorie ID must be provided" });
    }

    try {
      const product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(_id as string) });
      if (!product)
        return res.status(400).send({ message: "no such product " });

      const result = await req.db

        .collection("products")
        .updateOne(
          { _id: new ObjectId(_id as string) },
          {
            $set: {
              ...dataToUpdate,
              categorie: new ObjectId(dataToUpdate.categorie as string),
            },
          }
        );

      return res.status(200).json({ message: "product updated successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to update the event", error });
    }
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    if (!id) return res.status(400).send({ message: "Invalid data" });

    try {
      const db = req.db;

      const isExist = await db
        .collection("products")
        .findOne({ _id: new ObjectId(id as string) });

      if (!isExist)
        return res.status(400).send({ message: "categorie not exists" });

      await db
        .collection("products")
        .deleteOne({ _id: new ObjectId(id as string) });

      res.status(200).json({ message: "categorie has been deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  });

export default handler;
