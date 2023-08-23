import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request) {
    const coockie = request.cookies.get('isLogged');
    if (coockie) {
        return NextResponse.next()
    }
    return NextResponse.redirect(
        new URL(process.env.NEXT_PUBLIC_FRONTEND_URL + '/', request.url)
    );
}

export const config = {
    matcher: [
        '/inventario',
        '/login'
    ],
};