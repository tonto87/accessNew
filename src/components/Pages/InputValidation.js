import * as Yup from "yup";

export const OfficeValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Office name must be at least 3 characters.")
    .required("Office name is required."),
  address: Yup.string()
    .trim()
    .min(5, "Address must be at least 5 characters.")
    .required("Address is required."),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone must contain only digits.")
    .required("Phone number is required."),
});

export const DepartmentValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Department name must be at least 3 characters.")
    .required("Department name is required."),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone must contain only digits.")
    .required("Phone number is required."),
  parent: Yup.string().required("Parent department is required."),
  office: Yup.string().required("Office selection is required."),
});

export const VisitorValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters.") // Минимальная длина имени
    .required("Name is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone must contain only digits") // Проверка на цифры
    .required("Phone is required"),
  fin: Yup.string()
    .min(3, "Fin must be at least 3 characters.") // Минимальная длина для фин
    .required("Fin is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  address: Yup.string()
    .min(5, "Address must be at least 5 characters.") // Минимальная длина для адреса
    .required("Address is required"),
  // description: Yup.string()
  //   .min(5, 'Description must be at least 5 characters.') // Минимальная длина описания
  //   .required('Description is required'),
  // photo: Yup.mixed()
  //   .required("Photo is required")
  //   .test("fileType", "Unsupported file format", (value) => {
  //     if (value) {
  //       const fileType = value.type;
  //       return fileType === "image/jpeg" || fileType === "image/png";
  //     }
  //     return true;
  //   }),
});
