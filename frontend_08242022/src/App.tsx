import React from "react";
import RegisterModal from "./components/RegisterModal";
import { HeaderTabsColored } from "./components/Header";
import "./App.css";
import { HeaderTabsProps } from "./types/HeaderProps";
import profileImage from "./Images/Profiles/profileImage.jpg";
import { MantineProvider, Center, Group } from "@mantine/core";
import { Page } from "./components/Pagination";
import { BadgeCard } from "./components/Events";
import { EventProps } from "./types/EventsProps";
import eventImage from "./Images/Events/eventImage.jpg";
import Logo from "./components/Logo";
import { spacing } from "@mui/system";
import { sizes } from "@mantine/core/lib/ActionIcon/ActionIcon.styles";

const HeaderProps: HeaderTabsProps = {
  name: "Yoshifumi Matsumoto",
  ProfileImage: profileImage,
};

const EventsProps: EventProps = {
  EventImage: eventImage,
  title: "花火大会",
  location: "大阪城公園",
  dateTime: "8月30日",
  description: "花火大会を開催します。",
  capacity: 20,
  // badges: {
  //   emoji: "";
  //   label: "";
  // }[],
};

function App() {
  return (
    <div>
      <MantineProvider
        inherit
        theme={{ defaultGradient: { from: "blue", to: "teal", deg: 20 } }}
      >
        <Center
          sx={(theme) => ({
            height: 170,
            backgroundImage: theme.fn.gradient(),
            color: theme.white,
          })}
        >
          <div
            
          >
            <Logo />
          </div>

          <div className="header">
            <HeaderTabsColored {...HeaderProps} />
          </div>
        </Center>
      </MantineProvider>
      <BadgeCard {...EventsProps} />
      <br />
      <br />
      <Page />
      <br />
    </div>
  );
}


export default App;
