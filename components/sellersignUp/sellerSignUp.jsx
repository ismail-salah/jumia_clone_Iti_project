import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logotop from "../../assets/imgs/validation/myjumia-top-logo.png";
import logobottom from "../../assets/imgs/validation/myjumia-bottom-logo.png";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  passwordConfirm: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const ShowPasswordButton = ({ inputField, showPassword, showConfirmPassword, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      color: "#757575",
      fontSize: "19px",
      position: "absolute",
      right: "10px",
      top: inputField === "password" ? "calc(50% - 14px)" : "calc(50% - 22px)",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
    }}
  >
    {showPassword ? (
      <i className="fas fa-eye-slash"></i>
    ) : (
      <i className="fas fa-eye"></i>
    )}
  </button>
);

const FormHeader = () => (
  <div className="text-center">
    <img
      src={logotop}
      className="mt-1 mb-3 pb-1"
      style={{ width: "64px" }}
      alt="logo"
    />
    <h4
      className="mt-1 mb-1 pb-1 fw-bold"
      style={{
        color: "#4a4a4a",
        fontSize: "20px",
        fontWeight: "500",
      }}
    >
      Create your account
    </h4>
    <p
      className="mt-1 mb-3 pb-1"
      style={{
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "1.5em",
        margin: "8px 0 16px",
      }}
    >
      Let's get started by creating your account.
      <br />
      To keep your account safe, we need a strong password.
    </p>
  </div>
);

const UsernameInput = ({ touched, errors }) => (
  <div
    className="input-group mb-3 mt-4"
    style={{
      display: "flex",
      flexDirection: "column",
      height: "72px", // Fixed height
    }}
  >
    <Field name="name">
      {({ field }) => (
        <MDBInput
          wrapperClass="mb-1"
          label="Username*"
          labelClass="mt-1"
          id="form3"
          type="text"
          size="lg"
          style={{ height: "56px", boxSizing: "border-box" }}
          className={errors.name && touched.name ? "is-invalid" : ""}
          {...field}
        />
      )}
    </Field>
    <ErrorMessage name="name">
      {(msg) => (
        <div
          className="text-danger text-center"
          style={{
            fontSize: "12px",
            fontWeight: "400",
            letterSpacing: "0.4px",
          }}
        >
          {msg}
        </div>
      )}
    </ErrorMessage>
  </div>
);


const EmailInput = ({ touched, errors }) => (
  <div
    className="input-group mb-4 mt-4"
    style={{
      display: "flex",
      flexDirection: "column",
      height: "72px", // Fixed height
    }}
  >
    <Field name="email">
      {({ field }) => (
        <MDBInput
          wrapperClass="mb-1"
          label="Email address*"
          labelClass="mt-1"
          id="form1"
          type="email"
          size="lg"
          style={{ height: "56px", boxSizing: "border-box" }}
          className={errors.email && touched.email ? "is-invalid" : ""}
          {...field}
        />
      )}
    </Field>

    <ErrorMessage name="email">
      {(msg) => (
        <div
          className="text-danger text-center"
          style={{
            fontSize: "12px",
            fontWeight: "400",
            letterSpacing: "0.4px",
          }}
        >
          {msg}
        </div>
      )}
    </ErrorMessage>
  </div>
);

