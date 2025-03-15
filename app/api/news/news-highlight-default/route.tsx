import { NextResponse } from 'next/server';

export async function GET() {
  const backendApiUrl = process.env.ENV_BE + '/api/news-highlight';

  try {
    const response = await fetch(backendApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();

      return NextResponse.json(
        {
          success: false,
          message: errorData.message || 'Data failed',
        },
        { status: response.status }
      );
    }
    const res = await response.json();
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    console.error('error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
