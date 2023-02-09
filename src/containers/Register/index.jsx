import React from "react";
import RegisterView from "../../components/RegisterView";
import { useRootContext } from "../../context/Root";

export default function Register() {
  const {
    doLogin,
    state: { isLoading, error },
  } = useRootContext();

  return <RegisterView  />;
}
