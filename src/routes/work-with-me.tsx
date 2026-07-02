import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/work-with-me")({
  beforeLoad: () => {
    throw redirect({ to: "/programmes", hash: "book" });
  },
});
