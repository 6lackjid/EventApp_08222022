import React, { useState, useEffect, Fragment } from "react";
import "../App.css";
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
  Container,
} from "@mantine/core";
import { EventProps } from "../types/EventsProps";
import { Grid } from "@mantine/core";
import axios from "axios";
import { ThemeContext } from "@emotion/react";
import eventImage from "../Images/Events/eventImage.jpg";
import { display } from "@mui/system";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,

    // width: 902,
    
    
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  
  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

// {EventImage1, EventImage2, EventImage3, event_id, location, description, capacity, title, host,dateTime}:
const EventsCard: React.FC<EventProps> = (props: EventProps) => {
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);

  return (
    
    <Grid className="grid-cards" >
      <Grid.Col  key={props.event_id} className="grid-col" >
        <Card withBorder radius="md" p="md" className={classes.card}>
          <Card.Section className="images">
            <Image
              className="image"
              src={props.EventImage1}
              alt={props.title}
              height={300}
              width={260}
              withPlaceholder
            />
            <Image
              className="image"
              src={props.EventImage2}
              alt={props.title}
              height={300}
              width={260}
              withPlaceholder
              
            />
            <Image
              className="image"
              src={props.EventImage3}
              alt={props.title}
              height={300}
              width={260}
              withPlaceholder
            />
          </Card.Section>

          <Card.Section className={classes.section} mt="md">
            <Group position="apart">
              <Text size="lg" weight={800}>
                {props.title}
                <br />
                {props.dateTime}
              </Text>
              <Badge size="xl">{props.location}</Badge>
            </Group>
            <Text size="lg" weight={500}>
              定員:{props.capacity}名
            </Text>
            <Text size="sm" mt="xs">
              {props.description}
            </Text>
          </Card.Section>

          <Card.Section className={classes.section}>
            <Text mt="md" className={classes.label} color="dimmed">
              host
            </Text>

            <Text size="sm">{props.host}</Text>
          </Card.Section>

          <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          参加
        </Button>
        
      </Group>
        </Card>
      </Grid.Col>
      
      
      
    </Grid>
    
  );
};

export default EventsCard;
