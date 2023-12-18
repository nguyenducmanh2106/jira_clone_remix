import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { User } from "@domain/user";
import { getUserSession } from "@app/session-storage/user-storage.server";
import { getUser } from "@infrastructure/db/user";
import { MainLayout } from "@app/ui/main";
import { Error404 } from "@app/components/error-404";

type LoaderData = {
  user: User;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userSession = await getUserSession(request);
  const userId = userSession.getUser();

  if (!userId) {
    return redirect("/login");
  }

  const user = await getUser(userId);

  if (!user) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json<LoaderData>({
    user: user,
  });
};

export default function AppRoute() {
  const { user } = useLoaderData() as LoaderData;
  return <MainLayout user={user} />;
}

export function CatchBoundary() {
  return (
    <div>
      <Error404
        message="It seems that you have lost! Go to the main page"
        href="/"
      />
    </div>
  );
}