import { NextResponse } from "next/server"

// Simple in-memory user store (in production, use a real database)
const users = new Map<string, { id: number; email: string; password: string; name: string }>()
let nextUserId = 2

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (users.has(email)) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    const newUser = {
      id: nextUserId++,
      email,
      password,
      name,
    }

    users.set(email, newUser)

    return NextResponse.json({
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
