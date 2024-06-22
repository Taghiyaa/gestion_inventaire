import { useRouter } from "next/router";
import React from "react";

type Props = {
  id: string;
  label: string;
  type?: string;
  error: any;
  register: any;
  options: { label: string; value: string }[];
};

export default function Select({ id, label, options, error, register }: Props) {
  const { locale } = useRouter();
  return (
    <div className="p-2 m-1 grid ">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className={`p-2 m-1 border border-primary ${
          locale === "ar" ? "text-right" : "text-left"
        }  bg-white outline-none rounded-xl ${
          error?.message ? "border-red-500" : "border-priary"
        }`}
        {...register}
      >
        {(options || []).map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className="text-sm text-red-500">{error && error?.message}</p>
    </div>
  );
}
