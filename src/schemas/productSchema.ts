import * as yup from "yup";

const productSchema = yup.object({
  name: yup.string().required("veillez remplir ce champ"),
  prixAchat: yup
    .string()
    .required("veiller remplire ce champ")
    .test("entrer un nombre positif", "entrer un nombre positif", (val) => {
      return !isNaN(val) && Number(val) > 0;
    }),
  prixVente: yup
    .string()
    .required("veiller remplire ce champ")
    .test("entrer un nombre positif", "entrer un nombre positif", (val) => {
      return !isNaN(val) && Number(val) > 0;
    }),
  categorie: yup.string().required("veiller remplire ce champ"),
  qte: yup
    .string()
    .required("veiller remplire ce champ")
    .test("entrer un nombre positif", "entrer un nombre positif", (val) => {
      return !isNaN(val) && Number(val) > 0;
    }),
});
export default productSchema;
