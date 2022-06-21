import React, { useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  // console.log()
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@"),    valuePass: state.valuePass,
    isValidPass: state.isValidPass  };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@"), valuePass: state.valuePass,
    isValidPass: state.isValidPass   };
  }
  if (action.type === "USER_PASSWORD") {
    return {value:state.value,isValid: state.isValid, valuePass: action.val, isValidPass: state.value.trim().length > 6   };
  }
  if (action.type === "PASSWORD_BLUR") {
    console.log(action, "work")
    return {value:state.value,isValid: state.isValid, valuePass: state.valuePass, isValidPass: state.value.trim().length > 6  };
  }

  return {
    value: "",
    isValid: null,
    valuePass: "",
    isValidPass: null,
  }
};

const passwordReducer = (state, action) => {
  console.log(action.type)
  if (action.type === "USER_PASSWORD") {
    return { value: action.val, isValid: true };
  }
  if (action.type === "PASSWORD_BLUR") {
    console.log(action, "work")
    return { value: state.value, isValid: state.value.trim().length > 6  };
  }

  return {
    valuePass: "",
    isValidPass: null,
  };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
    valuePass: "",
    isValidPass: null,
  });
  // const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
  //   value: "hello",
  //   isValid: null,
  // });

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") && emailState.valuePass.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchEmail({ type: "USER_PASSWORD", val: event.target.value });
    // setEnteredPassword(event.target.value);
    console.log(event.target.value);

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR"});

    // setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    console.log('work')
    dispatchEmail({ type: "PASSWORD_BLUR"});
    // setPasswordIsValid(passwordState.value.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    props.onLogin(emailState.value, emailState.valuePass);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            emailState.isValidPass === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={emailState.valuePass}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
