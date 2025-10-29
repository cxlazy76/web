import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, surname, character } = await req.json();

    if (!name || !surname || !character) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const res = await fetch(process.env.N8N_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, surname, character }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('n8n error:', errorText);
      return NextResponse.json(
        { success: false, message: 'n8n webhook failed' },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
