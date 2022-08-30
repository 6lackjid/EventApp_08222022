import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HeaderTabsColored } from "./Header";
import profileImage from "../Images/Profiles/profileImage.jpg";
import { HeaderTabsProps } from "../types/HeaderProps";
import eventImage from "../Images/Events/eventImage.jpg";
import { EventProps } from "../types/EventsProps";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  Modal,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

const EventDetail = ({
  EventImage,
  title,
  description,
  location,
  dateTime,
  capacity,
  hostname,
}: EventProps) => {
  // const HeaderProps: HeaderTabsProps = {
  //   name: "Yoshifumi Matsumoto",
  //   ProfileImage: profileImage,
  // };
  const EventsProps: EventProps = {
    EventImage: eventImage,
    title: "花火大会",
    location: "大阪城公園",
    dateTime: "8/30(土) 12:00",
    description: "花火大会を開催します。",
    capacity: 20,
    hostname: "",
  };
  const eventContent = {};

  const { id } = useParams();
  const [post, setPosts] = useState([]);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    axios.get(`${id}`).then((res) => {
      setPosts(res.data);
    });
  }, []);

  const { classes, theme } = useStyles();

  return (
    <div>
      {/* <HeaderTabsColored {...HeaderProps} /> */}
      <Modal opened={opened} size="70%" onClose={() => setOpened(false)}>
        
        <h1>イベント詳細 {id}</h1>
        <Card withBorder radius="md" p="md" className={classes.card}>
          <Card.Section>
            <Image src={EventImage} alt={title} height={300} />
          </Card.Section>

          <Card.Section className={classes.section} mt="md">
            <Group position="apart">
              <Text size="lg" weight={500}>
                {title}
              </Text>
              <Badge size="xl">{location}</Badge>
            </Group>
            <Text size="xl" mt="xs">
              {description}
            </Text>
          </Card.Section>

          <Card.Section className={classes.section}>
            <Text mt="md" className={classes.label} color="dimmed"></Text>
            <Group spacing={7} mt={5}>
              {hostname}
            </Group>
          </Card.Section>
        </Card>
      </Modal>
      <Button onClick={() => setOpened(true)}>一覧画面の詳細ボタンに結びつけてね</Button>
    </div>
  );
};

export default EventDetail;
