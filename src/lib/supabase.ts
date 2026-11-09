import { createClient } from '@supabase/supabase-js';
import { ContactFormData } from '../types';

export const SUPABASE_PROJECT_ID = 'cftpattxoelfpzicxbdr';
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://cftpattxoelfpzicxbdr.supabase.co';
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_jTTbYMQqjxckF4EXyTlsQg_qOE2am1X';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const SUPABASE_SQL_SETUP = `-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new

create table if not exists public.appointments (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  business_name text not null,
  website_type text not null,
  project_details text not null,
  selected_plan text,
  appointment_date text,
  appointment_time text,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.appointments enable row level security;

-- Allow anonymous form submissions
create policy "Allow public inserts" on public.appointments
  for insert
  with check (true);

-- Allow reading appointments
create policy "Allow public reads" on public.appointments
  for select
  using (true);
`;

export interface SaveAppointmentResult {
  success: boolean;
  id?: string;
  table?: string;
  error?: string;
  missingTable?: boolean;
  persistedLocally?: boolean;
}

export async function saveAppointment(
  data: ContactFormData
): Promise<SaveAppointmentResult> {
  const payload = {
    full_name: data.fullName,
    email: data.email,
    business_name: data.businessName,
    website_type: data.websiteType,
    project_details: data.projectDetails,
    selected_plan: data.selectedPlan || null,
    appointment_date: data.appointmentDate || null,
    appointment_time: data.appointmentTime || null,
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  // Always back up locally in case of network issues or missing table
  try {
    const existing = JSON.parse(
      localStorage.getItem('merlin_appointments') || '[]'
    );
    existing.unshift({ ...payload, local_id: `LOCAL-${Date.now()}` });
    localStorage.setItem('merlin_appointments', JSON.stringify(existing));
  } catch (e) {
    console.warn('Could not cache appointment locally', e);
  }

  // Attempt 1: Insert into 'appointments' table
  try {
    const { data: insertResult, error } = await supabase
      .from('appointments')
      .insert([payload])
      .select('id')
      .maybeSingle();

    if (!error) {
      return {
        success: true,
        id: insertResult?.id || `MRL-${Math.floor(1000 + Math.random() * 9000)}`,
        table: 'appointments',
      };
    }

    // Check if error is due to missing table
    const isTableMissing =
      error.message?.includes('schema cache') ||
      error.message?.includes('does not exist') ||
      error.code === '42P01' ||
      error.code === 'PGRST205';

    if (isTableMissing) {
      // Attempt 2: Try fallback table 'bookings'
      const { data: bookingResult, error: bookingError } = await supabase
        .from('bookings')
        .insert([payload])
        .select('id')
        .maybeSingle();

      if (!bookingError) {
        return {
          success: true,
          id: bookingResult?.id || `MRL-${Math.floor(1000 + Math.random() * 9000)}`,
          table: 'bookings',
        };
      }

      return {
        success: false,
        missingTable: true,
        error: error.message,
        persistedLocally: true,
      };
    }

    return {
      success: false,
      error: error.message,
      persistedLocally: true,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown database error';
    return {
      success: false,
      error: message,
      persistedLocally: true,
    };
  }
}

export async function checkSupabaseStatus(): Promise<{
  connected: boolean;
  hasTable: boolean;
  tableName?: string;
  error?: string;
}> {
  try {
    const { error: apptError } = await supabase
      .from('appointments')
      .select('id')
      .limit(1);

    if (!apptError) {
      return { connected: true, hasTable: true, tableName: 'appointments' };
    }

    const { error: bookError } = await supabase
      .from('bookings')
      .select('id')
      .limit(1);

    if (!bookError) {
      return { connected: true, hasTable: true, tableName: 'bookings' };
    }

    return {
      connected: true,
      hasTable: false,
      error: apptError.message,
    };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Network failure';
    return {
      connected: false,
      hasTable: false,
      error: message,
    };
  }
}
