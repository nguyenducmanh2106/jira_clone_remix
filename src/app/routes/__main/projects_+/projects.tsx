import type {
  LoaderFunction,
  ActionFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProjectId, ProjectSummary } from "@domain/project";
import { getProjectsSummary, deleteProject } from "@infrastructure/db/project";
import { getUserSession } from "@app/session-storage";
import { ProjectsView } from "@app/ui/main/projects";

export const meta: MetaFunction = () => {
  const title = "Projects";
  const description =
    "See all your projects in one place. Create new ones and assigne team members.";
  const image = "https://jira-clone.fly.dev/static/images/readme/projects.png";
  const url = "https://jira-clone.fly.dev/projects";

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
  //   "twitter:image:width": "1297",
  //   "twitter:image:height": "635",
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
    { name: "twitter:image:width", content: "1297" },
    { name: "twitter:image:height", content: "635" },
    { name: "twitter:image:alt", content: title },
    { name: "twitter:creator", content: "@Jack_DanielSG" },
    { name: "twitter:creator:id", content: "Jack_DanielSG" },
  ]
};

type LoaderData = {
  projectsSummary: ProjectSummary[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userSession = await getUserSession(request);
  const userId = userSession.getUser();

  if (!userId) {
    return redirect("/login");
  }

  const projectsSummary = await getProjectsSummary(userId);

  return json<LoaderData>({ projectsSummary });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const _action = formData.get("_action") as string;

  if (_action === "delete") {
    const projectId = formData.get("projectId") as ProjectId;

    projectId
      ? await deleteProject(projectId)
      : console.error("Project id not found: ", projectId);
  }
  return redirect("/projects");
};

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="h-full w-full text-center">
      <h1 className="mt-[200px] mb-6 text-lg">/projects ERROR</h1>
      <a href="/" className="text-primary-main hover:underline">
        Navigate to home
      </a>
    </div>
  );
}

export default function ProjectsRoute() {
  const { projectsSummary } = useLoaderData() as LoaderData;
  return <ProjectsView projectsSummary={projectsSummary} />;
}
