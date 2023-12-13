import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { UserId } from "@domain/user";
import { ProjectId } from "@domain/project";
import { CategoryId } from "@domain/category";
import { Comment } from "@domain/comment";
import { PriorityId } from "@domain/priority";
import { isValidSort } from "@domain/filter";
import { createIssue, CreateIssueInputData } from "@infrastructure/db/issue";
import { IssuePanel } from "@app/ui/main/project/board/issue-panel";
import { textAreOnlySpaces } from "@utils/text-are-only-spaces";
import { emitter, EVENTS } from "@app/events";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { projectId } = data as LoaderData;
  const title = `Project - Create issue`;
  const description = "Create new issue, edit it and and assigne team members.";
  const image =
    "https://jira-clone.fly.dev/static/images/readme/issue-panel.png";
  const url = `https://jira-clone.fly.dev/projects/${projectId}/board/issue/new`;

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
  //   "twitter:image:width": "1452",
  //   "twitter:image:height": "865",
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
    { name: "robots", content: "index,follow" },
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
    { name: "twitter:image:width", content: "1452" },
    { name: "twitter:image:height", content: "865" },
    { name: "twitter:image:alt", content: title },
    { name: "twitter:creator", content: "@Jack_DanielSG" },
    { name: "twitter:creator:id", content: "Jack_DanielSG" },
  ]
};

type LoaderData = {
  projectId: ProjectId;
};

export const loader: LoaderFunction = async ({ params }) => {
  const projectId = params.projectId as ProjectId;

  invariant(params.projectId, `params.projectId is required`);
  return json<LoaderData>({ projectId });
};

export type ActionData = {
  errors: {
    name?: string;
  };
};

export const action: ActionFunction = async ({ request, params }) => {
  const projectId = params.projectId as ProjectId;
  const formData = await request.formData();
  const _action = formData.get("_action") as string;
  const url = new URL(request.url);
  const sortByParam = url.searchParams.get("sortBy") as string;
  const sortBySeachParam = isValidSort(sortByParam)
    ? `?sortBy=${sortByParam}`
    : "";
  const previousUrl = `/projects/${projectId}/board${sortBySeachParam}`;

  if (_action === "upsert") {
    const name = formData.get("title") as string;
    const description = formData.get("description") as string;
    const categoryId = formData.get("status") as CategoryId;
    const priority = formData.get("priority") as PriorityId;
    const asigneeId = formData.get("asignee") as UserId;
    const reporterId = formData.get("reporter") as UserId;
    const comments = JSON.parse(
      formData.get("comments") as string
    ) as Comment[];
    const issueInputData: CreateIssueInputData = {
      name,
      description,
      categoryId,
      priority,
      asigneeId,
      reporterId,
      comments,
    };

    if (!name || textAreOnlySpaces(name)) {
      return json<ActionData>(
        { errors: { name: "Title is required" } },
        { status: 400 }
      );
    }

    await createIssue(issueInputData);

    emitter.emit(EVENTS.ISSUE_CHANGED, Date.now());
  }

  return redirect(previousUrl);
};

export default function IssuePanelRoute() {
  return <IssuePanel />;
}
