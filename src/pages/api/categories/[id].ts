import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import database from "@/lib/middlewares/database";
import { ObjectId } from "mongodb";

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
        .collection("categories")
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
    const { db, body } = req;
    const { id: _id } = req.query;
    const today = new Date();
    const dataToUpdate = {};
    if (!body?.name && body?.description) return res.status(400);
    if (body?.name) dataToUpdate.name = body.name;
    if (body?.description) dataToUpdate.description = body.description;

    // Validate _id
    if (!_id) {
      return res.status(400).json({ message: "categorie ID must be provided" });
    }

    try {
      const categorie = await db
        .collection("categories")
        .findOne({ _id: new ObjectId(_id as string) });
      if (!categorie)
        return res.status(400).send({ message: "no such categorie " });

      const result = await req.db

        .collection("categories")
        .updateOne(
          { _id: new ObjectId(_id as string) },
          { $set: dataToUpdate }
        );

      return res.status(200).json({ message: "event updated successfully" });
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
        .collection("categories")
        .findOne({ _id: new ObjectId(id as string) });

      if (!isExist)
        return res.status(400).send({ message: "categorie not exists" });

      const hasProduct = await db
        .collection("products")
        .find({ roleId: isExist._id })
        .toArray();

      if (hasProduct?.length)
        return res.status(409).send({ message: "categorie has products" });

      await db
        .collection("categories")
        .deleteOne({ _id: new ObjectId(id as string) });

      res.status(200).json({ message: "categorie has been deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  });

export default handler;
