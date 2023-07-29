import React from 'react';
import './Identification.css';
import logotop from "../../assets/imgs/validation/myjumia-top-logo.png";
import logobottom from "../../assets/imgs/validation/myjumia-bottom-logo.png";
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  emailOrPhone: Yup.string().test(
    'emailOrPhone',
    'Either the email or the phone number entered is not valid',
    function (value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^(01)[0125][0-9]{8}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }
  ),
});

const FormHeader = () => (
  <div className="text-center">
    <img
      src={logotop}
      className="mt-1 mb-3 pb-1"
      style={{ width: '64px' }}
      alt="logo"
    />
    <h4
      className="mt-1 mb-1 pb-1 fw-bold"
      style={{
        color: '#4a4a4a',
        fontSize: '20px',
        fontWeight: '500',
      }}
    >
      Welcome to Jumia
    </h4>
    <p
      className="mt-1 mb-4 pb-1"
      style={{
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '1.5em',
        margin: '8px 0 16px',
      }}
    >
      Type your e-mail or phone number to log in or create a Jumia account.
    </p>
  </div>
);

const EmailOrPhoneInput = ({ errors, touched }) => (
  <div
    className="input-group"
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '72px',
    }}
  >
    <Field
      name="emailOrPhone"
      render={({ field }) => (
        <MDBInput

          wrapperClass="mb-1"
          label="Email or Mobile Number*"
          labelClass="mt-1 "
          id="form1"
          type="text"
          size="lg"
          style={{ height: '56px', boxSizing: 'border-box' }}
          className={
            errors.emailOrPhone && touched.emailOrPhone ? 'is-invalid' : ''
          }
          {...field}
        />
      )}
    />

    <ErrorMessage name="emailOrPhone">
      {(msg) => (
        <div
          className="text-danger text-center"
          style={{
            fontSize: '12px',
            fontWeight: '400',
            letterSpacing: '0.4px',
          }}
        >
          {msg}
        </div>
      )}
    </ErrorMessage>
  </div>
);

const ContinueButton = () => (
  <MDBBtn
    className="mb-4 w-100 fw-bold mt-4"
    style={{ backgroundColor: '#f8972d', letterSpacing: '1px' }}
    size="lg"
  >
    Continue
  </MDBBtn>
);

const FacebookLoginButton = () => (
  <MDBBtn
    className="mb-4 w-100 fw-bold"
    size="lg"
    style={{ backgroundColor: '#1877f2' }}
  >
    <MDBIcon
      fab
      icon="facebook-f"
      className="mx-2"
      style={{ letterSpacing: '2px' }}
    />
    Log in with facebook
  </MDBBtn>
);

const FormFooter = () => (
  <div className="text-center mt-5"
    style={{
      fontSize: "14px",
      lineHeight: "24px",
      padding: " 0 24px",
      position: "relative",
      textAlign: "center"
    }}>
    <p>
      For further support, you may visit the Help Center or contact our
      customer service team.
    </p>
    <img
      src={logobottom}
      className="mt-3"
      style={{ width: '100px' }}
      alt="logo"
    />
  </div>
);

function Identification() {
  return (
    <MDBContainer
      className="p-3 my-5 d-flex flex-column"
      style={{ width: '432px' }}
    >
      <Formik
        initialValues={{ emailOrPhone: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <FormHeader />
            <EmailOrPhoneInput errors={errors} touched={touched} />
            <ContinueButton />
            <FacebookLoginButton />
            <FormFooter />
          </Form>
        )}
      </Formik>
    </MDBContainer>
  );
}

export default Identification;