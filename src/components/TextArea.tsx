import { useRouter } from "next/router";
import React from "react";

type Props = {
  id: string;
  label: string;
  error: any;
  register: any;
};

export default function TextArea({ id, label, error, register }: Props) {
  const { locale } = useRouter();
  return (
    <div className="p-2 m-1 grid">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        placeholder={label}
        className={`p-2 m-1 ${
          locale === "ar" ? "text-right" : "text-left"
        } border outline-none rounded-xl ${
          error?.message ? "border-red-500" : "border-primary"
        }`}
        {...register}
      />
      <p className="text-sm text-red-500">{error && error?.message}</p>
    </div>
  );
}
