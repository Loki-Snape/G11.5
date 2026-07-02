import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

async function handleClearance(formData: FormData) {
  'use server';
  const code = formData.get('code');
  const adminCode = process.env.ADMIN_CODE;
  if (code && adminCode && code.toString() === adminCode) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'session-token',
      value: uuidv4(),
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    redirect('/admin');
  }
  // Return redirect to clearance page with an error state (or handled via searchParams)
  redirect('/clearance?error=1');
}

interface ClearancePageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function ClearancePage({ searchParams }: ClearancePageProps) {
  const params = await searchParams;
  const isError = params.error === '1';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white">
      <div className="text-center">
        <p className="text-[#d4af37] tracking-[2px] uppercase text-sm mb-2 font-serif">
          Classified Clearance Required
        </p>
        <h1 className="text-5xl font-serif mb-4 text-[#d4af37]">
          G11.5 Operations
        </h1>
        <p className="text-gray-400 italic">
          Advanced Paranormal Investigation Agency
        </p>
        
        <form action={handleClearance} className="mt-6 flex flex-col items-center">
          <input
            name="code"
            type="password"
            placeholder="Enter Admin Clearance Code"
            className="px-4 py-2 bg-gray-900 border border-[#d4af37]/20 text-white rounded mb-2 focus:outline-none focus:border-[#d4af37] text-center w-64"
            required
          />
          {isError && (
            <p className="text-red-500 text-xs mb-3 font-semibold">
              INVALID CLEARANCE CODE
            </p>
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-[#d4af37] text-black font-bold uppercase tracking-wider text-xs rounded hover:bg-[#c1992d] transition"
          >
            Authenticate Admin
          </button>
        </form>
      </div>
    </div>
  );
}
