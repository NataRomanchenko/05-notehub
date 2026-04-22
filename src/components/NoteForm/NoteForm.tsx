import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";

interface Props {
  onCreate: (data: {
    title: string;
    content: string;
    tag: string;
  }) => void;
  onClose: () => void;
}

const schema = Yup.object({
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
  tag: Yup.string().required(),
});

export default function NoteForm({ onCreate, onClose }: Props) {
  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "Todo" }}
      validationSchema={schema}
      onSubmit={(values) => {
        onCreate(values);
        onClose();
      }}
    >
      <Form className={css.form}>
        <Field name="title" placeholder="Title" />
        <ErrorMessage name="title" />

        <Field as="textarea" name="content" placeholder="Content" />
        <ErrorMessage name="content" />

        <Field as="select" name="tag">
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Meeting">Meeting</option>
        </Field>

        <button type="submit">Create note</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </Form>
    </Formik>
  );
}