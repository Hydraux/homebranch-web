import type { BookModel } from "@/entities/book/model/BookModel";
import AddBookButton from "@/entities/book/ui/AddBookButton";
import {
  Box,
  Button,
  Card,
  FileUpload,
  Flex,
  For,
  Heading,
  Separator,
  Tabs,
} from "@chakra-ui/react";
import Epub from "epubjs";
import { HiPlus, HiUpload } from "react-icons/hi";
import { LuBookOpen } from "react-icons/lu";
import { Link, useLocation } from "react-router";

export function NavigationCard() {
  const location = useLocation();
  const links = [
    { to: "/", label: "Library" },
    { to: "/currently-reading", label: "Currently Reading" },
    { to: "/favorites", label: "Favorites" },
    { to: "/statistics", label: "Statistics" },
  ];
  return (
    <Card.Root
      borderRadius="md"
      borderWidth="1px"
      p={4}
      mr={4}
      boxShadow="md"
      position={"fixed"}
      top={4}
      left={4}
      float={"left"}
      height="calc(95vh)"
      width="250px"
    >
      <Flex align={"center"} justify={"center"} gap={2}>
        <LuBookOpen size={36} />
        <Heading>HomeBranch</Heading>
      </Flex>
      <Separator my={4} />
      <Tabs.Root
        orientation="vertical"
        variant={"subtle"}
        value={location.pathname}
      >
        <Tabs.List width={"100%"}>
          <For each={links}>
            {(link) => (
              <Tabs.Trigger value={link.to} asChild>
                <Link to={link.to}>{link.label}</Link>
              </Tabs.Trigger>
            )}
          </For>
          <Tabs.Trigger value={"create-book"} asChild>
            <AddBookButton />
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <Separator my={4} />
      <Tabs.Root
        orientation="vertical"
        variant={"subtle"}
        value={location.pathname}
      >
        <Tabs.List width={"100%"}>
          <Tabs.Trigger value={"settings"} asChild>
            <Link to={"/settings"}>Settings</Link>
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </Card.Root>
  );
}
