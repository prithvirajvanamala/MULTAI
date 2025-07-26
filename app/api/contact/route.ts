import { NextResponse } from 'next/server';
import supabase from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, phone } = body;

    console.log('📥 Received:', body);

    const insertResponse = await supabase
      .from('contacts')
      .insert([{ name, email, message, phone }]);

    console.log('📦 Supabase Response:', insertResponse);

    if (insertResponse.error) {
      console.error('❌ Supabase Insert Error:', insertResponse.error);
      return NextResponse.json({ message: 'DB Error: ' + insertResponse.error.message }, { status: 500 });
    }

    return NextResponse.json({ message: '✅ Stored successfully!' });
  } catch (error: any) {
    console.error('❌ API Crash:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
