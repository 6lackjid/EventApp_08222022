import React from "react";
import RegisterModal from "./components/RegisterModal";
import { HeaderTabsColored } from "./components/Header";
import "./App.css";
import { HeaderTabsProps } from "./types/HeaderProps";
import profileImage from "./Images/Profiles/profileImage.jpg";
import { MantineProvider, Center, Group, AspectRatio } from "@mantine/core";
import { Page } from "./components/Pagination";
import { BadgeCard } from "./components/Events";
import { EventProps } from "./types/EventsProps";
import eventImage from "./Images/Events/eventImage.jpg";
import Logo from "./components/Logo";
import { DirectionControl } from "@mantine/ds";
import { SearchBar } from "./components/SearchBar";
import { display } from "@mui/system";

const HeaderProps: HeaderTabsProps = {
  name: "Yoshifumi Matsumoto",
  ProfileImage: profileImage,
};

const EventsProps: EventProps = {
  EventImage: eventImage,
  title: "花火大会",
  location: "大阪城公園",
  dateTime: "8/30(土) 12:00",
  description: "花火大会を開催します。",
  capacity: 20,
  hostname: "",
  // badges: {
  //   emoji: "";
  //   label: "";
  // }[],
};

function App() {
  return (
    <>
      <div className="wholeheader">
        <MantineProvider
          inherit
          theme={{ defaultGradient: { from: "blue", to: "teal", deg: 20 },
        
       }}
        >
          <Group position="apart" grow>
            <Center
              sx={(theme) => ({
                height: 170,

                backgroundImage: theme.fn.gradient(),
                color: theme.white,
              })}
            >
              {/* <Group position="left"> */}

              <Logo />

              {/* </Group> */}

              <div className="header">
                <HeaderTabsColored {...HeaderProps} />
              </div>
              <div className="searchbar">
                <SearchBar />
              </div>
            </Center>
          </Group>
        </MantineProvider>
      </div>
      <BadgeCard {...EventsProps} />
      <br />
      <br />
      <Page />
      <br />
    </>
  );
}

export default App;
