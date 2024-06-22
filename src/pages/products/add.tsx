import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import productSchema from "@/schemas/productSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import Select from "@/components/Select";

export default function Add() {
  const { push } = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["categorie"],
    queryFn: async () => {
      const res = await axios.get("/api/categories");
      return res.data;
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["product"],
    mutationFn: async (data: ProductType) => {
      const res = await axios.post("/api/products", data);
      return res.data;
    },
    onSuccess: () => {
      push("/products");
    },
  });
  const onSubmit = (data: ProductType) => {
    mutate(data);
  };
  return (
    <div className="grid items-center justify-center w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-20 shadow-xl border rounded-3xl grid items-center justify-center w-full"
      >
        <Input
          id={"name"}
          label={"Nom du produit"}
          error={errors?.name}
          register={register("name")}
        />
        <Input
          id={"prixAchat"}
          type="number"
          label={"prix d'achat du produit"}
          error={errors?.prixAchat}
          register={register("prixAchat")}
        />
        <Input
          id={"prixVente"}
          type="number"
          label={"prix de vente du produit"}
          error={errors?.prixVente}
          register={register("prixVente")}
        />
        <Input
          id={"qte"}
          type="number"
          label={"quantité en stock"}
          error={errors?.qte}
          register={register("qte")}
        />
        <Select
          id={"categorie"}
          label={"categorie du produit"}
          error={errors?.categorie}
          register={register("categorie")}
          options={
            data?.length > 0
              ? [
                  { value: "", label: "" },
                  ...data.map((e) => ({
                    value: e._id.toString(),
                    label: e.name,
                  })),
                ]
              : []
          }
        />
        <button
          disabled={isPending}
          className="bg-cyan-900 p-2 text-white rounded-xl mx-3"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
