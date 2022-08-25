import { useState } from "react";
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
  IconHistory,
  IconAlien,
  IconBook,
  IconFreeRights,
} from "@tabler/icons";
import { MantineLogo } from "@mantine/ds";
import { HeaderTabsProps } from "../types/HeaderProps";
// import Logo from "./Logo";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBar } from "./SearchBar";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderBottom: `1px solid ${
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background
    }`,
    marginBottom: 120,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,

  },

  user: {
    color: theme.white,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1
      ),
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background,
      0.1
    ),
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: 38,
    color: theme.white,
    backgroundColor: "transparent",
    borderColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1
      ),
    },

    "&[data-active]": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1
      ),
      borderColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
    },
  },
}));

export const HeaderTabsColored: React.FC<HeaderTabsProps> = ({
  name,
  ProfileImage,
}) => {
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <><div className="accountInfo">
      <Group position="right">
        <Container className={classes.mainSection}>
          

          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            color={theme.white}
          />

          <Menu
            width={400}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={30}>
                  <Avatar src={ProfileImage} alt={name} radius="xl" size={60} />
                  <Text
                    weight={800}
                    size="sm"
                    sx={{ lineHeight: 1, color: theme.white }}
                    mr={7}
                  >
                    {name}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>イベント</Menu.Label>
              <Menu.Item
                icon={
                  <IconHeart
                    size={40}
                    stroke={1.5}
                    color={theme.colors.red[6]}
                  />
                }
              >
                お気に入りイベント
              </Menu.Item>
              <Menu.Item
                icon={
                  <IconStar
                    size={40}
                    stroke={1.5}
                    color={theme.colors.yellow[6]}
                  />
                }
              >
                マイイベント
              </Menu.Item>
              <Menu.Item
                icon={
                  <IconHistory
                    size={40}
                    stroke={1.5}
                    color={theme.colors.red[6]}
                  />
                }
              >
                参加履歴
              </Menu.Item>

              <Menu.Label>アカウント</Menu.Label>
              <Menu.Item icon={<IconAlien size={40} stroke={1.5} />}>
                プロフィール
              </Menu.Item>
              <Menu.Item icon={<IconLogout size={40} stroke={1.5} />}>
                ログアウト
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>設定</Menu.Label>
              <Menu.Item icon={<IconSettings size={40} stroke={1.5} />}>
                設定
              </Menu.Item>

              <Menu.Item
                color="red"
                icon={<IconTrash size={40} stroke={1.5} />}
              >
                アカウント削除
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Container>
      </Group>

      {/* <Container> */}
      {/* <Tabs
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
        ></Tabs> */}
      {/* </Container> */}
      </div>
    </>
  );
};
