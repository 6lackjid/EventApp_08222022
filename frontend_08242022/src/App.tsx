import React, { createContext, Fragment, useEffect, useState } from "react";
// import RegisterModal from "./components/Register";
import { HeaderTabsColored } from "./components/Header";
import "./App.css";
import { HeaderTabsProps } from "./types/HeaderProps";
import profileImage from "./Images/Profiles/profileImage.jpg";
import {
  MantineProvider,
  Center,
  Group,
  AspectRatio,
  Loader,
  Button,
} from "@mantine/core";
import { Page } from "./components/Pagination";

import eventImage from "./Images/Events/eventImage.jpg";
import Logo from "./components/Logo";
import { DirectionControl } from "@mantine/ds";
import { SearchBar } from "./components/SearchBar";
import { display } from "@mui/system";
// import { LoginForm } from "./components/LoginModal";
import { RegisterProps } from "./types/RegisterFormProps";

import LoginAndRegiInHeader from "./components/LoginAndRegisterInHeader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { indigo } from "@mui/material/colors";
import EventsCard from "./components/Events";
import { EventProps } from "./types/EventsProps";
import { IconMessage } from "@tabler/icons";
import PostAddTwoToneIcon from "@mui/icons-material/PostAddTwoTone";
import EventPost from "./components/EventPost";
import AuthContextProvider, { AuthContext} from './components/Auth';


const HeaderProps: HeaderTabsProps = {
  username: "",
  ProfileImage: "",
};

const RegisterationProps: RegisterProps = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<EventProps[]>([]);
  const [isLogined, setIsLogined] = useState(false);

  const url = "http://localhost:8000/api/events/lists/";

  useEffect(() => {
    const getEventsData = async () => {
      try {
        const res = await axios.get<EventProps[]>(url).then((res: any) => {
          setResults(res.data.results);

          console.log(res);
          console.log(res.data);
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getEventsData();
  }, []);

  return (
    <>
    <AuthContextProvider 
      >
      <div className="wholeheader">
        <MantineProvider
          inherit
          theme={{ defaultGradient: { from: "blue", to: "teal", deg: 20 } }}
        >
          <Group position="apart" grow>
            <Center
              sx={(theme) => ({
                height: 170,

                backgroundImage: theme.fn.gradient(),
                color: theme.white,
              })}
            >
              <Logo />
              <EventPost />
              <div className="header">
                
                <LoginAndRegiInHeader />
                
              </div>
              <div className="searchbar">
                
                <SearchBar />
              </div>
            </Center>
          </Group>
        </MantineProvider>
      </div>
      <div className="body">
        {loading ? (
          <Loader variant="bars" />
        ) : (
          Object.values(results).map((result: EventProps) => (
            <EventsCard
              key={result.event_id}
              event_id={result.event_id}
              title={result.title}
              description={result.description}
              dateTime={result.dateTime}
              capacity={result.capacity}
              EventImage1={result.EventImage1}
              EventImage2={result.EventImage2}
              EventImage3={result.EventImage3}
              location={result.location}
              host={result.host}
            />
          ))
        )}
      </div>
      <br />
      <br />
      <Page />
      <br />

      <br />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      </AuthContextProvider>
    </>
  );
};

export default App;
