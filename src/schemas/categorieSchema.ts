import * as yup from "yup";

const categorieSchema = yup.object({
  name: yup.string().required("veillez remplir ce champ"),
  description: yup.string().required("veillez remplir ce champ"),
});
export default categorieSchema;
