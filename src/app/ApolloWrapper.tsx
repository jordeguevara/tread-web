"use client";
// ^ this file needs the "use client" pragma

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

export function getOrCreateDeviceID(): string {
  if (typeof window === "undefined") {
    return "server-placeholder-device-id";
  }
  const key = "deviceID";
  let deviceID = localStorage.getItem(key);

  if (!deviceID) {
    deviceID = uuidv4();
    localStorage.setItem(key, deviceID);
  }

  return deviceID;
}

// have a function to create a client for you
function makeClient(deviceID: string) {
  console.log("Device ID:", deviceID);
  const httpLink = new HttpLink({
    headers: {
      "X-Device-ID": deviceID,
    },
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri:
      process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "http://localhost:7777/query",
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: {
      // you can pass additional options that should be passed to `fetch` here,
      // e.g. Next.js-related `fetch` options regarding caching and revalidation
      // see https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
    },
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { ... }}});
  });

  // use the `ApolloClient` from "@apollo/client-integration-nextjs"
  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/client-integration-nextjs"
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const [deviceID, setDeviceID] = useState<string>("");

  useEffect(() => {
    const id = getOrCreateDeviceID();
    setDeviceID(id);
  }, []);

  if (!deviceID) {
    return <p>Loading...</p>;
  }
  return (
    <ApolloNextAppProvider makeClient={() => makeClient(deviceID)}>
      {children}
    </ApolloNextAppProvider>
  );
}
