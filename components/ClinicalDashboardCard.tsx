"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse, Activity, AlertTriangle, CheckCircle2, UserCheck, ShieldCheck, Zap, PlusCircle, Radio } from "lucide-react";
import { ECGWaveform } from "./ECGWaveform";

const initialPatientQueue = [
  {
    id: "PAT-8492",
    condition: "Cardiac Anomaly & EHR Lab Spike",
    riskScore: 0.94,
    level: "High Risk",
    levelColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    action: "Escalated to On-Call Physician",
    latency: "12ms",
    doctor: "Dr. Chen (Cardiology)",
    time: "2 mins ago"
  },
  {
    id: "PAT-7301",
    condition: "Post-Surgical Vital Drift",
    riskScore: 0.88,
    level: "High Risk",
    levelColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    action: "RAG Clinical Summary Generated",
    latency: "18ms",
    doctor: "Dr. Miller (ICU)",
    time: "5 mins ago"
  },
  {
    id: "PAT-9124",
    condition: "Sepsis Early Indicator Pattern",
    riskScore: 0.76,
    level: "Moderate Risk",
    levelColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    action: "Automated Nurse Alert Paged",
    latency: "14ms",
    doctor: "Dr. Patel (Internal Med)",
    time: "8 mins ago"
  },
  {
    id: "PAT-6045",
    condition: "Routine EHR Lab Clearance",
    riskScore: 0.22,
    level: "Low Risk",
    levelColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    action: "Clearance Logged & Archived",
    latency: "8ms",
    doctor: "System Auto-Triage",
    time: "12 mins ago"
  }
];

export function ClinicalDashboardCard() {
  const [patients, setPatients] = useState(initialPatientQueue);
  const [filter, setFilter] = useState<"all" | "high">("all");
  const [selectedPatient, setSelectedPatient] = useState(initialPatientQueue[0]);
  const [selectedLead, setSelectedLead] = useState<"II" | "V1" | "V5">("II");
  const [bpm, setBpm] = useState(74);

  useEffect(() => {
    const interval = setInterval(() => {
      setBpm(72 + Math.floor(Math.random() * 6));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleInjectAnomaly = () => {
    const newId = `PAT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCase = {
      id: newId,
      condition: "Acute Arrhythmia & Telemetry Spike",
      riskScore: 0.96,
      level: "High Risk",
      levelColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
      action: "LangGraph Triage Dispatched",
      latency: "11ms",
      doctor: "Dr. Chen (Cardiology)",
      time: "Just now"
    };
    setPatients([newCase, ...patients.slice(0, 4)]);
    setSelectedPatient(newCase);
  };

  const filteredQueue = filter === "high" ? patients.filter(p => p.level === "High Risk") : patients;

  const leadColors = {
    "II": "#06b6d4",
    "V1": "#10b981",
    "V5": "#a855f7"
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-950/90 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      {/* Glow Aura */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-5 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400">
            <HeartPulse size={20} className="animate-pulse" />
          </span>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Clinical Risk Triage Dashboard</span>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-300 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Telemetry · J&J / Healthcare Standard
              </span>
            </div>
            <div className="text-[11px] text-slate-400">Real-Time EHR Anomaly Detection & Risk Stratification</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleInjectAnomaly}
            className="flex items-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-500/15 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/25 transition-all shadow-sm"
          >
            <PlusCircle size={13} />
            <span>Simulate Anomaly</span>
          </motion.button>

          <div className="flex rounded-lg border border-slate-800 bg-slate-900/60 p-0.5 text-xs font-semibold">
            <button
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filter === "all" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-slate-400 hover:text-white"
              }`}
            >
              All Cases ({patients.length})
            </button>
            <button
              onClick={() => setFilter("high")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filter === "high" ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : "text-slate-400 hover:text-white"
              }`}
            >
              High Risk
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Telemetry & Real-Time ECG */}
      <div className="grid gap-5 lg:grid-cols-12 relative z-10">
        {/* Left Column: Live ECG Waveform & Multi-Lead Selector */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Activity size={14} className="animate-spin" style={{ animationDuration: "8s" }} />
                <span>Cardiac Rhythm Telemetry</span>
              </span>
              
              {/* Lead Selector */}
              <div className="flex gap-1">
                {(["II", "V1", "V5"] as const).map((lead) => (
                  <button
                    key={lead}
                    onClick={() => setSelectedLead(lead)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                      selectedLead === lead
                        ? "bg-cyan-500/30 text-cyan-200 border border-cyan-400/50"
                        : "bg-slate-900 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    Lead {lead}
                  </button>
                ))}
              </div>
            </div>

            {/* Embedded Canvas ECG Monitor with Selected Lead Color */}
            <ECGWaveform color={leadColors[selectedLead]} height={70} speed={selectedLead === "V1" ? 2 : selectedLead === "V5" ? 3.5 : 2.5} />

            {/* Vitals Telemetry Badges */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-center">
              <div className="rounded-lg bg-slate-900/80 p-2 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Heart Rate</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">{bpm} BPM</div>
              </div>
              <div className="rounded-lg bg-slate-900/80 p-2 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">SpO2</div>
                <div className="text-sm font-bold text-cyan-400 font-mono">98.5%</div>
              </div>
              <div className="rounded-lg bg-slate-900/80 p-2 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Inference</div>
                <div className="text-sm font-bold text-purple-400 font-mono">12ms</div>
              </div>
            </div>
          </div>

          {/* Selected Case Inspection Card */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-white">{selectedPatient.id} Inspection</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${selectedPatient.levelColor}`}>
                {selectedPatient.level}
              </span>
            </div>
            <div className="text-xs font-bold text-slate-200">{selectedPatient.condition}</div>
            <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Routing: {selectedPatient.action}</span>
              <span className="font-mono text-cyan-400">{selectedPatient.latency}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Patient Stream List */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Incoming Clinical Event Stream</span>
            <span className="text-[10px] font-mono text-slate-500">Auto-Refreshed Real-Time</span>
          </div>

          <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {filteredQueue.map((patient) => {
                const isSelected = selectedPatient.id === patient.id;
                return (
                  <motion.div
                    key={patient.id}
                    layout
                    initial={{ opacity: 0, y: -10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    onClick={() => setSelectedPatient(patient)}
                    className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                      isSelected
                        ? "border-cyan-500/50 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                        : "border-slate-800/80 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white">{patient.id}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-md border ${patient.levelColor}`}>
                          {patient.level}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{patient.time}</span>
                    </div>

                    <div className="text-xs font-semibold text-slate-200">{patient.condition}</div>

                    <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <UserCheck size={12} className="text-cyan-400" />
                        {patient.doctor}
                      </span>
                      <span className="font-mono font-bold text-cyan-300 flex items-center gap-1">
                        <Zap size={10} className="text-cyan-400" />
                        {patient.latency}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
