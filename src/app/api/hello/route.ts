import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'notus OS API is working!',
    timestamp: new Date().toISOString()
  })
} 