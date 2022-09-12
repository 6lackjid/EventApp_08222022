import React, { createContext, useContext, useEffect, useRef, useState } from "react";

import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Anchor,
  Stack,
} from "@mantine/core";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterProps } from "../types/RegisterFormProps";
import axios from "axios";
import { IconCircuitSwitchClosed } from "@tabler/icons";
import App from "../App";
import Cookies from "universal-cookie";
import { useCookies, withCookies } from "react-cookie";
import { setServers } from "dns";
import { HeaderTabsColored } from "./Header";
import { HeaderTabsProps } from "../types/HeaderProps";
import { AuthContext } from "./Auth";


// const { isLogined, login } = useContext(AuthContext);
export const Login = (props: PaperProps) => {
  const [type, toggle] = useToggle(["ログイン", "登録"]);
  const schema = Yup.object().shape({
    username: Yup.string().required("ユーザ名は必須です。"),
    email: Yup.string()
      .email("不正なメールアドレスです")
      .required("メールアドレスは必須です"),
    password: Yup.string()
      .required("passwordは必須です。")
      .min(8, "最低8文字入力してください")
      .matches(/[a-z]+/, "半角全角英数字を含む必要があります")
      .matches(/[A-Z]+/, "半角全角英数字を含む必要があります")
      .matches(/[0-9]+/, "半角全角英数字を含む必要があります"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], "passwordが一致しません。")
      .required("password(確認用)は必須です。"),
  });
  // const { isLogined, login } = useContext(AuthContext);
  const urlRegisterAccount = "http://127.0.0.1:8000/api/account/register/";
  const urlLoginAccount = "http://127.0.0.1:8000/api/account/token/create/";
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, SetPasswordConfirm] = useState("");
  const [modal, setModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [cookies, setCookie] = useCookies();
  // const cookies = new Cookies();
  const [HeaderProps, setHeaderProps] = useState<HeaderTabsProps[]>([]);
  // const [isLogined, setIsLogined] = useState(false);
  const [err, setErr] = useState("");
  const {isLogined, setIsLogined, login,setopenedLogin} = useContext(AuthContext);
  // 
  const [data, setData] = useState<RegisterProps>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const form = useForm<RegisterProps>({
    
    initialValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },

    
  });

  const setFieldValue = (e: any) => {
    setUserName(e.target.value);
    setEmail(e.target.value);
    setPassword(e.target.value);
    SetPasswordConfirm(e.target.value);
  };

  const AccountRegisteration = async (e: any) => {
    e.preventDefault();
    await axios
      .post(
        urlRegisterAccount,
        {
          username: form.values.username,
          email: form.values.email,
          password: form.values.password,
          passwordConfirm: form.values.passwordConfirm,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setData(res.data);
        console.log("successfully created account!");
        console.log(res.data);
        alert("アカウントの作成に成功しました！");
        login();
      })
      .catch((err) => console.log(err));
  };

  const AccountLogin = async (e: any) => {
    e.preventDefault();
    await axios
      .post(
        urlLoginAccount,
        {
          email: form.values.email,
          password: form.values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        
        setData(res.data);
        console.log("successfully Logged in!");
        console.log(res.data);
        login();
        
        
        setCookie(
          "accesstoken",
          res.data.access,
          { path: "/login" }
          // { httpOnly: true }
        );
        setCookie(
          "refreshtoken",
          res.data.refresh,
          { path: "/login" }
          // { httpOnly: true }
        );
        alert("ログイン成功しました！")
        
      })
      .catch((err: any) => {
        if (!err?.res) {
          console.log("ログインしてください");
          setErr("no server response");
        } else if (err.res?.status === 400) {
          setErr("emailかpasswordが正しくありません");
          console.log(err);
        } else if (err.res?.status === 401) {
          setErr("認証に失敗しました");
        } else {
          setErr("ログインに失敗しました");
        }
      });
  };
  
  

  return (
    <Paper radius="md" p="sm" withBorder {...props}>
      <Text size="lg" weight={300}></Text>
      
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack>
          {type === "登録" && (
            <TextInput
              label="ユーザ名"
              placeholder="username"
              value={form.values.username}
              onChange={(event) =>
                form.setFieldValue("username", event.currentTarget.value)
              }
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="**********@mail.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "不正なメールアドレスです"}
          />

          <PasswordInput
            required
            label="パスワード"
            placeholder="パスワード"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password && "8文字以上入力してください"}
          />
          {type === "登録" && (
            <PasswordInput
              required
              label="パスワード(確認用)"
              placeholder="パスワード(確認用)"
              value={form.values.passwordConfirm}
              onChange={(event) =>
                form.setFieldValue("passwordConfirm", event.currentTarget.value)
              }
              error={form.errors.passwordConfirm && "8文字以上入力してください"}
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "登録"
              ? "アカウントをお持ちの方はこちら ログイン"
              : "新規会員登録はこちら 新規会員登録"}
          </Anchor>

          
            {type === "登録" ? (
              <Button type="submit" onClick={AccountRegisteration}>
                {upperFirst(type)}
              </Button>
            ) : (
              <Button type="submit" onClick={AccountLogin}>
                {upperFirst(type)}
              </Button>
            )}
            
        </Group>
      </form>
    </Paper>
  );
};



