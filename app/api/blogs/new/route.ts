import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const { title, slug, summary, content, created_by } = await req.json();

  const { data, error } = await supabase.from('blogs').insert([
    {
      title,
      slug,
      summary,
      content,
      created_by,
      updated_by: created_by,
      updated_at: new Date().toISOString(),
    },
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
