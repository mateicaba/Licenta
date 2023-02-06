import React from "react";
import LoginView from "../../components/LoginView";
import { useRootContext } from "../../context/Root";

export default function Login() {
  const {
    doLogin,
    state: { isLoading, error },
  } = useRootContext();

  return <LoginView onFinish={doLogin} isLoading={isLoading} error={error} />;
}
