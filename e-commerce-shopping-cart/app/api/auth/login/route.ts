import { NextResponse } from "next/server"

// Simple in-memory user store (in production, use a real database)
const users = new Map<string, { id: number; email: string; password: string; name: string }>()

// Add a demo user
users.set("demo@example.com", {
  id: 1,
  email: "demo@example.com",
  password: "password123",
  name: "Demo User",
})

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const user = users.get(email)

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
