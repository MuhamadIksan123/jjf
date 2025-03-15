import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get('path');

  if (!path) {
    return new Response('Path parameter is missing', { status: 400 });
  }

  const api = process.env.ENV_BE + '/api/news-category/' + path + '/trending';

  try {
    const response = await fetch(api, {
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
