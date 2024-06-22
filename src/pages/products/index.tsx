import DataTable from "@/components/DataTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { MdOutlineDeleteOutline, MdEditNote } from "react-icons/md";
import { toast } from "react-toastify";

export default function Index() {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axios.get("/api/products");
      return res.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["product"],
    mutationFn: async (data: any) => {
      const res = await axios.delete("/api/products/" + data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("le categorie a été supprimé avec succée");
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (err: AxiosError) => {
      if (err.status === 400) toast.error("le produit n'est pas trouvé");
      else if (err.status === 409) toast.error("le produit a des produits");
      else toast.error("desolé il y'a un probleme");
    },
  });
  const columns = useMemo(() => {
    const cols: ColumnDef<ProductType>[] = [
      {
        header: "Nom",
        accessorKey: "name",
        cell: ({ row }) => row.getValue("name"),
      },
      {
        header: "Categorie du produit",
        accessorKey: "categorie.name",
        cell: ({ row }) => row.original.categorie.name,
      },
      {
        header: "Prix d'achat",
        accessorKey: "prixAchat",
        cell: ({ row }) => row.getValue("prixAchat") + "MRU",
      },
      {
        header: "Prix de vente",
        accessorKey: "prixVente",
        cell: ({ row }) => row.getValue("prixVente") + "MRU",
      },
      {
        header: "Quantité en stock",
        accessorKey: "qte",
        cell: ({ row }) => row.getValue("qte"),
      },

      {
        header: "Action",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => push("products/" + row.original._id.toString())}
              className="border-green-600 border text-green-600 p-1 shadow-md rounded-xl hover:text-white hover:bg-green-600"
            >
              <MdEditNote size={20} />
            </button>
            <button
              onClick={() => mutate(row.original._id.toString())}
              disabled={isPending}
              className="border-red-600 border  p-1 shadow-md rounded-xl hover:text-white hover:bg-red-500 text-red-500"
            >
              <MdOutlineDeleteOutline size={20} />
            </button>
          </div>
        ),
      },
    ];
    return cols;
  }, []);
  return (
    <div className="p-6 grid ">
      {isLoading ? (
        <p>Chargement en cours</p>
      ) : (
        data?.length && (
          <DataTable data={data} columns={columns} addLink="/products/add" />
        )
      )}
    </div>
  );
}
