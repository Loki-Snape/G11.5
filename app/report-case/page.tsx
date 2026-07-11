import NavBar from '@/app/components/NavBar';
import ReportCaseForm from './ReportCaseForm';

export const metadata = { title: 'Report Case - G11.5 Agency' };

export default function ReportCasePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <NavBar />
      <main className="flex-grow px-4 py-8 sm:p-8 pt-24 sm:pt-28 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl font-serif text-[#d4af37] mb-2 tracking-wide text-center" style={{ fontFamily: 'Cinzel, serif' }}>
          Report a Case
        </h1>
        <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto text-sm leading-relaxed">
          If you are experiencing unexplained phenomena or require paranormal investigation services, catalog the parameters of your encounter below.
        </p>
        <ReportCaseForm />
      </main>
    </div>
  );
}

