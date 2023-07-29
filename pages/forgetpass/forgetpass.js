import React from 'react';
import './forgetpass.css';
import logotop from "../../assets/imgs/validation/myjumia-top-logo.png";
import logobottom from "../../assets/imgs/validation/myjumia-bottom-logo.png";
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const FormHeader = () => (
  <div className="text-center">
    <div style={{ position: 'relative' }}>
      <span style={{
           borderRadius: '50%',
           backgroundColor: '#4f4f4f',
           padding: '7px',
           position: 'absolute',
           top: '33px',
           right: '155px',
           width: '29px',
           height: '29px',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center'
      }}>
        <i class="fas fa-lock" style={{ color: 'white' }}></i>
      </span>
      <img
        src={logotop}
        className="mt-1 mb-3 pb-1"
        style={{ width: '64px' }}
        alt="logo"
      />
    </div>
    <h4
      className="mt-1 mb-1 pb-1 fw-bold"
      style={{
        color: '#4a4a4a',
        fontSize: '20px',
        fontWeight: '500',
      }}
    >
      Recover your password
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
      You can request a password reset below. We will send a security code to the email address, please make sure it is correct.
    </p>
  </div>
);


const Email = ({ errors, touched }) => (
  <div
    className="input-group"
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '72px',
    }}
  >
    <Field
          name="email"
      render={({ field }) => (
        <MDBInput
          wrapperClass="mb-1"
          label="Email address*"
          labelClass="mt-1 "
          id="form1"
          type="text"
          size="lg"
          style={{ height: '56px', boxSizing: 'border-box' }}
          className={
            errors.email && touched.email ? 'is-invalid' : ''
                     }
          {...field}
        />
      )}
    />

<ErrorMessage name="email">
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
   type="submit"
    className="mb-4 w-100 fw-bold mt-4"
    style={{ backgroundColor: '#f8972d', letterSpacing: '1px' }}
    size="lg"
  >
    Request password reset
  </MDBBtn>
);

const FormFooter = () => (
  <div className="text-center mt-5"
  style={{    
    fontSize: "14px",
    lineHeight: "24px",
    padding:" 0 24px",
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

function ForgetPass() {
  
  return (
    <MDBContainer
      className="p-3 my-5 d-flex flex-column"
      style={{ width: '432px' }}
    >
      <Formik
        initialValues={{ email: '' }}
        
        validationSchema={validationSchema}
        onSubmit={console.log('smthin')}
      >
        {({ errors, touched }) => (
          <Form>
            <FormHeader />
            <Email errors={errors} touched={touched} />
            <ContinueButton />
            <FormFooter />
          </Form>
        )}
      </Formik>
    </MDBContainer>
  );
}

export default ForgetPass;