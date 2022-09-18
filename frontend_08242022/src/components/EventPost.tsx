import {
  IconCalendarEvent,
  IconMailOpened,
  IconPhone,
  IconPhoto,
  IconPictureInPicture,
  IconPictureInPictureTop,
  IconPlus,
  IconUpload,
} from "@tabler/icons";
import React from "react";
import { useState, useContext } from "react";
import {
  Modal,
  Button,
  Group,
  FileInput,
  NumberInput,
  TextInput,
  Paper,
  Text,
  Textarea,
  Input,
} from "@mantine/core";
import { AuthContext } from "./Auth";
import axios from "axios";
import { EventProps } from "../types/EventsProps";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";

const EventPost = () => {
  const [opened, setOpened] = useState(false);
  const { isLogined, login } = useContext(AuthContext);
  const eventposturl = "http://localhost:8000/api/events/post-event/";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [dateTime, setDateTime] = useState("");
  const [EventImage1, setEventImage1] = useState<File>();
  const [EventImage2, setEventImage2] = useState<File >();
  const [EventImage3, setEventImage3] = useState<File >();
  const [loading, setLoading] = useState(false);

  const [cookies, setCookie] = useCookies();
  const [postedEvent, setPostedEvent] = useState<EventProps>();

  const handleForm = (e: any) => {
    setTitle(e.target.value);
    setDescription(e.target.value);
    setCapacity(e.target.value);
    setLocation(e.target.value);
    setDateTime(e.target.value);
    setEventImage1(e.target.files[0]);
    setEventImage2(e.target.files[0]);
    setEventImage3(e.target.files[0]);
  };
  const handleSubmit = (event:any) => {
    console.log("イベント発火")
    event.preventDefault()
  }
  const createNewEvent = (event: EventProps) => {
    ;

    const FormImageData = new FormData()
    FormImageData.append('title', title)
    FormImageData.append('description', description)
    FormImageData.append('dateTime', dateTime)
    FormImageData.append('location', location)
    // FormImageData.append('0', capacity)
    // FormImageData.append('EventImage1',EventImage1 )
    // FormImageData.append('EventImage2',EventImage2 )
    // FormImageData.append('EventImage3',EventImage3 )
    axios
      .post(eventposturl, {
        title: title,
        description: description,
        location: location,
        capacity: capacity,
        dateTime: dateTime,
        EventImage1: EventImage1,
        EventImage2: EventImage2,
        EventImage3: EventImage3,
        'content-type': 'multipart/form-data',
      })
      .then((res) => {
        // setPostedEvent<EventProps>([...postedEvent, res.data]);
        console.log(res.data);
        setCookie(
          "accesstoken",
          res.data.access,
          { path: "/" }
          // { httpOnly: true }
        );
        setCookie(
          "refreshtoken",
          res.data.refresh,
          { path: "/" }
          // { httpOnly: true }
        );
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      }) 
  };

  return (
    <>
      <Modal size="xl" opened={opened} onClose={() => setOpened(false)}>
        {isLogined ? (
        
        <form >
          {/* onSubmit={handleSubmit} */}
          <TextInput
            label="タイトル"
            placeholder="例)東京タワーツアー"
            withAsterisk
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            label="イベントの概要"
            placeholder="例)東京タワー周辺を散策します"
            value={description}
            autosize
            withAsterisk
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextInput
            label="イベントの開催場所"
            placeholder="例)東京都"
            value={location}
            withAsterisk
            onChange={(e) => setLocation(e.target.value)}
          />

          <NumberInput label="定員" min={0} value={capacity} />
          <TextInput
            type="datetime-local"
            label="イベントの開催日時"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
          {/* <FileInput label="イベントのイメージ画像1"  accept="image/png/jpeg"  icon={<IconUpload size={14} />} value={EventImage1}  onChange={(e) => setEventImage1(e.target.files)} /> */}
          {/* <FileInput label="イベントのイメージ画像2"  accept="image/png/jpeg"  icon={<IconUpload size={14} />} value={EventImage2}  onChange={(e) => setEventImage2(e.target.files)} /> */}
          {/* <FileInput label="イベントのイメージ画像3"  accept="image/png/jpeg"  icon={<IconUpload size={14} />} value={EventImage3}  onChange={(e) => setEventImage3(e.target.files)} /> */}

          <Group position="right" mt="md">
            <Button type="submit" >
            {/* onClick={createNewEvent} */}
              イベント作成
            </Button>
          </Group>
        </form>): (null)}
      </Modal>

      {/* ボタン部分 */}
      <Group position="center">
        <Button onClick={() => setOpened(true)}>
          <IconPhoto />
        </Button>
      </Group>
    </>
  );
};

export default EventPost;

<IconPhoto />;
