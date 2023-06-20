import { Error500 } from "@app/components/error-500";
import { TableView } from "@app/components/table";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction<any> = ({ data }) => {
  // const { project } = data as LoaderData;
  const title = "Project - Component";
  const description =
    "Manage your project. Create, edit, delete new issues and assigne them.";
  const image = "https://jira-clone.fly.dev/static/images/readme/project.png";

  return {
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
    title: title,
    description: description,
    // "og:url": url,
    "og:type": "website",
    "og:site_name": title,
    "og:title": title,
    "og:description": description,
    "og:image": image,
    "twitter:card": "summary_large_image",
    // "twitter:site": url,
    "twitter:domain": "jira-clone.fly.dev",
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": image,
    "twitter:image:width": "1457",
    "twitter:image:height": "872",
    "twitter:image:alt": title,
    "twitter:creator": "@Jack_DanielSG",
    "twitter:creator:id": "Jack_DanielSG",
  };
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
