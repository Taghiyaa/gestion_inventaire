import { useRouter } from "next/router";
import React from "react";

type Props = {
  id: string;
  label: string;
  type?: string;
  error: any;
  register: any;
  lowerCaseOnly?: boolean;
  UpperCaseOnly?: boolean;
};

export default function Input({
  id,
  label,
  type = "text",
  error,
  register,
  lowerCaseOnly = false,
  UpperCaseOnly = false,
}: Props) {
  const { locale } = useRouter();

  return (
    <div className="p-2 m-1 grid">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={label}
        className={`p-2 m-1 ${
          locale === "ar" ? "text-right" : "text-left"
        } border outline-none rounded-xl ${
          error?.message ? "border-red-500" : "border-primary"
        } ${lowerCaseOnly ? "lowercase" : ""}
        ${UpperCaseOnly ? "uppercase" : ""}`}
        {...register}
      />
      <p className="text-sm text-red-500">{error && error?.message}</p>
    </div>
  );
}
