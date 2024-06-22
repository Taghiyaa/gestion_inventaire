import * as yup from "yup";

const orderSchema = yup.object({
  name: yup.string().required("veillez remplir ce champ"),
  tel: yup
    .string()
    .required("veillez remplir ce champ")
    .test("entrez un numero valid", "entrez un numero valid", (val) => {
      return !/^(2|3|4)\d{7}$/.test(val);
    }),
  products: yup
    .array(
      yup.object({
        qte: yup.test(
          "entrer un nombre positif",
          "entrer un nombre positif",
          (val) => {
            return !isNaN(val) && Number(val) > 0;
          }
        ),
        pu: yup.test(
          "entrer un nombre positif",
          "entrer un nombre positif",
          (val) => {
            return !isNaN(val) && Number(val) > 0;
          }
        ),
        id: yup.string().required("veillez remplir ce champ"),
      })
    )
    .required("veillez remplir ce champ"),
  name: yup.string().required("veillez remplir ce champ"),
});
export default orderSchema;
