import { verifyToken } from "../../../../lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
      return NextResponse.json({ user: null });
    }
    
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ user: null });
    }
    
    return NextResponse.json({
      user: {
        id: payload.userId,
        email: payload.email,
        name: payload.name,
      },
    });
  } catch (error) {
    console.error("Fetch me failed:", error);
    return NextResponse.json({ user: null });
  }
};
