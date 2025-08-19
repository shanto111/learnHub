import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
export async function ServerSession() {
  return await getServerSession(authOptions);
}
