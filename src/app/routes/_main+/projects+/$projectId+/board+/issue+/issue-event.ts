// import { eventStream } from "remix-utils";
import { eventStream } from "remix-utils/sse/server";
import { emitter, EVENTS } from "@app/events";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  return eventStream(request.signal, (send) => {
    const handle = (message: string) => {
      send({ event: EVENTS.ISSUE_CHANGED, data: message });
    };

    emitter.on(EVENTS.ISSUE_CHANGED, handle);

    return () => emitter.off(EVENTS.ISSUE_CHANGED, handle);
  });
}
