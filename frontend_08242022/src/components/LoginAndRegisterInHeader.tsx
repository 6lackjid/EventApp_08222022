import React, { useContext, useEffect, useState } from "react";
import { Group, Button, Modal } from "@mantine/core";
import "../App.css";

// import Register from "./Register";
import { RegisterProps } from "../types/RegisterFormProps";
// import { RegisterContent } from "./RegisterContent";
import { Login } from "./Login";
import { HeaderTabsColored } from "./Header";
import { AuthContext } from "./Auth";
// import { HeaderTabsColored } from "./Header";
// import axios from "axios";
// import { HeaderTabsProps } from "../types/HeaderProps";

const LoginAndRegisterInHeader = () => {
  const [openedLogin, setopenedLogin] = useState(false);
  const { isLogined, login } = useContext(AuthContext);

  return (
    <Group position="center" spacing="sm">
      <Group position="center" spacing="sm">
        <Modal opened={openedLogin} onClose={() => setopenedLogin(false)}>
          <Login />
        </Modal>
      </Group>
    {isLogined ? (
      <HeaderTabsColored username="" ProfileImage="" />
      ):(
      <Button
        variant="outline"
        className="login"
        onClick={() => setopenedLogin(true)}
      >
        ログイ
      </Button>)}
    </Group>
  );
};

export default LoginAndRegisterInHeader;
