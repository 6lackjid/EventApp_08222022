import React, { useContext, useEffect, useState } from "react";
import { Group, Button, Modal } from "@mantine/core";
import "../App.css";

// import Register from "./Register";
import { RegisterProps } from "../types/RegisterFormProps";
// import { RegisterContent } from "./RegisterContent";
import { Login } from "./Login";
import { HeaderTabsColored } from "./Header";
import { AuthContext } from "./Auth";
import axios from "axios";
import { HeaderTabsProps } from "../types/HeaderProps";
// import { HeaderTabsColored } from "./Header";
// import axios from "axios";
// import { HeaderTabsProps } from "../types/HeaderProps";

const LoginAndRegisterInHeader = () => {
  const [openedLogin, setopenedLogin] = useState(false);
  const { isLogined, login } = useContext(AuthContext);
  const loginedInfoUrl = "http://127.0.0.1:8000/api/account/mypage/";
  const [HeaderTabsProps, setHeaderTabsPropsderProps] = useState<HeaderTabsProps>();
  useEffect(() => {
    const GetMypageInfo = async (e: any) => {
      e.preventDefault();
      await axios
        .get<HeaderTabsProps>(
          loginedInfoUrl,
          
          {
            headers: {
              "Content-Type": "application/json",
              // 'Authorization' : `JWT ${}`
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setHeaderTabsPropsderProps(res.data);
          // setIsLogined(true);
          
          // useCookies(
          //   "accesstoken",
          //   res.data.access,
          //   { path: "/login" }
            // { httpOnly: true }
          // );
          // useCookies(
          //   "refreshtoken",
          //   res.data.refresh,
          //   { path: "/login" }
            // { httpOnly: true }
          // );
        })
        .catch((err: any) => {console.log(err.data)});
    };
    // 
  },[]);


  return (
    <>
    {/* <Group position="center" spacing="sm"> */}
      <Group position="center" spacing="sm">
        <Modal opened={openedLogin} onClose={() => setopenedLogin(false)}>
          <Login />
        </Modal>
        </Group>
    {isLogined ? (
      // {HeaderTabsProps.map((HeaderTabsProp: HeaderTabsProps) => (
      <HeaderTabsColored username="" ProfileImage="" />
      // ))} 
      ):(
      <Button
        variant="outline"
        className="login-button"
        onClick={() => setopenedLogin(true)}
      >
        ログイン
      </Button>
      )}
      
    {/* </Group> */}
    </>
  );
};

export default LoginAndRegisterInHeader;
