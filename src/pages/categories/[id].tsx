import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import categorieSchema from "@/schemas/categorieSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Edit() {
  const { push, query } = useRouter();
  const id = query.id;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorieSchema),
  });
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["categorie", id],
    queryFn: async () => {
      const res = await axios.get("/api/categories/" + id);
      return res.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["categorie"],
    mutationFn: async (data: any) => {
      const res = await axios.put("/api/categories/" + id, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorie"] });
      push("/categories");
    },
    onError: (err: AxiosError) => {
      if (err.status === 400) toast.error("le categorie n'est pas trouvé");
      else if (err.status === 409) toast.error("le categorie a des produits");
      else toast.error("desolé il y'a un probleme");
    },
  });
  const onSubmit = (data: CategorieType) => {
    mutate(data);
  };
  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("description", data.description);
    }
  }, [data]);
  if (isLoading) return <div>chargement en cours</div>;
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
