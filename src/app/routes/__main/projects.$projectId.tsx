import type { LoaderFunction, MetaFunction, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ProjectSummary, ProjectId } from "@domain/project";
import { getProjectSummary } from "@infrastructure/db/project";
import { Error404 } from "@app/components/error-404";
import { Error500 } from "@app/components/error-500";
import { ProjectView } from "@app/ui/main/project";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  const { projectSummary } = data as LoaderData;
  const title = `Project - ${projectSummary.name || "Project"}`;
  const description =
    "See all your projects in one place. Create new ones and assigne team members.";
  const image = "https://jira-clone.fly.dev/static/images/readme/project.png";
  const url = `https://jira-clone.fly.dev/projects/${projectSummary.id}`;

  // return {
  //   charset: "utf-8",
  //   viewport: "width=device-width,initial-scale=1",
  //   title: title,
  //   description: description,
  //   "og:url": url,
  //   "og:type": "website",
  //   "og:site_name": title,
  //   "og:title": title,
  //   "og:description": description,
  //   "og:image": image,
  //   "twitter:card": "summary_large_image",
  //   "twitter:site": url,
  //   "twitter:domain": "jira-clone.fly.dev",
  //   "twitter:title": title,
  //   "twitter:description": description,
  //   "twitter:image": image,
  //   "twitter:image:width": "1457",
  //   "twitter:image:height": "872",
  //   "twitter:image:alt": title,
  //   "twitter:creator": "@Jack_DanielSG",
  //   "twitter:creator:id": "Jack_DanielSG",
  // };
  return [
    {
      charset: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1",
    },
    { title: title },
    {
      name: "description",
      content: description,
    },
    { property: "og:url", content: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: title },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: url },
    { name: "twitter:domain", content: "jira-clone.fly.dev" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:width", content: "1457" },
    { name: "twitter:image:height", content: "872" },
    { name: "twitter:image:alt", content: title },
    { name: "twitter:creator", content: "@Jack_DanielSG" },
    { name: "twitter:creator:id", content: "Jack_DanielSG" },
  ]
};

type LoaderData = {
  projectSummary: ProjectSummary;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const projectId = params.projectId as ProjectId;

  invariant(params.projectId, `params.projectId is required`);

  const projectSummary = await getProjectSummary(projectId);

  if (!projectSummary) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  if (url.pathname === `/projects/${projectId}`) {
    return redirect(`/projects/${projectId}/board`);
  }

  return json<LoaderData>({ projectSummary: projectSummary });
};

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  const errorMessage = "The Project page failed. Navigate to the projects page";

  return (
    <div className="flex h-full items-center justify-center">
      <Error500 message={errorMessage} href="/projects" />
    </div>
  );
}

export function CatchBoundary() {
  const errorMessage = "Project not found. Navigate to the projects page";
  return (
    <div className="flex h-full items-center justify-center">
      <Error404 message={errorMessage} href="/projects" />
    </div>
  );
}

export default function ProjectRoute() {
  const { projectSummary } = useLoaderData() as LoaderData;
  const { name, description, image } = projectSummary;
  return <ProjectView name={name} description={description} image={image} />;
}
