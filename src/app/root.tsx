import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { Provider } from "@/components/ui/provider";
import { NavigationCard } from "@/components/navigation/NavigationCard";
import {
  Box,
  Card,
  Drawer,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import { config } from "@/shared";
import { GiHamburgerMenu } from "react-icons/gi";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  console.log(config);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <Provider>
        <Toaster />
        <body>
          <Box
            visibility={{ base: "visible", md: "hidden" }}
          >
            <Drawer.Root placement={"start"}>
              <Drawer.Content h={0}>
                <NavigationCard />
              </Drawer.Content>
              <Drawer.Trigger w={"100%"} display={"flex"} justifyContent={"center"}>
                <Card.Root w={"90%"} mt={4} p={2} px={4}>
                  <HStack align={"center"} justify={"space-between"}>
                  <GiHamburgerMenu size={24} />
                  <Heading as={"h3"} textAlign={"center"}>HomeBranch</Heading>
                  <GiHamburgerMenu size={24} visibility={"hidden"}/>
                  </HStack>
                </Card.Root>
              </Drawer.Trigger>
            </Drawer.Root>
          </Box>

          <Box p={4} h={"100vh"} display={"relative"}>
            <Box visibility={{ base: "hidden", md: "visible" }}>
              <NavigationCard />
            </Box>
            <Box p={4} pt={0} ml={{ base: 0, md: "250px" }}>
              {children}
            </Box>
            <ScrollRestoration />
            <Scripts />
          </Box>
        </body>
      </Provider>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
