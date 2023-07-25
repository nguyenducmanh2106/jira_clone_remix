import { Error500 } from "@app/components/error-500";
import { TableView } from "@app/components/table";
import { MetaFunction, V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction<any> = ({ data }) => {
  // const { project } = data as LoaderData;
  const title = "Project - Custom Fields";
  const description =
    "Manage your project. Create, edit, delete new issues and assigne them.";
  const image = "https://jira-clone.fly.dev/static/images/readme/project.png";

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
    // { property: "og:url", content: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: title },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    // { name: "twitter:site", content: url },
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
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  const errorMessage = "The analytics page failed. Navigate to the board page";

  return (
    <div className="flex h-full items-center justify-center">
      <Error500 message={errorMessage} href="board" />
    </div>
  );
}

export default function ComponentsRoute() {
  return <TableView />;
}
