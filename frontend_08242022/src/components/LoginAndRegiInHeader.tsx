import React from "react";
import { Group, Button } from "@mantine/core";
import "../App.css";


const LoginAndRegiInHeader = () => {
  return (
    <>
      <Group position="center" spacing="sm">
        <Button variant="outline" className="loginRegi1">ログイン</Button>
        <Button variant="outline" className="loginRegi2">新規会員登録</Button>
      </Group>
    </>
  );
};

export default LoginAndRegiInHeader;
