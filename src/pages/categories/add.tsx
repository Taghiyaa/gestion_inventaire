import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import categorieSchema from "@/schemas/categorieSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

export default function Add() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorieSchema),
  });
  const { mutate } = useMutation({
    mutationKey: ["categorie"],
    mutationFn: async (data: CategorieType) => {
      const res = await axios.post("/api/categories", data);
      return res.data;
    },
    onSuccess: () => {
      push("/categories");
    },
  });
  const onSubmit = (data: CategorieType) => {
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
          label={"Nom du categorie"}
          error={errors?.name}
          register={register("name")}
        />
        <TextArea
          id={"description"}
          label={"desription du categorie"}
          error={errors?.description}
          register={register("description")}
        />
        <button className="bg-cyan-900 p-2 text-white rounded-xl mx-3">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
