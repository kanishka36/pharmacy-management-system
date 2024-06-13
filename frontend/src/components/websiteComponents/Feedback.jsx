import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addFeedback } from "../../api/feedback";

const Feedback = () => {
  const feedbackValidationSchema = Yup.object().shape({
    body: Yup.string().required("Required"),
  });

  const feedbackInitialValues = {
    body: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      await addFeedback(values);
      location.reload();
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <>
      <div className="">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-indigo-600">
          Feedback
        </h2>
        <div className="bg-white container m-1 p-1 rounded-md">
          <Formik
            initialValues={feedbackInitialValues}
            validationSchema={feedbackValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors }) => (
              <Form>
                <div className="flex flex-col">
                  <h2 className="text-indigo-600 text-xl font-semibold mb-3">
                    Add Feedback
                  </h2>
                  <div className="flex flex-col gap-1">
                    <div className="basis-1/2">
                      <div className="flex flex-col">
                        <Field
                          type="text"
                          name="body"
                          placeholder="write your feedback"
                          className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
                            touched.body && errors.body ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      <ErrorMessage
                        name="body"
                        component="div"
                        className="text-red-600"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold px-4 py-2 rounded-md mt-4"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Feedback;
