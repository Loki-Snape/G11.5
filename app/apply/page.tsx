import prisma from '@/app/lib/prisma';
import NavBar from '@/app/components/NavBar';
import { redirect } from 'next/navigation';

interface ApplyPageProps {
  searchParams: Promise<{ success?: string }>;
}

export const metadata = {
  title: 'Apply - G11.5 Agency',
};

async function handleApply(formData: FormData) {
  'use server';
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const interestedRole = formData.get('interestedRole') as string;
  const whyHireYou = formData.get('whyHireYou') as string;
  const motivation = formData.get('motivation') as string;

  await prisma.applications.create({
    data: {
      full_name: fullName,
      email,
      phone,
      interested_role: interestedRole,
      why_hire_you: whyHireYou,
      motivation,
      status: 'Review Pending',
    },
  });

  const url = new URL('/apply', process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');
  url.searchParams.set('success', '1');
  redirect(url.toString());
}

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  const params = await searchParams;
  const isSuccess = params.success === '1';

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <NavBar />
      <main className="flex-1 px-4 py-8 sm:p-8 pt-24 sm:pt-28 max-w-4xl mx-auto w-full flex flex-col">
        <h1 className="text-3xl sm:text-4xl font-serif text-[#d4af37] mb-2 tracking-wide text-center" style={{ fontFamily: 'Cinzel, serif' }}>
          Apply to G11.5 Agency
        </h1>
        <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto text-sm leading-relaxed">
          Transmit your credentials to the department heads. All information is handled with absolute confidentiality.
        </p>

        {isSuccess && (
          <div className="border border-[#d4af37] bg-[#d4af37]/10 p-4 mb-8 text-[#d4af37] rounded text-center text-sm font-semibold tracking-wide">
            Transmission received. G11.5 operations team will review your submission shortly.
          </div>
        )}

        {/* Application Form */}
        <form action={handleApply} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/40 border border-[#d4af37]/20 p-4 sm:p-8 rounded-lg mb-16">
          <div className="md:col-span-2 flex flex-col gap-1">
            <label htmlFor="fullName" className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              required
              placeholder="E.g. Agent Carter"
              className="p-3 bg-gray-900/60 border border-[#d4af37]/20 rounded text-white focus:outline-none focus:border-[#d4af37] text-base"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="agent@g115.agency"
              className="p-3 bg-gray-900/60 border border-[#d4af37]/20 rounded text-white focus:outline-none focus:border-[#d4af37] text-base"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="+1 (555) 0199"
              className="p-3 bg-gray-900/60 border border-[#d4af37]/20 rounded text-white focus:outline-none focus:border-[#d4af37] text-base"
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-1">
            <label htmlFor="interestedRole" className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Interested Role</label>
            <select
              id="interestedRole"
              name="interestedRole"
              required
              defaultValue=""
              className="p-3 bg-gray-900 border border-[#d4af37]/20 rounded text-white focus:outline-none focus:border-[#d4af37] text-base"
            >
              <option value="" disabled className="text-gray-500">Select a specialized role...</option>
              
              <optgroup label="Executive Leadership & Global Management" className="bg-black text-[#d4af37] font-semibold py-1">
                <option value="Operations Manager / General Coordinator" className="text-white bg-gray-900">Operations Manager / General Coordinator</option>
              </optgroup>

              <optgroup label="Client & Case Management" className="bg-black text-[#d4af37] font-semibold py-1">
                <option value="Client Liaison & Case Acquisition" className="text-white bg-gray-900">Client Liaison & Case Acquisition</option>
                <option value="Case Manager" className="text-white bg-gray-900">Case Manager</option>
                <option value="Intake & Screening Specialist" className="text-white bg-gray-900">Intake & Screening Specialist</option>
              </optgroup>

              <optgroup label="Technical Operations" className="bg-black text-[#d4af37] font-semibold py-1">
                <option value="Database Administrator (DBA)" className="text-white bg-gray-900">Database Administrator (DBA)</option>
                <option value="Web Developer" className="text-white bg-gray-900">Web Developer</option>
                <option value="Equipment Innovator / R&D Engineer" className="text-white bg-gray-900">Equipment Innovator / R&D Engineer</option>
                <option value="Equipment Manager / Quartermaster" className="text-white bg-gray-900">Equipment Manager / Quartermaster</option>
              </optgroup>

              <optgroup label="Media, Marketing & Documentation" className="bg-black text-[#d4af37] font-semibold py-1">
                <option value="Social Media Handler" className="text-white bg-gray-900">Social Media Handler</option>
                <option value="Documentarian" className="text-white bg-gray-900">Documentarian</option>
                <option value="Historical Researcher" className="text-white bg-gray-900">Historical Researcher</option>
                <option value="Camera Operator" className="text-white bg-gray-900">Camera Operator</option>
                <option value="Audio Engineer" className="text-white bg-gray-900">Audio Engineer</option>
              </optgroup>

              <optgroup label="Esoteric & Spiritual Specialists" className="bg-black text-[#d4af37] font-semibold py-1">
                <option value="Psychic" className="text-white bg-gray-900">Psychic</option>
                <option value="Medium" className="text-white bg-gray-900">Medium</option>
                <option value="Sensitive" className="text-white bg-gray-900">Sensitive</option>
                <option value="Exorcist" className="text-white bg-gray-900">Exorcist</option>
                <option value="Demonologist" className="text-white bg-gray-900">Demonologist</option>
                <option value="Cryptozoologist" className="text-white bg-gray-900">Cryptozoologist</option>
              </optgroup>

              <optgroup label="Field Investigation & Business Ops" className="bg-black text-[#d4af37] font-semibold py-1">
                <option value="Lead Investigator" className="text-white bg-gray-900">Lead Investigator</option>
                <option value="Field Investigator" className="text-white bg-gray-900">Field Investigator</option>
                <option value="Skeptic" className="text-white bg-gray-900">Skeptic</option>
                <option value="Accountant" className="text-white bg-gray-900">Accountant</option>
                <option value="Legal Counsel" className="text-white bg-gray-900">Legal Counsel</option>
              </optgroup>
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col gap-1">
            <label htmlFor="whyHireYou" className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Why should we hire you?</label>
            <textarea
              id="whyHireYou"
              name="whyHireYou"
              required
              rows={4}
              placeholder="State your unique skillset, specialized field knowledge, and what you bring to the department."
              className="p-3 bg-gray-900/60 border border-[#d4af37]/20 rounded text-white focus:outline-none focus:border-[#d4af37] text-base resize-none"
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-1">
            <label htmlFor="motivation" className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Why join G11.5?</label>
            <textarea
              id="motivation"
              name="motivation"
              required
              rows={4}
              placeholder="Describe your motivation for dealing with the paranormal and alignment with G11.5 operations."
              className="p-3 bg-gray-900/60 border border-[#d4af37]/20 rounded text-white focus:outline-none focus:border-[#d4af37] text-base resize-none"
            />
          </div>

          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#d4af37] hover:bg-[#d4af37]/90 text-black font-bold uppercase tracking-wider rounded transition-colors text-sm shadow-md cursor-pointer"
            >
              Submit Application
            </button>
          </div>
        </form>

        {/* Role Reference Section */}
        <section className="border-t border-[#d4af37]/20 pt-10 mb-12">
          <h2 className="text-2xl font-serif text-[#d4af37] mb-8 pb-2 border-b border-[#d4af37]/15 tracking-wide" style={{ fontFamily: 'Cinzel, serif' }}>
            What Do These Roles Do?
          </h2>
          
          <div className="space-y-10">
            {/* Category 1 */}
            <div>
              <h3 className="text-base uppercase tracking-wider text-[#d4af37] font-semibold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                1. Executive Leadership & Global Management
              </h3>
              <div className="space-y-4 pl-4 border-l border-[#d4af37]/10">
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Operations Manager / General Coordinator</span>
                  <span className="text-sm text-gray-300">The central nervous system of the organization. They oversee all departments, coordinate between tech, media, and field teams, manage company-wide logistics, and ensure the entire business runs smoothly day-to-day.</span>
                </div>
              </div>
            </div>

            {/* Category 2 */}
            <div>
              <h3 className="text-base uppercase tracking-wider text-[#d4af37] font-semibold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                2. Client & Case Management
              </h3>
              <div className="space-y-4 pl-4 border-l border-[#d4af37]/10">
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Client Liaison & Case Acquisition</span>
                  <span className="text-sm text-gray-300">Focuses on business development, bringing in new clients, and handling sensitive client relations and aftercare.</span>
                </div>
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Case Manager</span>
                  <span className="text-sm text-gray-300">Manages the active case pipeline, schedules investigations, and coordinates logistics specific to each mission.</span>
                </div>
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Intake & Screening Specialist</span>
                  <span className="text-sm text-gray-300">Conducts initial interviews to analyze client statements and filter incoming requests.</span>
                </div>
              </div>
            </div>

            {/* Category 3 */}
            <div>
              <h3 className="text-base uppercase tracking-wider text-[#d4af37] font-semibold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                3. Technical Operations
              </h3>
              <div className="space-y-6 pl-4 border-l border-[#d4af37]/10">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Digital Infrastructure Team</h4>
                  <div className="space-y-4">
                    <div>
                      <span className="font-playfair text-lg text-[#d4af37] block font-medium">Database Administrator (DBA)</span>
                      <span className="text-sm text-gray-300">Manages and maintains the localized database containing all case details, member profiles, logs, and evidence links.</span>
                    </div>
                    <div>
                      <span className="font-playfair text-lg text-[#d4af37] block font-medium">Web Developer</span>
                      <span className="text-sm text-gray-300">Builds, updates, and maintains the company’s website and client portal.</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Hardware & R&D Tech Team</h4>
                  <div className="space-y-4">
                    <div>
                      <span className="font-playfair text-lg text-[#d4af37] block font-medium">Equipment Innovator / R&D Engineer</span>
                      <span className="text-sm text-gray-300">Designs, prototypes, and builds custom paranormal investigation hardware.</span>
                    </div>
                    <div>
                      <span className="font-playfair text-lg text-[#d4af37] block font-medium">Equipment Manager / Quartermaster</span>
                      <span className="text-sm text-gray-300">Maintains physical inventory, tests calibrations, and handles field gear logistics.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 4 */}
            <div>
              <h3 className="text-base uppercase tracking-wider text-[#d4af37] font-semibold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                4. Media, Marketing & Documentation
              </h3>
              <div className="space-y-4 pl-4 border-l border-[#d4af37]/10">
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Social Media Handler</span>
                  <span className="text-sm text-gray-300">Focuses entirely on audience engagement, content creation, and public updates across all platforms.</span>
                </div>
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Documentarian</span>
                  <span className="text-sm text-gray-300">Chronicles the active investigation on-site through real-time logs, photographs, and operational timelines.</span>
                </div>
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Historical Researcher</span>
                  <span className="text-sm text-gray-300">Focuses entirely on off-site research—investigating property deeds, local history, public records, and ancestral lineage.</span>
                </div>
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Camera Operator</span>
                  <span className="text-sm text-gray-300">Manages visual capture, night-vision, and thermal camera rigs.</span>
                </div>
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Audio Engineer</span>
                  <span className="text-sm text-gray-300">Manages multi-track recorders and processes audio for EVP analysis.</span>
                </div>
              </div>
            </div>

            {/* Category 5 */}
            <div>
              <h3 className="text-base uppercase tracking-wider text-[#d4af37] font-semibold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                5. Esoteric & Spiritual Specialists
              </h3>
              <div className="space-y-4 pl-4 border-l border-[#d4af37]/10">
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Psychic</span>
                  <span className="text-sm text-gray-300">Perceives hidden information about objects, history, or locations through extrasensory perception.</span>
                </div>
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Medium</span>
                  <span className="text-sm text-gray-300">Focuses specifically on communicating with discarnate entities or ancestral spirits.</span>
                </div>
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Sensitive</span>
                  <span className="text-sm text-gray-300">Reads residual emotional energies and atmospheric shifts in an environment.</span>
                </div>
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Exorcist</span>
                  <span className="text-sm text-gray-300">The spiritual specialist responsible for performing cleansing rituals, blessings, or formal interventions to banish negative entities and restore spiritual order.</span>
                </div>
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Demonologist</span>
                  <span className="text-sm text-gray-300">Studies, classifies, and assesses malicious or non-human entities.</span>
                </div>
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Cryptozoologist</span>
                  <span className="text-sm text-gray-300">Investigate cases involving anomalous creatures or cryptids.</span>
                </div>
              </div>
            </div>

            {/* Category 6 */}
            <div>
              <h3 className="text-base uppercase tracking-wider text-[#d4af37] font-semibold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                6. Field Investigation & Business Ops
              </h3>
              <div className="space-y-4 pl-4 border-l border-[#d4af37]/10">
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Lead Investigator</span>
                  <span className="text-sm text-gray-300">Commands the field team during an active live sweep.</span>
                </div>
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Field Investigator</span>
                  <span className="text-sm text-gray-300">Conducts real-time environmental data collection.</span>
                </div>
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Skeptic</span>
                  <span className="text-sm text-gray-300">Investigates structural, environmental, or electrical causes to debunk false anomalies.</span>
                </div>
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Accountant</span>
                  <span className="text-sm text-gray-300">Handles corporate budgets, R&D funding, and expenses.</span>
                </div>
                <div>
                  <span className="font-playfair text-lg text-[#d4af37] block font-medium">Legal Counsel</span>
                  <span className="text-sm text-gray-300">Manages NDAs, liability waivers, and property access permissions.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
