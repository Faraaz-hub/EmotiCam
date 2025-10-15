import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { logout } from "~/lib/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  return logout();
}

export function loader() {
  return redirect("/");
}
