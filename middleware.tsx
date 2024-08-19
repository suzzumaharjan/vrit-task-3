import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
    let array=["suja123"];
    let token=request.cookies.get("userId")?.value;
    if(token && array.includes(token)){
        return NextResponse.next();
    }
    else{
        return NextResponse.redirect(new URL('/login', request.url))
    }
 
}
 

export const config = {
  matcher: '/dashboard/:path*',
}