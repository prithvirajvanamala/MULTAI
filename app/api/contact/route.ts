import { NextResponse } from 'next/server';
import supabase from '../../../lib/supabase';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  const { error } = await supabase.from('contacts').insert([{ name, email, message }]);

  if (error) {
    console.error("Supabase Error:", error.message);
    return NextResponse.json({ message: 'DB Error: ' + error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Stored in DB successfully' });
}
