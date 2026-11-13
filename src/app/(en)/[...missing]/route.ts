import { notFoundResponse } from "@/lib/not-found-response";

export function GET() {
  return notFoundResponse("en");
}
