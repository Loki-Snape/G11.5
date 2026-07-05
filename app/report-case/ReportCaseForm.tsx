"use client";
import { useActionState } from 'react';
import { submitCaseReport } from './actions';

export default function ReportCaseForm() {
  const [state, formAction] = useActionState(submitCaseReport, { success: false });

  if (state.success) {
    return (
      <div className="border border-[#d4af37] bg-[#d4af37]/10 p-8 max-w-lg mx-auto text-center rounded-lg shadow-lg">
        <h1 className="text-3xl font-serif text-[#d4af37] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
          Transmission Received
        </h1>
        <p className="text-gray-300 text-sm leading-relaxed">
          Your case report has been secure-routed to the G11.5 intelligence team. We will review the details and contact you according to your contact preferences.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8 bg-black/40 border border-[#d4af37]/20 p-6 md:p-8 rounded-lg">

      {/* SECTION 1: ESSENTIAL CONTACT INFO */}
      <div className="space-y-4">
        <h2 className="text-lg font-serif text-[#d4af37] border-b border-[#d4af37]/20 pb-1" style={{ fontFamily: 'Cinzel, serif' }}>
          1. Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold" htmlFor="reporterName">
              Full Name
            </label>
            <input
              type="text"
              id="reporterName"
              name="reporterName"
              required
              placeholder="Your Name"
              className="p-3 bg-gray-900/60 border border-[#d4af37]/20 rounded text-white focus:outline-none focus:border-[#d4af37] text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold" htmlFor="reporterPhone">
              Phone Number
            </label>
            <input
              type="tel"
              id="reporterPhone"
              name="reporterPhone"
              required
              placeholder="+1 (555) 0100"
              className="p-3 bg-gray-900/60 border border-[#d4af37]/20 rounded text-white focus:outline-none focus:border-[#d4af37] text-sm"
            />
            <span className="text-[10px] text-gray-400">Note: We will text you before calling</span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold" htmlFor="reporterEmail">
              Email Address
            </label>
            <input
              type="email"
              id="reporterEmail"
              name="reporterEmail"
              required
              placeholder="you@example.com"
              className="p-3 bg-gray-900/60 border border-[#d4af37]/20 rounded text-white focus:outline-none focus:border-[#d4af37] text-sm"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: LOCATION */}
      <div className="space-y-4">
        <h2 className="text-lg font-serif text-[#d4af37] border-b border-[#d4af37]/20 pb-1" style={{ fontFamily: 'Cinzel, serif' }}>
          2. Incident Location
        </h2>
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold" htmlFor="location">
            Location / Address
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            placeholder="E.g. Amityville"
            className="p-3 bg-gray-900/60 border border-[#d4af37]/20 rounded text-white focus:outline-none focus:border-[#d4af37] text-sm"
          />
        </div>
      </div>

      {/* SECTION 3: TYPE OF ACTIVITY */}
      <div className="space-y-4">
        <h2 className="text-lg font-serif text-[#d4af37] border-b border-[#d4af37]/20 pb-1" style={{ fontFamily: 'Cinzel, serif' }}>
          3. Type of Activity
        </h2>
        <p className="text-xs text-gray-400">Select all categories that apply to your experience:</p>
        <div className="space-y-3">
          {[
            { value: "Unexplained sounds (footsteps, knocks, voices)", label: "Unexplained sounds (footsteps, knocks, voices)" },
            { value: "Visual anomalies (shadows, figures, light distortion)", label: "Visual anomalies (shadows, figures, light distortion)" },
            { value: "Physical activity (moving objects, sudden temperature drops)", label: "Physical activity (moving objects, sudden temperature drops)" },
            { value: "Heavy or oppressive atmosphere", label: "Heavy or oppressive atmosphere" },
            { value: "Other", label: "Other" }
          ].map((item, idx) => (
            <label key={idx} className="flex items-start gap-3 text-sm text-gray-300 cursor-pointer select-none">
              <input
                type="checkbox"
                name="activityTypes"
                value={item.value}
                className="mt-1 w-4 h-4 rounded border-[#d4af37]/40 bg-gray-900 accent-[#d4af37] cursor-pointer"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* SECTION 4: CASE DETAILS */}
      <div className="space-y-4">
        <h2 className="text-lg font-serif text-[#d4af37] border-b border-[#d4af37]/20 pb-1" style={{ fontFamily: 'Cinzel, serif' }}>
          4. Case Details
        </h2>
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold" htmlFor="description">
            What are you experiencing? (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Tell us what happened, in your own words. Take your time."
            className="p-3 bg-gray-900/60 border border-[#d4af37]/20 rounded text-white focus:outline-none focus:border-[#d4af37] text-sm resize-none"
          />
        </div>
      </div>

      {/* SECTION 5: TRIAGE & TIMING */}
      <div className="space-y-6">
        <h2 className="text-lg font-serif text-[#d4af37] border-b border-[#d4af37]/20 pb-1" style={{ fontFamily: 'Cinzel, serif' }}>
          5. Triage & Timing
        </h2>

        {/* Timing */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
            When does it usually happen?
          </label>
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-6">
            {["Daytime", "Nighttime", "Unpredictable", "Always"].map((time, idx) => (
              <label key={idx} className="flex items-center gap-2.5 text-sm text-gray-300 cursor-pointer select-none">
                <input
                  type="radio"
                  name="timing"
                  value={time}
                  required
                  className="w-4 h-4 border-[#d4af37]/40 bg-gray-900 accent-[#d4af37] cursor-pointer"
                />
                <span>{time}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Danger Level */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
            Is anyone in immediate danger?
          </label>
          <div className="space-y-3">
            {[
              "Yes, we need immediate help.",
              "No, but it is deeply disturbing.",
              "No, we are safe but need answers."
            ].map((danger, idx) => (
              <label key={idx} className="flex items-start gap-2.5 text-sm text-gray-300 cursor-pointer select-none">
                <input
                  type="radio"
                  name="dangerLevel"
                  value={danger}
                  required
                  className="mt-1 w-4 h-4 border-[#d4af37]/40 bg-gray-900 accent-[#d4af37] cursor-pointer"
                />
                <span>{danger}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3 bg-[#d4af37] hover:bg-[#d4af37]/90 text-black font-bold uppercase tracking-wider rounded transition-colors text-sm shadow-md"
        >
          Submit Case Report
        </button>
      </div>

    </form>
  );
}
