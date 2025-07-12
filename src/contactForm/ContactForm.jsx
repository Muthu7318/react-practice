import { useState } from "react";

function ContactForm() {
  const [userInfo, setUserInfo] = useState(null);
  const [formError, setFormError] = useState(null);
  const [submit, setSubmit] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(userInfo);

    if (userInfo === null) {
      setFormError({
        ...formError,
        nameError: "name should not be empty",
        emailError: "email should not be empty",
        messageError: "message should not be empty",
      });
    } else {
      if (!userInfo?.name) {
        setFormError({ ...formError, nameError: "name should not be empty" });
      } else if (!userInfo?.email) {
        setFormError({ ...formError, emailError: "email should not be empty" });
      } else if (!userInfo?.message) {
        setFormError({
          ...formError,
          messageError: "message should not be empty",
        });
      }
    }

    if (userInfo.name && userInfo.email && userInfo.message) {
      setSubmit(true);
    }
  }

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      {submit ? (
        <>
          <p>Thank for the detiails</p>
          <button
            onClick={() => {
              setSubmit(false);
              setUserInfo({});
            }}
          >
            Goback
          </button>
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "inline-flex",
            gap: "20px",
            flexDirection: "column",
          }}
        >
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            onChange={(e) => {
              setUserInfo({ ...userInfo, name: e.target.value });
              setFormError({ ...formError, nameError: "" });
            }}
            value={userInfo?.name}
          ></input>
          {formError?.nameError && (
            <p
              style={{
                color: "red",
              }}
            >
              {formError.nameError}
            </p>
          )}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => {
              setUserInfo({ ...userInfo, email: e.target.value });
              setFormError({ ...formError, emailError: "" });
            }}
            value={userInfo?.email}
          ></input>
          {formError?.emailError && (
            <p
              style={{
                color: "red",
              }}
            >
              {formError.emailError}
            </p>
          )}

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            onChange={(e) => {
              setUserInfo({ ...userInfo, message: e.target.value });
              setFormError({ ...formError, messageError: "" });
            }}
            value={userInfo?.message}
          ></textarea>
          {formError?.messageError && (
            <p
              style={{
                color: "red",
              }}
            >
              {formError.messageError}
            </p>
          )}
          <button>Submit</button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
