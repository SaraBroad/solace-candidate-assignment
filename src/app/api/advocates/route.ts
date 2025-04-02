import db from "../../../db";
import { advocates } from "../../../db/schema";
// import { advocateData } from "../../../db/seed/advocates";

export async function GET() {
  try {
    const data = await db.select().from(advocates);
    return Response.json({ data });
  } catch (error: any) {
    console.error("Database error:", error);
    return Response.json({ message: 'Failed to fetch data' }, { status: 500 });
  }
}