const PasswordInput = ({
  values,
  errors,
  touched,
  showPassword,
  setShowPassword,
  passwordStrength,
  setPasswordStrength,
}) => {
  useEffect(() => {
    if (values.password.length === 0) {
      setPasswordStrength(null);
      return;
    }

    const hasLowerCase = /[a-z]/.test(values.password);
    const hasUpperCase = /[A-Z]/.test(values.password);
    const hasNumber = /\d/.test(values.password);
    const hasSpecialChar = /[@$!%*?&]/.test(values.password);

    const strength =
      (hasLowerCase ? 1 : 0) +
      (hasUpperCase ? 1 : 0) +
      (hasNumber ? 1 : 0) +
      (hasSpecialChar ? 1 : 0);

    if (strength <= 2) {
      setPasswordStrength("weak");
    } else if (strength === 3) {
      setPasswordStrength("good");
    } else {
      setPasswordStrength("strong");
    }
  }, [values.password]);

  return (
    <div
      className="input-group mb-3"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "72px",
        marginBottom: "16px"
      }}
    >
      <Field name="password">
        {({ field }) => (
          <div style={{ position: 'relative' }}>
            <MDBInput
              label="Password*"
              labelClass="mt-1"
              id="form2"
              type={showPassword ? "text" : "password"}
              size="lg"
              style={{ height: "56px", boxSizing: "border-box" }}
              {...field}
              className={
                errors.password && touched.password ? "is-invalid" : ""
              }
            />
            <ShowPasswordButton
              showPassword={showPassword}
              onClick={() => setShowPassword(!showPassword)}
              inputField="password"
            />
          </div>
        )}
      </Field>
      <div style={{ height: errors.password && touched.password ? 'auto' : '24px' }}>
        {passwordStrength && (
          <div className={`strength-bar ${passwordStrength} mb-1 mt-1`}>
            <div className="bar weak"></div>
            <div className="bar good"></div>
            <div className="bar strong"></div>
          </div>
        )}
        <ErrorMessage name="password">
          {(msg) => (
            <div
              className="text-danger text-center mt-1"
              style={{
                fontSize: "12px",
                fontWeight: "400",
                letterSpacing: "0.4px",
              }}
            >
              {msg}
            </div>
          )}
        </ErrorMessage>
      </div>
    </div>
  );
};

const ConfirmPasswordInput = ({
  errors,
  touched,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div
      className="input-group mb-4"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "72px",
      }}
    >
      <Field name="passwordConfirm">
        {({ field }) => (
          <>
            <MDBInput
              wrapperClass="mb-1"
              label="Confirm Password*"
              labelClass="mt-1"
              id="form4"
              type={showPassword ? "text" : "password"}
              size="lg"
              style={{ height: "56px", boxSizing: "border-box" }}
              {...field}
              className={
                errors.passwordConfirm && touched.passwordConfirm
                  ? "is-invalid"
                  : ""
              }
            />
            <ShowPasswordButton
              showPassword={showPassword}
              onClick={() => setShowPassword(!showPassword)}
            />
          </>
        )}
      </Field>
      <ErrorMessage name="passwordConfirm">
        {(msg) => (
          <div
            className="text-danger text-center"
            style={{
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0.4px",
            }}
          >
            {msg}
          </div>
        )}
      </ErrorMessage>
    </div>
  );
};

const ContinueButton = ({ isLoading }) => (
  <>
    {isLoading ?
      <MDBBtn
        className="mb-3 w-100 fw-bolder d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f8972d", height: '45px' }}
        size="lg"
      >
        <div className="spinner-border text-light" role="status">
        </div>
      </MDBBtn> :
      <MDBBtn
        className="mb-3 w-100 fw-bolder"
        style={{ backgroundColor: "#f8972d" }}
        size="lg"
      >
        Continue
      </MDBBtn>}
  </>
);

const FormFooter = () => (
  <div
    className="text-center mt-5"
    style={{
      fontSize: "14px",
      lineHeight: "24px",
      padding: "0 24px",
      position: "relative",
      textAlign: "center",
    }}
  >
    <p>
      For further support, you may visit the Help Center or contact our customer
      service team.
    </p>
    <img
      src={logobottom}
      className="mt-3"
      style={{ width: "100px" }}
      alt="logo"
    />
  </div>
);



export default function Seller() {
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  async function handleRegister(values, { setFieldError }) {
    try {
      setIsLoading(true)
      const response = await axios.post('https://ali-service-ey1c.onrender.com/api/team2/auth/signup', values);
      console.log(response);
      if (response.status === 201) {
        setIsLoading(false)
        navigate("/loginseller");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setIsLoading(false)
        setFieldError("email", "Email already in use");
      }
    }
  }
  return (
    <MDBContainer
      className="p-3 my-5 d-flex flex-column"
      style={{ width: "432px" }}
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
          role: "seller",
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ errors, touched, values }) => (
          <Form>
            <FormHeader />
            <UsernameInput errors={errors} touched={touched} />
            <EmailInput errors={errors} touched={touched} />
            <PasswordInput
              values={values}
              errors={errors}
              touched={touched}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              passwordStrength={passwordStrength}
              setPasswordStrength={setPasswordStrength}
            />
            <ConfirmPasswordInput
              errors={errors}
              touched={touched}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
            />
            <ContinueButton setIsLoading={setIsLoading} isLoading={isLoading} />
            <FormFooter />
          </Form>
        )}
      </Formik>
    </MDBContainer>
  );
}

