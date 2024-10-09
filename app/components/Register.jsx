import { useState, useEffect } from "react";

export const Register = ({ isAlreadyUser, setAlreadyUser }) => {
  const [isPassVisible, setPassVisible] = useState(false);
  const [isCnfPassVisible, setCnfPassVisible] = useState(false);
  const [isusernameValid, setUsernameValidity] = useState(true);
  const [isEmailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPass, setCnfPass] = useState("");
  const [isPasswordError, setPasswordError] = useState();
  const [isCnfPassErr, setCnfPassErr] = useState();

  useEffect(() => handleCnfPassValidation(), [password]);

  const handleCheckingUser = async (e) => {
    const username = e.target.value;
    if (username.length !== 0) {
      try {
        const response = await fetch("/api/check-username-existence", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username }),
        });
        const data = await response.json();
        return setUsernameValidity(data.isEligible);
      } catch (error) {
        console.log(
          "this error happen during fetching from check-username availablitiy",
          error
        );
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      password === cnfPass &&
      isPasswordError.length === 0 &&
      isusernameValid === true &&
      isEmailError.length === 0
    ) {
      const formData = new FormData(e.target);
      const emailAddress = formData.get("emailAddress");
      const username = formData.get("username");
      const password = formData.get("password");
      const cnfPassword = formData.get("cnfPassword");

      // TODO: HERE WE CAN CALL AN API END POINT TO REGISTER THE USERNAME
    }
  };

  const handleEmailValidation = (e) => {
    const email = e.target.value;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.length !== 0) {
      const result = regex.test(email);
      return result
        ? setEmailError("")
        : setEmailError("Please Enter a valid email");
    }
    return setEmailError("Please Enter your email");
  };

  const handlePasswordValidation = (e) => {
    setPassword(e.target.value);

    if (e.target.value.length !== 0) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}/;
      if (/^(?=.*).{8,}$/.test(e.target.value)) {
        if (/^(?=.*)(?=.*[A-Z]).{8,}$/.test(e.target.value)) {
          if (/^(?=.*)(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(e.target.value)) {
            if (
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}/.test(
                e.target.value
              )
            ) {
              return setPasswordError("");
            }
            return setPasswordError(
              "Password must have special symbol (@,#,$,!)"
            );
          }
          return setPasswordError(
            "Password should include at least one Number"
          );
        }
        return setPasswordError(
          "Password must include a  one uppercase letter"
        );
      }
      return setPasswordError("Password must be at least Eight characters");
    }

    return setPasswordError("Password Required");
  };

  const handleCnfPassValidation = () => {
    if (cnfPass === password) {
      return setCnfPassErr("");
    }
    return setCnfPassErr("Not match with Password");
  };

  const handleChangeCnfPass = (e) => {
    setCnfPass(e.target.value);
  };

  return (
    <div className="m-auto  w-[90%] h-[700px] mt-[8vh] sm:w-[60%] max-w-[500px] justify-center rounded md:w-[50%] lg:w-[40%] 2xl:[20%] flex flex-col border-solid  border-gray-300 bg-white/10  border-[2px] box-border  items-center">
      <h1 className="text-4xl  mb-[10%] " id="company-name">
        Company Name
      </h1>
      <form
        action="/register"
        method="POST"
        className="flex flex-col items-center w-[70%] sm:w-[60%] my-2  mx-auto"
        onSubmit={handleSubmit}
      >
        <label htmlFor="emailAddress" className="h-[108px]">
          Email address
          <div
            className={`rounded  relative w-[296px]  [2px] my-1 border-2  ${
              isEmailError ? "border-red-500" : "border-white"
            } focus-within:bg-white p-2 flex bg-gray-100 items-center`}
          >
            <span className=" left-2  text-xl">&#128231;</span>
            <input
              type="text"
              className=" rounded bg-gray-100 mx-2 h-[36px] text-sm focus:outline-none focus:bg-white text-black "
              placeholder="Email address"
              name="emailAddress"
              id="emailAddress"
              title="Please enter a valid Email"
              required
              autoComplete="off"
              onBlur={(e) => handleEmailValidation(e)}
            />
          </div>
          <p className="text-red-600 italic">{isEmailError}</p>
        </label>
        <label htmlFor="userName" className="h-[108px]">
          Username
          <div
            className={`rounded relative ${
              isusernameValid ? "border-white" : "border-red-600"
            } w-[296px]  [2px] my-1 focus-within:bg-white p-2 flex border-2  bg-gray-100 items-center`}
          >
            <span>&#128100;</span>
            <input
              type="text"
              className=" rounded bg-gray-100 mx-2 w-[160px] h-[36px] text-sm focus:outline-none focus:bg-white text-black "
              placeholder="Create username"
              name="username"
              id="userName"
              title="Enter a username for your Profile"
              autoComplete="off"
              required
              onBlurCapture={(e) => {
                handleCheckingUser(e);
              }}
            />
          </div>
          {isusernameValid ? (
            <p></p>
          ) : (
            <p className="text-red-500 italic">
              Please choose a different username
            </p>
          )}
        </label>

        <label htmlFor="password" className="h-[108px]">
          Password
          <div
            className={`rounded relative w-[296px] ${
              isPasswordError ? "border-red-600 " : "border-white"
            } focus-within:bg-white my-1 p-2 flex bg-gray-100 items-center`}
          >
            <span>&#128273;</span>
            <input
              type={isPassVisible ? "text" : "password"}
              className=" rounded bg-gray-100 mx-2 h-[36px] text-sm focus:outline-none focus:bg-white text-black  "
              placeholder="Password"
              name="password"
              id="password"
              title="Password must contain atleast one Smallcase Letter, one Capitalcase Letter, one unique Symbol, one Number"
              autoComplete="off"
              required
              onChange={(e) => handlePasswordValidation(e)}
            />
            <span
              className="cursor-pointer text-teal-600 "
              onClick={() => setPassVisible(!isPassVisible)}
            >
              {isPassVisible ? "HIDE" : "SHOW"}
            </span>
          </div>
          <p className="text-red-600 italic text-[14px]">{isPasswordError}</p>
        </label>
        <label htmlFor="cnfPassword" className="h-[108px]">
          Confirm Password
          <div className="rounded relative w-[296px] focus-within:bg-white my-1 p-2 flex bg-gray-100 items-center">
            <span>&#128273;</span>
            <input
              onChange={(e) => handleChangeCnfPass(e)}
              onBlur={(e) => handleCnfPassValidation(e)}
              type={isCnfPassVisible ? "text" : "password"}
              className=" rounded bg-gray-100 mx-2 h-[36px] text-sm focus:outline-none focus:bg-white text-black  "
              placeholder="Password"
              name="cnfPassword"
              id="cnfPassword"
              autoComplete="off"
              title="Password and Confirm Password must be the same."
              required
            />
            <span
              className="cursor-pointer text-teal-600 "
              onClick={() => setCnfPassVisible(!isCnfPassVisible)}
            >
              {isCnfPassVisible ? "HIDE" : "SHOW"}
            </span>
          </div>
          <p className="text-red-600 italic text-[14px]">{isCnfPassErr}</p>
        </label>
        <input
          type="submit"
          value={"Sign Up"}
          className=" w-[160px] h-[48px] my-1 rounded bg-teal-600 hover:bg-teal-500 cursor-pointer font-bold"
        />
      </form>
      <div>
        Have an account?
        <button
          className="text-blue-500 ml-2"
          onClick={() => setAlreadyUser(!isAlreadyUser)}
        >
          Login
        </button>
      </div>
    </div>
  );
};
