import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Presentation,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  User,
  Layers,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  MessageSquare,
  Sparkles,
  SendHorizontal,
  BookOpenCheck,
  Check,
  X,
  RotateCcw,
  Trophy,
  Lightbulb,
  Info,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Search,
  Users,
  Clock,
  Hash,
  KeyRound,
  LogIn,
  LogOut,
  UserRound,
  LayoutDashboard,
  FilePlus2,
  Settings,
  Calendar,
  Download,
  Rocket,
  Copy,
  CopyCheck,
  TrendingUp,
  StopCircle,
  Ban,
  Loader2,
  BookOpen,
  ListChecks,
  Radio,
  ThumbsUp,
  Award,
  MessagesSquare,
  Send,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { api } from "./api";

/* ============================================================ */
/*  1. Entry screen                                              */
/* ============================================================ */

function EntryScreen({ onSelect = () => {} }) {
  const [hovered, setHovered] = useState(null);

  const roles = [
    {
      id: "student",
      label: "Student",
      icon: GraduationCap,
      description:
        "Ask doubts, get grounded explanations, and practice with quizzes built from what you asked.",
      accent: "indigo",
    },
    {
      id: "teacher",
      label: "Teacher",
      icon: Presentation,
      description:
        "Create tests in minutes, publish them live, and track how your students perform.",
      accent: "violet",
    },
  ];

  const accentStyles = {
    indigo: {
      border: "hover:border-indigo-300 focus-visible:border-indigo-400",
      iconBg: "bg-indigo-50 group-hover:bg-indigo-100",
      iconColor: "text-indigo-600",
      ring: "focus-visible:ring-indigo-200",
      glow: "group-hover:shadow-indigo-100",
      arrow: "text-indigo-600",
    },
    violet: {
      border: "hover:border-violet-300 focus-visible:border-violet-400",
      iconBg: "bg-violet-50 group-hover:bg-violet-100",
      iconColor: "text-violet-600",
      ring: "focus-visible:ring-violet-200",
      glow: "group-hover:shadow-violet-100",
      arrow: "text-violet-600",
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white flex items-center justify-center px-6">
      {/* Ambient background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black 40%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-100 via-violet-100 to-indigo-100 opacity-40 blur-3xl" />

      <div className="relative w-full max-w-3xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            EduBridge AI
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Welcome. Who's learning today?
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-slate-500">
            Choose how you'll use EduBridge — we'll set up the right space for you.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {roles.map((role) => {
            const Icon = role.icon;
            const styles = accentStyles[role.accent];
            const isHovered = hovered === role.id;

            return (
              <button
                key={role.id}
                type="button"
                onClick={() => onSelect(role.id)}
                onMouseEnter={() => setHovered(role.id)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative flex flex-col items-start rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm outline-none transition-all duration-300 ease-in-out
                  hover:-translate-y-1 hover:scale-105 hover:shadow-lg ${styles.border} ${styles.glow}
                  focus-visible:ring-4 ${styles.ring}`}
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${styles.iconBg}`}
                >
                  <Icon className={`h-6 w-6 ${styles.iconColor}`} strokeWidth={1.75} />
                </div>

                <h2 className="text-lg font-semibold text-slate-900">
                  {role.label}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {role.description}
                </p>

                <div
                  className={`mt-6 flex items-center gap-1.5 text-sm font-medium ${styles.arrow} opacity-0 transition-all duration-300 group-hover:opacity-100`}
                >
                  Continue
                  <ArrowRight
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isHovered ? "translate-x-0.5" : ""
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-slate-400">
          You can switch roles anytime by signing out.
        </p>
      </div>
    </div>
  );
}
/* ============================================================ */
/*  2. Login page                                                */
/* ============================================================ */

function FloatingInput({ id, label, type = "text", value, onChange, icon: Icon, error, rightSlot }) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || (value && value.length > 0);

  return (
    <div>
      <div className="relative">
        <Icon
          className={`pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 transition-colors ${
            error ? "text-rose-400" : focused ? "text-indigo-500" : "text-slate-400"
          }`}
          strokeWidth={1.75}
        />
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          className={`peer w-full rounded-xl border bg-white pl-11 pr-11 pt-5 pb-2 text-sm text-slate-900 outline-none transition-all ${
            error
              ? "border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
              : "border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          }`}
        />
        <label
          htmlFor={id}
          className={`absolute left-11 transition-all duration-150 ${
            isFloating
              ? `top-2.5 text-[11px] font-medium ${error ? "text-rose-500" : "text-indigo-600"}`
              : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
          }`}
        >
          {label}
        </label>
        {rightSlot && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-500">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

function LoginPage({
  initialRole = "student",
  onLogin = () => {},
  onSwitchToSignup = () => {},
  onBack = () => {},
}) {
  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const roleAccent = role === "student" ? "indigo" : "violet";
  const helperText =
    role === "student"
      ? "Signing in as a student — pick up right where you left off with your doubts."
      : "Signing in as a teacher — manage your tests and track student performance.";

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 6) next.password = "Password must be at least 6 characters.";
    return next;
  };

  const handleSubmit = async () => {
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      const { user } = await api.login({ email, password, role });
      setSubmitting(false);
      onLogin({ role: user.role, email: user.email, user });
    } catch (err) {
      setSubmitting(false);
      setErrors({ password: err.message || "Login failed. Check your credentials." });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white flex items-center justify-center px-6 py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 40%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-100 via-violet-100 to-indigo-100 opacity-40 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Back + logo */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
              <span className="text-xs font-semibold text-white">E</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">EduBridge</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
            <p className="mt-1.5 text-sm text-slate-500">Sign in to continue to EduBridge</p>
          </div>

          {/* Role segmented toggle */}
          <div className="relative mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
            <div
              className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-lg bg-white shadow-sm transition-transform duration-300 ease-out ${
                role === "teacher" ? "translate-x-[calc(100%+8px)]" : "translate-x-0"
              }`}
            />
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`relative z-10 flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors ${
                role === "student" ? "text-indigo-700" : "text-slate-500"
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole("teacher")}
              className={`relative z-10 flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors ${
                role === "teacher" ? "text-violet-700" : "text-slate-500"
              }`}
            >
              <Presentation className="h-4 w-4" />
              Teacher
            </button>
          </div>

          <p
            className={`mb-6 rounded-lg px-3 py-2 text-center text-xs leading-relaxed transition-colors ${
              role === "student" ? "bg-indigo-50 text-indigo-700" : "bg-violet-50 text-violet-700"
            }`}
          >
            {helperText}
          </p>

          {/* Fields */}
          <div className="space-y-4">
            <FloatingInput
              id="email"
              label="Email address"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((er) => ({ ...er, email: undefined }));
              }}
              error={errors.email}
            />
            <FloatingInput
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              icon={Lock}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((er) => ({ ...er, password: undefined }));
              }}
              error={errors.password}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-slate-400 transition-colors hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              className={`text-xs font-medium transition-colors ${
                role === "student" ? "text-slate-400 hover:text-indigo-600" : "text-slate-400 hover:text-violet-600"
              }`}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className={`mt-6 flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:hover:scale-100 ${
              role === "student"
                ? "bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400"
                : "bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400"
            }`}
          >
            {submitting ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            className="font-medium text-indigo-600 transition-colors hover:text-indigo-700"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
/* ============================================================ */
/*  3. Student registration                                      */
/* ============================================================ */

function FloatingField({ id, label, type = "text", value, onChange, icon: Icon, options }) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || (value && value.length > 0);

  const baseInput =
    "peer w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 pt-5 pb-2 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100";

  return (
    <div className="relative">
      <Icon
        className={`pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 transition-colors ${
          focused ? "text-indigo-500" : "text-slate-400"
        }`}
        strokeWidth={1.75}
      />

      {options ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseInput} appearance-none cursor-pointer`}
        >
          <option value="" disabled hidden></option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          className={baseInput}
        />
      )}

      <label
        htmlFor={id}
        className={`absolute left-11 transition-all duration-150 ${
          isFloating
            ? "top-2.5 text-[11px] font-medium text-indigo-600"
            : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
        }`}
      >
        {label}
      </label>

      {options && (
        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      )}
    </div>
  );
}

function StudentRegistration({ onSubmit = () => {} }) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    gmail: "",
    password: "",
    standard: "",
    domain: "",
  });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const standards = ["8th", "9th", "10th", "11th", "12th", "Diploma", "Undergraduate"];
  const domains = ["Science (PCM)", "Science (PCB)", "Commerce", "Arts", "Engineering", "Other"];

  const isComplete = Object.values(form).every((v) => v.length > 0);

  const handleCreateAccount = async () => {
    setError("");
    setSubmitting(true);
    try {
      const { user } = await api.signup({
        name: form.name,
        email: form.gmail,
        password: form.password,
        standard: form.standard,
        stream: form.domain,
      });
      setSubmitting(false);
      onSubmit({ ...form, user });
    } catch (err) {
      setSubmitting(false);
      setError(err.message || "Could not create account.");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white flex items-center justify-center px-6 py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 40%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-100 via-violet-100 to-indigo-100 opacity-40 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
            <GraduationCap className="h-5.5 w-5.5 text-indigo-600" strokeWidth={1.75} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Let's personalize your learning
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            A few details so EduBridge can tailor every answer to you.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="space-y-4">
            <FloatingField id="name" label="Full name" icon={User} value={form.name} onChange={update("name")} />
            <FloatingField id="gmail" label="Gmail" type="email" icon={Mail} value={form.gmail} onChange={update("gmail")} />

            <div className="relative">
              <FloatingField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                icon={Lock}
                value={form.password}
                onChange={update("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <FloatingField
              id="standard"
              label="Standard"
              icon={Layers}
              value={form.standard}
              onChange={update("standard")}
              options={standards}
            />
            <FloatingField
              id="domain"
              label="Domain"
              icon={GraduationCap}
              value={form.domain}
              onChange={update("domain")}
              options={domains}
            />
          </div>

          {error && (
            <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-rose-500">
              <AlertCircle className="h-3.5 w-3.5" />
              {error}
            </p>
          )}

          <button
            type="button"
            disabled={!isComplete || submitting}
            onClick={handleCreateAccount}
            className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Signing up as a teacher instead?{" "}
          <span className="font-medium text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors">
            Switch role
          </span>
        </p>
      </div>
    </div>
  );
}
/* ============================================================ */
/*  3b. Teacher registration                                     */
/* ============================================================ */

function TeacherRegistration({ onSubmit = () => {} }) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    subject: "",
    standard: "",
  });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const subjects = ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science"];
  const standards = ["Class 9", "Class 10", "Class 11", "Class 12", "Class 9 - 10", "Class 11 - 12"];

  const isComplete = Object.values(form).every((v) => v.length > 0);

  const handleCreateAccount = async () => {
    setError("");
    setSubmitting(true);
    try {
      const { user } = await api.signup({
        name: form.name,
        email: form.email,
        password: form.password,
        role: "teacher",
        subject: form.subject,
        standard: form.standard,
      });
      setSubmitting(false);
      onSubmit({ ...form, user });
    } catch (err) {
      setSubmitting(false);
      setError(err.message || "Could not create account.");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white flex items-center justify-center px-6 py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 40%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-100 via-indigo-100 to-violet-100 opacity-40 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
            <Presentation className="h-5.5 w-5.5 text-violet-600" strokeWidth={1.75} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Set up your teacher account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Create tests, answer doubts, and build your rating on EduBridge.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="space-y-4">
            <FloatingField id="t-name" label="Full name" icon={User} value={form.name} onChange={update("name")} />
            <FloatingField id="t-email" label="Email" type="email" icon={Mail} value={form.email} onChange={update("email")} />

            <div className="relative">
              <FloatingField
                id="t-password"
                label="Password"
                type={showPassword ? "text" : "password"}
                icon={Lock}
                value={form.password}
                onChange={update("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <FloatingField
              id="t-subject"
              label="Subject you teach"
              icon={BookOpen}
              value={form.subject}
              onChange={update("subject")}
              options={subjects}
            />
            <FloatingField
              id="t-standard"
              label="Standard you teach"
              icon={Layers}
              value={form.standard}
              onChange={update("standard")}
              options={standards}
            />
          </div>

          {error && (
            <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-rose-500">
              <AlertCircle className="h-3.5 w-3.5" />
              {error}
            </p>
          )}

          <button
            type="button"
            disabled={!isComplete || submitting}
            onClick={handleCreateAccount}
            className="mt-6 w-full rounded-xl bg-violet-600 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            {submitting ? "Creating account..." : "Create teacher account"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  4. Doubt chat (student home)                                 */
/* ============================================================ */

const HISTORY = {
  Today: [
    { id: 1, title: "What is a linked list?" },
    { id: 2, title: "Difference between stack and queue" },
  ],
  "Previous 7 Days": [
    { id: 3, title: "Explain Newton's second law" },
    { id: 4, title: "How does photosynthesis work" },
    { id: 5, title: "Balancing redox reactions" },
  ],
};

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "user",
    text: "What is a linked list and how is it different from an array?",
  },
  {
    id: 2,
    role: "ai",
    text:
      "A linked list is a linear data structure where each element, called a node, stores its value and a pointer to the next node. Unlike an array, its elements aren't stored in contiguous memory, so insertion and deletion don't require shifting other elements — you just relink pointers.\n\nArrays give you O(1) random access by index but O(n) insertion in the middle. Linked lists flip that: O(n) access but O(1) insertion once you're at the right node.",
    sources: ["NCERT Class 11 CS, Ch. 4", "Open DSA Handbook, §2.1"],
  },
];

function ChatSidebar({ collapsed, onToggle, onNewChat }) {
  return (
    <aside
      className={`relative flex h-full flex-col border-r border-slate-200 bg-slate-50 transition-all duration-300 ${
        collapsed ? "w-0" : "w-72"
      }`}
    >
      <div className={`flex h-full flex-col overflow-hidden ${collapsed ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}>
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
              <span className="text-xs font-semibold text-white">E</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">EduBridge</span>
          </div>
          <button
            onClick={onToggle}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </div>

        <div className="px-3">
          <button
            onClick={onNewChat}
            className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-indigo-300 hover:text-indigo-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New chat
          </button>
        </div>

        <div className="mt-5 flex-1 overflow-y-auto px-3 pb-4">
          {Object.entries(HISTORY).map(([group, items]) => (
            <div key={group} className="mb-5">
              <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                {group}
              </p>
              <div className="space-y-0.5">
                {items.map((item, idx) => (
                  <button
                    key={item.id}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                      group === "Today" && idx === 0
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0 opacity-60" />
                    <span className="truncate">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
              SL
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-800">Sanskar</p>
              <p className="truncate text-xs text-slate-400">Standard 12 · Engineering</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Message({ message }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%] rounded-2xl rounded-br-md bg-indigo-600 px-4 py-3 text-[15px] leading-relaxed text-white shadow-sm">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
        <Sparkles className="h-4 w-4 text-indigo-600" strokeWidth={1.75} />
      </div>
      <div className="max-w-[80%] space-y-3">
        <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] leading-relaxed text-slate-800 whitespace-pre-line">
          {message.text}
        </div>
        {message.sources && (
          <div className="flex flex-wrap gap-1.5 pl-1">
            {message.sources.map((src, i) => (
              <span
                key={i}
                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-500"
              >
                {i + 1}. {src}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DoubtChatPage({ onPractice = () => {} }) {
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const textareaRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: Date.now(), role: "user", text }]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    setThinking(true);
    try {
      const reply = await api.chat(text);
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: "ai", text: reply.text, sources: reply.sources },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: "ai",
          text: "I couldn't reach the EduBridge backend just now. Make sure the backend server is running on port 4000.",
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const autoGrow = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  const doubtCount = messages.filter((m) => m.role === "user").length;

  return (
    <div className="flex h-screen w-full bg-white">
      <ChatSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} onNewChat={() => setMessages([])} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 px-4">
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Linked Lists — Doubt Chat</span>
          </div>
          <div className="ml-auto flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
            {doubtCount} doubt{doubtCount !== 1 ? "s" : ""} in this chat
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl space-y-6 px-6 py-8">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Message message={m} />
              </motion.div>
            ))}
            {thinking && (
              <div className="flex justify-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                  <Sparkles className="h-4 w-4 text-indigo-600" strokeWidth={1.75} />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </main>

        {/* Input area */}
        <div className="shrink-0 border-t border-slate-200 bg-white px-6 py-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-2.5 flex justify-end">
              <button
                onClick={onPractice}
                className="flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 shadow-sm transition-colors hover:bg-violet-100 hover:border-violet-300"
              >
                <BookOpenCheck className="h-3.5 w-3.5" strokeWidth={2} />
                Practice
              </button>
            </div>

            <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition-colors focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={autoGrow}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Type your doubt here..."
                className="max-h-40 flex-1 resize-none bg-transparent px-3 py-2 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || thinking}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                <SendHorizontal className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-400">
              EduBridge grounds answers in open textbooks — always check citations for critical work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  4b. Public Doubt Board — students ask, any teacher can answer */
/* ============================================================ */

function AnswerCard({ answer, doubtId, likerId, onLiked }) {
  const [liking, setLiking] = useState(false);
  const [likes, setLikes] = useState(answer.likes || 0);
  const [liked, setLiked] = useState((answer.likedBy || []).includes(likerId));

  const handleLike = async () => {
    if (liking) return;
    setLiking(true);
    const optimisticLiked = !liked;
    setLiked(optimisticLiked);
    setLikes((n) => (optimisticLiked ? n + 1 : Math.max(0, n - 1)));
    try {
      const { doubt: updated, liked: nowLiked } = await api.likeAnswer(doubtId, answer.id, likerId);
      const fresh = updated.answers.find((a) => a.id === answer.id);
      if (fresh) {
        setLikes(fresh.likes);
        setLiked(nowLiked);
      }
      onLiked?.();
    } catch {
      setLiked(!optimisticLiked);
      setLikes((n) => (optimisticLiked ? Math.max(0, n - 1) : n + 1));
    } finally {
      setLiking(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-100 text-[10px] font-semibold text-violet-700">
          {answer.teacherInitials}
        </div>
        <span className="text-xs font-semibold text-slate-700">{answer.teacherName}</span>
        <span className="text-[11px] text-slate-400">· Teacher</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{answer.text}</p>
      <button
        onClick={handleLike}
        disabled={liking}
        className={`mt-2.5 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
          liked
            ? "border-indigo-200 bg-indigo-50 text-indigo-700"
            : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
        }`}
      >
        <ThumbsUp className={`h-3.5 w-3.5 ${liked ? "fill-indigo-600 text-indigo-600" : ""}`} />
        {likes}
      </button>
    </div>
  );
}

function AskAnswerBox({ doubtId, teacher, onPosted }) {
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  const handlePost = async () => {
    if (!text.trim() || posting) return;
    setPosting(true);
    try {
      const { doubt } = await api.postAnswer(doubtId, {
        teacherId: teacher.teacherId,
        teacherName: teacher.name,
        teacherInitials: teacher.initials,
        text,
      });
      setText("");
      onPosted?.(doubt);
    } catch {
      /* leave text as-is so the teacher can retry */
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="flex items-end gap-2 rounded-xl border border-slate-200 bg-white p-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={1}
        placeholder="Write an answer for this student..."
        className="max-h-32 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none"
      />
      <button
        onClick={handlePost}
        disabled={!text.trim() || posting}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
      >
        {posting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      </button>
    </div>
  );
}

function DoubtCard({ doubt, likerId, mode, teacher, onChanged }) {
  const [showAnswerBox, setShowAnswerBox] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700">
          {doubt.subject}
        </span>
        {doubt.chapter && (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
            {doubt.chapter}
          </span>
        )}
        <span className="ml-auto text-[11px] text-slate-400">{doubt.studentName}</span>
      </div>
      <p className="mt-2.5 text-[15px] font-medium leading-snug text-slate-900">{doubt.questionText}</p>

      {doubt.answers.length > 0 && (
        <div className="mt-3 space-y-2.5">
          {doubt.answers.map((a) => (
            <AnswerCard key={a.id} answer={a} doubtId={doubt.id} likerId={likerId} onLiked={onChanged} />
          ))}
        </div>
      )}

      {mode === "teacher" && (
        <div className="mt-3">
          {showAnswerBox ? (
            <AskAnswerBox
              doubtId={doubt.id}
              teacher={teacher}
              onPosted={(updated) => {
                setShowAnswerBox(false);
                onChanged?.(updated);
              }}
            />
          ) : (
            <button
              onClick={() => setShowAnswerBox(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-violet-700 hover:text-violet-800"
            >
              <MessagesSquare className="h-3.5 w-3.5" />
              Answer this doubt
            </button>
          )}
        </div>
      )}

      {mode === "student" && doubt.answers.length === 0 && (
        <p className="mt-3 text-xs text-slate-400">No teacher has answered yet — check back soon.</p>
      )}
    </div>
  );
}

function PublicDoubtBoard({ student, onBack }) {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [question, setQuestion] = useState("");
  const [posting, setPosting] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);

  const load = () => {
    setLoading(true);
    api
      .listDoubts()
      .then(({ doubts }) => setDoubts(doubts))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const availableChapters = subject ? CHAPTERS_BY_SUBJECT[subject] || [] : [];
  const canPost = subject && question.trim();

  const handlePost = async () => {
    if (!canPost || posting) return;
    setPosting(true);
    try {
      const { doubt } = await api.postDoubt({
        studentId: student?.id,
        studentName: student?.name || "Student",
        subject,
        chapter,
        questionText: question,
      });
      setDoubts((ds) => [doubt, ...ds]);
      setQuestion("");
      setChapter("");
      setComposerOpen(false);
    } catch {
      /* keep composer open so student can retry */
    } finally {
      setPosting(false);
    }
  };

  const likerId = student?.id || "anon";

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Ask Teachers</h1>
            <p className="mt-1 text-sm text-slate-400">
              Post a doubt publicly — any teacher on EduBridge can answer it.
            </p>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          {composerOpen ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Dropdown
                  label="Subject"
                  value={subject}
                  onChange={(v) => {
                    setSubject(v);
                    setChapter("");
                  }}
                  options={SUBJECTS}
                  placeholder="Select subject"
                />
                <Dropdown
                  label="Chapter (optional)"
                  value={chapter}
                  onChange={setChapter}
                  options={availableChapters}
                  disabled={!subject}
                  placeholder={subject ? "Select chapter" : "Pick subject first"}
                />
              </div>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                placeholder="Type your doubt in detail..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setComposerOpen(false)}
                  className="rounded-xl px-3.5 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePost}
                  disabled={!canPost || posting}
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                  {posting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Post doubt
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setComposerOpen(true)}
              className="flex w-full items-center gap-2 rounded-xl border border-dashed border-slate-200 px-3.5 py-3 text-sm font-medium text-slate-400 transition-colors hover:border-indigo-300 hover:text-indigo-600"
            >
              <Plus className="h-4 w-4" />
              Ask a new doubt
            </button>
          )}
        </div>

        <div className="mt-6 space-y-4">
          {loading ? (
            [0, 1].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl border border-slate-100 bg-slate-100/60" />
            ))
          ) : doubts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 py-12 text-center">
              <p className="text-sm text-slate-400">No doubts posted yet — be the first to ask one.</p>
            </div>
          ) : (
            doubts.map((d) => (
              <DoubtCard
                key={d.id}
                doubt={d}
                likerId={likerId}
                mode="student"
                onChanged={load}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  5. Practice flow                                              */
/* ============================================================ */

const PRACTICE_QUESTIONS = [
  {
    id: 1,
    prompt: "What does each node in a singly linked list store?",
    options: [
      "Only its value",
      "Its value and a pointer to the next node",
      "Its value and pointers to both neighbors",
      "Only a pointer to the next node",
    ],
    correct: 1,
    explanation:
      "A node's job is to hold data and know where the next one lives. Storing 'only its value' loses the chain entirely, and pointers to both neighbors describes a doubly linked list, not a singly linked one.",
  },
  {
    id: 2,
    prompt: "What is the time complexity of inserting a node at the head of a linked list?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correct: 0,
    explanation:
      "Inserting at the head only means creating a new node and pointing it at the current head — no traversal needed, so it's constant time. O(n) is what you'd get inserting at the tail without a tail pointer.",
  },
  {
    id: 3,
    prompt: "Why can't linked lists use binary search efficiently?",
    options: [
      "They aren't sorted",
      "They lack constant-time random access",
      "They don't store values",
      "They are always circular",
    ],
    correct: 1,
    explanation:
      "Binary search needs to jump straight to the middle element, which requires O(1) indexing like an array has. A linked list has to walk node-by-node to reach the middle, so each 'jump' costs O(n) — killing the benefit of binary search.",
  },
  {
    id: 4,
    prompt: "What happens to the 'next' pointer of the last node in a singly linked list?",
    options: ["Points to the head", "Points to itself", "Set to null", "Undefined"],
    correct: 2,
    explanation:
      "Setting the last node's pointer to null is what marks the end of the list — it's how traversal code knows to stop. Pointing back to the head would make it circular, which is a different structure entirely.",
  },
  {
    id: 5,
    prompt: "Compared to arrays, linked lists trade away fast random access for:",
    options: [
      "Faster sorting",
      "Cheaper insertion/deletion without shifting elements",
      "Lower memory use",
      "Built-in indexing",
    ],
    correct: 1,
    explanation:
      "Since nodes aren't stored contiguously, inserting or removing one just means relinking a couple of pointers — no shifting the rest of the elements like an array requires. That flexibility is the whole trade-off, and it actually costs slightly more memory per element, not less.",
  },
];

function FadeSlide({ children, animKey }) {
  return (
    <motion.div
      key={animKey}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function QuizView({ onFinish, onExit }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const question = PRACTICE_QUESTIONS[index];
  const total = PRACTICE_QUESTIONS.length;
  const progress = ((index + 1) / total) * 100;
  const isLast = index === total - 1;
  const selected = answers[question.id];

  const selectOption = (optIdx) => setAnswers((a) => ({ ...a, [question.id]: optIdx }));

  const handleNext = () => {
    if (isLast) {
      onFinish(answers);
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to chat
        </button>
        <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
          Question {index + 1} of {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-10 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <FadeSlide animKey={index}>
        <h2 className="mb-8 text-xl font-semibold leading-relaxed text-slate-900 sm:text-2xl">
          {question.prompt}
        </h2>

        <div className="space-y-3">
          {question.options.map((opt, i) => {
            const isSelected = selected === i;
            return (
              <button
                key={i}
                onClick={() => selectOption(i)}
                className={`flex w-full items-center gap-3.5 rounded-xl border px-4 py-3.5 text-left text-[15px] transition-all duration-200 ${
                  isSelected
                    ? "border-indigo-400 bg-indigo-50 text-indigo-900 shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    isSelected ? "border-indigo-500" : "border-slate-300"
                  }`}
                >
                  {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </FadeSlide>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-0"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={selected === undefined}
          className={`flex items-center gap-1.5 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 ${
            isLast ? "bg-violet-600 hover:bg-violet-700" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isLast ? "Submit" : "Next"}
          {!isLast && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function PracticeResultsView({ answers, onRetry, onExit }) {
  const [showFlaws, setShowFlaws] = useState(false);
  const reviewRef = useRef(null);
  const total = PRACTICE_QUESTIONS.length;
  const correctCount = PRACTICE_QUESTIONS.filter((q) => answers[q.id] === q.correct).length;
  const wrongCount = total - correctCount;
  const accuracy = Math.round((correctCount / total) * 100);

  const handleAnalyseFlaws = () => {
    setShowFlaws((s) => !s);
    if (!showFlaws) {
      setTimeout(() => reviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  };

  const donutData = [
    { name: "Correct", value: correctCount },
    { name: "Wrong", value: wrongCount },
  ];
  const COLORS = ["#4f46e5", "#e2e8f0"];

  const barData = PRACTICE_QUESTIONS.map((q, i) => ({
    name: `Q${i + 1}`,
    result: answers[q.id] === q.correct ? 1 : 0,
  }));

  const stats = [
    { label: "Total questions", value: total },
    { label: "Correct", value: correctCount },
    { label: "Wrong", value: wrongCount },
    { label: "Score", value: `${correctCount}/${total}` },
  ];

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-6 py-10">
      <FadeSlide animKey="results">
        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
            <Trophy className="h-6 w-6 text-indigo-600" strokeWidth={1.75} />
          </div>
          <p className="text-sm font-medium text-slate-400">Practice complete</p>
          <h1 className="mt-1 text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
            {accuracy}
            <span className="text-3xl text-slate-400 sm:text-4xl">%</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">accuracy across {total} questions</p>
        </div>

        {/* Chart + stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-5">
          <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm font-semibold text-slate-700">Accuracy</p>
            <div className="relative mx-auto h-44 w-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    dataKey="value"
                    innerRadius={58}
                    outerRadius={78}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={correctCount && wrongCount ? 3 : 0}
                    stroke="none"
                  >
                    {donutData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-900">{accuracy}%</span>
                <span className="text-[11px] text-slate-400">accuracy</span>
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-5 text-xs">
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="h-2 w-2 rounded-full bg-indigo-600" /> Correct
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="h-2 w-2 rounded-full bg-slate-200" /> Wrong
              </span>
            </div>
          </div>

          <div className="sm:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm font-semibold text-slate-700">Question breakdown</p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={barData} barSize={28}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis hide domain={[0, 1]} />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  formatter={(v) => (v === 1 ? "Correct" : "Wrong")}
                  labelStyle={{ color: "#334155", fontWeight: 600 }}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                />
                <Bar dataKey="result" radius={[6, 6, 6, 6]}>
                  {barData.map((d, i) => (
                    <Cell key={i} fill={d.result === 1 ? "#4f46e5" : "#e2e8f0"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-3 grid grid-cols-4 gap-3 border-t border-slate-100 pt-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-lg font-semibold text-slate-900">{s.value}</p>
                  <p className="text-[11px] leading-tight text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Answer review */}
        <div ref={reviewRef} className="mt-8 space-y-3 scroll-mt-8">
          {PRACTICE_QUESTIONS.map((q, i) => {
            const isCorrect = answers[q.id] === q.correct;
            const userAnswer = answers[q.id];
            const expanded = showFlaws && !isCorrect;

            return (
              <div
                key={q.id}
                className={`overflow-hidden rounded-xl border bg-white transition-colors duration-300 ${
                  expanded ? "border-amber-200" : "border-slate-200"
                }`}
              >
                <div className="flex items-start gap-3 p-4">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      isCorrect ? "bg-indigo-100 text-indigo-600" : "bg-rose-50 text-rose-500"
                    }`}
                  >
                    {isCorrect ? (
                      <Check className="h-3 w-3" strokeWidth={3} />
                    ) : (
                      <X className="h-3 w-3" strokeWidth={3} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-700">{q.prompt}</p>
                    {isCorrect ? (
                      <p className="mt-1 text-xs text-slate-400">
                        Correct answer:{" "}
                        <span className="font-medium text-slate-600">{q.options[q.correct]}</span>
                      </p>
                    ) : (
                      <p className="mt-1 text-xs text-slate-400">
                        Your answer:{" "}
                        <span className="font-medium text-rose-500">{q.options[userAnswer]}</span>
                        {" · "}Correct:{" "}
                        <span className="font-medium text-indigo-600">{q.options[q.correct]}</span>
                      </p>
                    )}
                  </div>
                </div>

                {!isCorrect && (
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{
                      gridTemplateRows: expanded ? "1fr" : "0fr",
                      opacity: expanded ? 1 : 0,
                      transitionDelay: expanded ? `${i * 60}ms` : "0ms",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="mx-4 mb-4 flex gap-2.5 rounded-lg border border-amber-100 bg-amber-50 p-3.5">
                        <Info className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" strokeWidth={2} />
                        <div>
                          <p className="text-xs font-semibold text-amber-800">Why this went wrong</p>
                          <p className="mt-1 text-sm leading-relaxed text-amber-900/80">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row">
            <button
              onClick={onExit}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              <MessageSquare className="h-4 w-4" />
              Back to chat
            </button>
            <button
              onClick={handleAnalyseFlaws}
              disabled={wrongCount === 0}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              {showFlaws ? <ChevronUp className="h-4 w-4" /> : <Lightbulb className="h-4 w-4" />}
              {showFlaws ? "Hide analysis" : wrongCount === 0 ? "No flaws to analyse" : "Analyse flaws"}
            </button>
          </div>

          <button
            onClick={onRetry}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-violet-600"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Practice again
          </button>
        </div>
      </FadeSlide>
    </div>
  );
}

function PracticeFlow({ onExit = () => {} }) {
  const [view, setView] = useState("quiz");
  const [finalAnswers, setFinalAnswers] = useState({});
  const [runId, setRunId] = useState(0);

  const handleFinish = (answers) => {
    setFinalAnswers(answers);
    setView("results");
  };

  const handleRetry = () => {
    setRunId((r) => r + 1);
    setView("quiz");
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <FadeSlide animKey={view + runId}>
        {view === "quiz" ? (
          <QuizView key={runId} onFinish={handleFinish} onExit={onExit} />
        ) : (
          <PracticeResultsView answers={finalAnswers} onRetry={handleRetry} onExit={onExit} />
        )}
      </FadeSlide>
    </div>
  );
}
/* ============================================================ */
/*  6. TeachHub                                                   */
/* ============================================================ */

const TEACHERS = [
  {
    id: "t1",
    name: "Ananya Rao",
    subject: "Physics",
    standard: "Class 11 – 12",
    initials: "AR",
    students: 482,
    tests: [
      { id: "test1", code: "PHY201", title: "Laws of Motion — Unit Test", questions: 20, duration: 30, status: "live" },
      { id: "test2", code: "PHY198", title: "Work, Energy & Power", questions: 15, duration: 25, status: "closed" },
      { id: "test3", code: "PHY210", title: "Rotational Dynamics — Quick Check", questions: 10, duration: 15, status: "live" },
    ],
  },
  {
    id: "t2",
    name: "Karan Mehta",
    subject: "Mathematics",
    standard: "Class 9 – 10",
    initials: "KM",
    students: 610,
    tests: [
      { id: "test4", code: "MAT045", title: "Quadratic Equations", questions: 18, duration: 30, status: "live" },
      { id: "test5", code: "MAT039", title: "Coordinate Geometry Basics", questions: 12, duration: 20, status: "closed" },
    ],
  },
  {
    id: "t3",
    name: "Sara Iyer",
    subject: "Computer Science",
    standard: "Class 11 – 12",
    initials: "SI",
    students: 355,
    tests: [
      { id: "test6", code: "CSC112", title: "Linked Lists Deep Dive", questions: 5, duration: 10, status: "live" },
    ],
  },
];

function findTestByCode(code) {
  const clean = code.trim().toUpperCase();
  for (const teacher of TEACHERS) {
    const test = teacher.tests.find((t) => t.code === clean);
    if (test) return { teacher, test };
  }
  return null;
}

// Generic question bank used for any live test in this mock flow
const TEACHHUB_QUESTIONS = [
  {
    id: 1,
    prompt: "What does each node in a singly linked list store?",
    options: [
      "Only its value",
      "Its value and a pointer to the next node",
      "Its value and pointers to both neighbors",
      "Only a pointer to the next node",
    ],
    correct: 1,
    explanation:
      "A node's job is to hold data and know where the next one lives. Storing 'only its value' loses the chain entirely, and pointers to both neighbors describes a doubly linked list, not a singly linked one.",
  },
  {
    id: 2,
    prompt: "What is the time complexity of inserting a node at the head of a linked list?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correct: 0,
    explanation:
      "Inserting at the head only means creating a new node and pointing it at the current head — no traversal needed, so it's constant time. O(n) is what you'd get inserting at the tail without a tail pointer.",
  },
  {
    id: 3,
    prompt: "Why can't linked lists use binary search efficiently?",
    options: [
      "They aren't sorted",
      "They lack constant-time random access",
      "They don't store values",
      "They are always circular",
    ],
    correct: 1,
    explanation:
      "Binary search needs to jump straight to the middle element, which requires O(1) indexing like an array has. A linked list has to walk node-by-node to reach the middle, so each 'jump' costs O(n).",
  },
  {
    id: 4,
    prompt: "What happens to the 'next' pointer of the last node in a singly linked list?",
    options: ["Points to the head", "Points to itself", "Set to null", "Undefined"],
    correct: 2,
    explanation:
      "Setting the last node's pointer to null is what marks the end of the list — it's how traversal code knows to stop. Pointing back to the head would make it circular, a different structure entirely.",
  },
  {
    id: 5,
    prompt: "Compared to arrays, linked lists trade away fast random access for:",
    options: [
      "Faster sorting",
      "Cheaper insertion/deletion without shifting elements",
      "Lower memory use",
      "Built-in indexing",
    ],
    correct: 1,
    explanation:
      "Since nodes aren't stored contiguously, inserting or removing one just means relinking a couple of pointers — no shifting the rest of the elements like an array requires.",
  },
];

/* ------------------------------------------------------------------ */
/*  Shared                                                             */
/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
/*  1. Search bar                                                      */
/* ------------------------------------------------------------------ */

function SearchBar({ value, onChange, onOpenCodeEntry }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm transition-shadow focus-within:shadow-md focus-within:border-slate-300">
        <Search className="h-4.5 w-4.5 shrink-0 text-slate-400" strokeWidth={2} />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search teachers by name or subject…"
          className="w-full bg-transparent text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />
      </div>
      <div className="mt-3 flex justify-center">
        <button
          onClick={onOpenCodeEntry}
          className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-500 shadow-sm transition-colors hover:border-indigo-200 hover:text-indigo-600"
        >
          <KeyRound className="h-3.5 w-3.5" />
          Already have a test code?
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Teacher search results + profile card                          */
/* ------------------------------------------------------------------ */

function TeacherResultCard({ teacher, onSelect }) {
  const liveCount = teacher.tests.filter((t) => t.status === "live").length;
  return (
    <button
      onClick={() => onSelect(teacher)}
      className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:border-slate-300 hover:shadow-lg"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-semibold text-indigo-700">
        {teacher.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-slate-900">{teacher.name}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
          <GraduationCap className="h-3.5 w-3.5" />
          {teacher.subject} · {teacher.standard}
        </p>
      </div>
      {teacher.rating > 0 && (
        <span className="flex shrink-0 items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-1 text-[11px] font-semibold text-violet-700">
          <ThumbsUp className="h-3 w-3" />
          {teacher.rating}
        </span>
      )}
      {liveCount > 0 && (
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          {liveCount} live
        </span>
      )}
      <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
    </button>
  );
}

function TeacherSearchResults({ query, teachers, loading, onSelect }) {
  const filtered = (teachers || []).filter((t) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q);
  });

  if (loading) {
    return (
      <div className="mx-auto mt-8 max-w-2xl space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl border border-slate-100 bg-slate-100/60" />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 max-w-2xl space-y-3">
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 py-12 text-center">
          <p className="text-sm text-slate-400">No teachers match "{query}"</p>
        </div>
      ) : (
        filtered.map((t) => (
          <motion.div
            key={t.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <TeacherResultCard teacher={t} onSelect={onSelect} />
          </motion.div>
        ))
      )}
    </div>
  );
}

function TestTile({ test, onStart }) {
  const isLive = test.status === "live";
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border p-5 shadow-sm transition-all duration-300 ease-in-out ${
        isLive ? "border-slate-200 bg-white hover:scale-105 hover:border-slate-300 hover:shadow-lg" : "border-slate-100 bg-slate-50/60"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <p className={`text-[15px] font-semibold leading-snug ${isLive ? "text-slate-900" : "text-slate-400"}`}>
            {test.title}
          </p>
          {isLive ? (
            <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10.5px] font-semibold text-emerald-700">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Live Now
            </span>
          ) : (
            <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10.5px] font-semibold text-slate-400">
              Closed
            </span>
          )}
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Hash className="h-3.5 w-3.5" />
            {test.questions} questions
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {test.duration} min
          </span>
        </div>
      </div>

      <button
        onClick={() => isLive && onStart(test)}
        disabled={!isLive}
        className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
      >
        {isLive ? "Start Test" : "Not available"}
        {isLive && <ArrowRight className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

function TeacherProfile({ teacher, onBack, onStartTest }) {
  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to search
      </button>

      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-semibold text-indigo-700">
          {teacher.initials}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-semibold text-slate-900">{teacher.name}</h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
              {teacher.subject}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-500">
              {teacher.standard}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Users className="h-3.5 w-3.5" />
              {teacher.students} students
            </span>
            {teacher.rating > 0 && (
              <span className="flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700">
                <ThumbsUp className="h-3.5 w-3.5" />
                {teacher.rating} rating
              </span>
            )}
            {teacher.rank && (
              <span className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                <Award className="h-3.5 w-3.5" />
                Rank #{teacher.rank}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="mb-3 mt-8 text-sm font-semibold text-slate-700">Published tests</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {teacher.tests.map((test) => (
          <TestTile key={test.id} test={test} onStart={(t) => onStartTest(teacher, t)} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. No-login test entry modal                                      */
/* ------------------------------------------------------------------ */

function TestEntryModal({ prefill, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState(prefill?.test?.code ?? "");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const codeLocked = Boolean(prefill?.test);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!code.trim()) {
      setError("Please enter a test code.");
      return;
    }

    setSubmitting(true);
    try {
      const { teacher, test } = await api.joinTest(code, name.trim());
      setSubmitting(false);
      onSubmit({ teacher, test, name: name.trim() });
    } catch (err) {
      setSubmitting(false);
      setError(err.message || "Could not join that test.");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <motion.div
        className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Join test</h2>
            <p className="mt-0.5 text-sm text-slate-400">No account needed — just your name.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {prefill?.test && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-xs font-semibold text-indigo-700">
              {prefill.teacher.initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-800">{prefill.test.title}</p>
              <p className="text-xs text-slate-400">{prefill.teacher.name}</p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Name</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="e.g. Priya Sharma"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-[15px] text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Test code</label>
            <input
              value={code}
              disabled={codeLocked}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError("");
              }}
              placeholder="e.g. PHY201"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-[15px] uppercase tracking-wide text-slate-800 placeholder:text-slate-400 placeholder:normal-case focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>

          {error && <p className="text-xs font-medium text-rose-500">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
          >
            <LogIn className="h-4 w-4" />
            {submitting ? "Joining..." : "Start Test"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Live test UI (distraction-free MCQ)                            */
/* ------------------------------------------------------------------ */

function LiveTestView({ test, teacher, studentName, onFinish, onExit }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const questions = test.questions;
  const question = questions[index % questions.length];
  const total = questions.length;
  const progress = ((index + 1) / total) * 100;
  const isLast = index === total - 1;
  const selected = answers[question.id];

  const selectOption = (optIdx) => setAnswers((a) => ({ ...a, [question.id]: optIdx }));

  const handleNext = () => {
    if (isLast) {
      onFinish(answers);
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Exit test
        </button>
        <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          <UserRound className="h-3.5 w-3.5" />
          {studentName}
        </span>
      </div>

      <div className="mb-8 text-center">
        <p className="text-sm font-medium text-slate-400">{teacher.name} · {teacher.subject}</p>
        <h1 className="mt-0.5 text-lg font-semibold text-slate-900">{test.title}</h1>
      </div>

      <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-400">
        <span>Question {index + 1} of {total}</span>
        <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-violet-700">
          Live
        </span>
      </div>
      <div className="mb-10 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <FadeSlide animKey={index}>
        <h2 className="mb-8 text-xl font-semibold leading-relaxed text-slate-900 sm:text-2xl">
          {question.prompt}
        </h2>

        <div className="space-y-3">
          {question.options.map((opt, i) => {
            const isSelected = selected === i;
            return (
              <button
                key={i}
                onClick={() => selectOption(i)}
                className={`flex w-full items-center gap-3.5 rounded-xl border px-4 py-3.5 text-left text-[15px] transition-all duration-200 ${
                  isSelected
                    ? "border-indigo-400 bg-indigo-50 text-indigo-900 shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    isSelected ? "border-indigo-500" : "border-slate-300"
                  }`}
                >
                  {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </FadeSlide>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-0"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={selected === undefined}
          className={`flex items-center gap-1.5 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 ${
            isLast ? "bg-violet-600 hover:bg-violet-700" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isLast ? "Submit" : "Next"}
          {!isLast && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Results (reused from Step 3, "Analyse flaws" hidden)            */
/* ------------------------------------------------------------------ */

function TeachHubResultsView({ result, onRetry, onExit, hideAnalyseFlaws = false }) {
  const [showFlaws, setShowFlaws] = useState(false);
  const reviewRef = useRef(null);
  const review = result?.review || [];
  const total = result?.total ?? review.length;
  const correctCount = result?.score ?? review.filter((q) => q.isCorrect).length;
  const wrongCount = total - correctCount;
  const accuracy = total ? Math.round((correctCount / total) * 100) : 0;

  const handleAnalyseFlaws = () => {
    setShowFlaws((s) => !s);
    if (!showFlaws) {
      setTimeout(() => reviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  };

  const donutData = [
    { name: "Correct", value: correctCount },
    { name: "Wrong", value: wrongCount },
  ];
  const COLORS = ["#4f46e5", "#e2e8f0"];

  const barData = review.map((q, i) => ({
    name: `Q${i + 1}`,
    result: q.isCorrect ? 1 : 0,
  }));

  const stats = [
    { label: "Total questions", value: total },
    { label: "Correct", value: correctCount },
    { label: "Wrong", value: wrongCount },
    { label: "Score", value: `${correctCount}/${total}` },
  ];

  // "Analyse flaws" hidden → expanded explanations are never shown in this flow
  const expandedAllowed = !hideAnalyseFlaws && showFlaws;

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-6 py-10">
      <FadeSlide animKey="results">
        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
            <Trophy className="h-6 w-6 text-indigo-600" strokeWidth={1.75} />
          </div>
          <p className="text-sm font-medium text-slate-400">Test complete</p>
          <h1 className="mt-1 text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
            {accuracy}
            <span className="text-3xl text-slate-400 sm:text-4xl">%</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">accuracy across {total} questions</p>
        </div>

        {/* Chart + stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-5">
          <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm font-semibold text-slate-700">Accuracy</p>
            <div className="relative mx-auto h-44 w-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    dataKey="value"
                    innerRadius={58}
                    outerRadius={78}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={correctCount && wrongCount ? 3 : 0}
                    stroke="none"
                  >
                    {donutData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-900">{accuracy}%</span>
                <span className="text-[11px] text-slate-400">accuracy</span>
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-5 text-xs">
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="h-2 w-2 rounded-full bg-indigo-600" /> Correct
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="h-2 w-2 rounded-full bg-slate-200" /> Wrong
              </span>
            </div>
          </div>

          <div className="sm:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm font-semibold text-slate-700">Question breakdown</p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={barData} barSize={28}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis hide domain={[0, 1]} />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  formatter={(v) => (v === 1 ? "Correct" : "Wrong")}
                  labelStyle={{ color: "#334155", fontWeight: 600 }}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                />
                <Bar dataKey="result" radius={[6, 6, 6, 6]}>
                  {barData.map((d, i) => (
                    <Cell key={i} fill={d.result === 1 ? "#4f46e5" : "#e2e8f0"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-3 grid grid-cols-4 gap-3 border-t border-slate-100 pt-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-lg font-semibold text-slate-900">{s.value}</p>
                  <p className="text-[11px] leading-tight text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Answer review */}
        <div ref={reviewRef} className="mt-8 space-y-3 scroll-mt-8">
          {review.map((q, i) => {
            const isCorrect = q.isCorrect;
            const userAnswer = q.userAnswer;
            const expanded = expandedAllowed && !isCorrect;

            return (
              <div
                key={q.id}
                className={`overflow-hidden rounded-xl border bg-white transition-colors duration-300 ${
                  expanded ? "border-amber-200" : "border-slate-200"
                }`}
              >
                <div className="flex items-start gap-3 p-4">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      isCorrect ? "bg-indigo-100 text-indigo-600" : "bg-rose-50 text-rose-500"
                    }`}
                  >
                    {isCorrect ? (
                      <Check className="h-3 w-3" strokeWidth={3} />
                    ) : (
                      <X className="h-3 w-3" strokeWidth={3} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-700">{q.prompt}</p>
                    {isCorrect ? (
                      <p className="mt-1 text-xs text-slate-400">
                        Correct answer:{" "}
                        <span className="font-medium text-slate-600">{q.options[q.correct]}</span>
                      </p>
                    ) : (
                      <p className="mt-1 text-xs text-slate-400">
                        Your answer:{" "}
                        <span className="font-medium text-rose-500">{q.options[userAnswer]}</span>
                        {" · "}Correct:{" "}
                        <span className="font-medium text-indigo-600">{q.options[q.correct]}</span>
                      </p>
                    )}
                  </div>
                </div>

                {!isCorrect && !hideAnalyseFlaws && (
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{
                      gridTemplateRows: expanded ? "1fr" : "0fr",
                      opacity: expanded ? 1 : 0,
                      transitionDelay: expanded ? `${i * 60}ms` : "0ms",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="mx-4 mb-4 flex gap-2.5 rounded-lg border border-amber-100 bg-amber-50 p-3.5">
                        <Info className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" strokeWidth={2} />
                        <div>
                          <p className="text-xs font-semibold text-amber-800">Why this went wrong</p>
                          <p className="mt-1 text-sm leading-relaxed text-amber-900/80">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row">
            <button
              onClick={onExit}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              <MessageSquare className="h-4 w-4" />
              Back to TeachHub
            </button>
            {!hideAnalyseFlaws && (
              <button
                onClick={handleAnalyseFlaws}
                disabled={wrongCount === 0}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                {showFlaws ? <ChevronUp className="h-4 w-4" /> : <Lightbulb className="h-4 w-4" />}
                {showFlaws ? "Hide analysis" : wrongCount === 0 ? "No flaws to analyse" : "Analyse flaws"}
              </button>
            )}
          </div>

          <button
            onClick={onRetry}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-violet-600"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Retake this test
          </button>
        </div>
      </FadeSlide>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Root: TeachHub                                                    */
/* ------------------------------------------------------------------ */

function TeachHubFlow() {
  const [view, setView] = useState("search"); // search | profile | test | results
  const [query, setQuery] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [teachersLoading, setTeachersLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [modalPrefill, setModalPrefill] = useState(null); // { teacher, test } | null
  const [modalOpen, setModalOpen] = useState(false);

  const [activeTeacher, setActiveTeacher] = useState(null);
  const [activeTest, setActiveTest] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [finalResult, setFinalResult] = useState(null); // { score, total, review }
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setTeachersLoading(true);
    api
      .searchTeachers("")
      .then(({ teachers }) => {
        if (!cancelled) setTeachers(teachers);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setTeachersLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const openTeacherProfile = (teacher) => {
    setSelectedTeacher(teacher);
    setView("profile");
  };

  const openEntryModal = (teacher, test) => {
    setModalPrefill(teacher && test ? { teacher, test } : null);
    setModalOpen(true);
  };

  // { teacher, test, name } — test here already has real backend questions (no answers)
  const handleModalSubmit = ({ teacher, test, name }) => {
    setActiveTeacher(teacher);
    setActiveTest(test);
    setStudentName(name);
    setModalOpen(false);
    setRunId((r) => r + 1);
    setView("test");
  };

  const handleFinishTest = async (answers) => {
    try {
      const result = await api.submitAttempt(activeTest.id, studentName, answers);
      setFinalResult(result);
    } catch (err) {
      setFinalResult({ score: 0, total: activeTest.questions.length, review: [], error: err.message });
    }
    setView("results");
  };

  const handleRetry = () => {
    setRunId((r) => r + 1);
    setView("test");
  };

  const handleExitToHub = () => {
    setSelectedTeacher(null);
    setActiveTeacher(null);
    setActiveTest(null);
    setFinalResult(null);
    setView("search");
  };

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {view === "search" && (
        <div className="px-6 py-14">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50">
              <Sparkles className="h-5 w-5 text-indigo-600" strokeWidth={1.75} />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">TeachHub</h1>
            <p className="mt-2 text-sm text-slate-500">Find your teacher and jump into a live test — no sign-in needed.</p>
          </div>

          <SearchBar value={query} onChange={setQuery} onOpenCodeEntry={() => openEntryModal(null, null)} />
          <FadeSlide animKey={query}>
            <TeacherSearchResults
              query={query}
              teachers={teachers}
              loading={teachersLoading}
              onSelect={openTeacherProfile}
            />
          </FadeSlide>
        </div>
      )}

      {view === "profile" && selectedTeacher && (
        <div className="px-6 py-10">
          <FadeSlide animKey={selectedTeacher.id}>
            <TeacherProfile
              teacher={selectedTeacher}
              onBack={() => setView("search")}
              onStartTest={(teacher, test) => openEntryModal(teacher, test)}
            />
          </FadeSlide>
        </div>
      )}

      {view === "test" && activeTest && (
        <div className="bg-white">
          <LiveTestView
            key={runId}
            test={activeTest}
            teacher={activeTeacher}
            studentName={studentName}
            onFinish={handleFinishTest}
            onExit={handleExitToHub}
          />
        </div>
      )}

      {view === "results" && finalResult && (
        <div className="bg-white">
          <TeachHubResultsView
            result={finalResult}
            onRetry={handleRetry}
            onExit={handleExitToHub}
            hideAnalyseFlaws
          />
        </div>
      )}

      {modalOpen && (
        <TestEntryModal
          prefill={modalPrefill}
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
}
/* ============================================================ */
/*  7. Teacher dashboard                                          */
/* ============================================================ */

const STANDARDS = ["Class 9", "Class 10", "Class 11", "Class 12"];
const SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science"];

const CHAPTERS_BY_SUBJECT = {
  Physics: ["Laws of Motion", "Work, Energy & Power", "Gravitation", "Rotational Dynamics", "Thermodynamics"],
  Chemistry: ["Atomic Structure", "Chemical Bonding", "Periodic Table Trends", "Thermochemistry"],
  Mathematics: ["Quadratic Equations", "Coordinate Geometry", "Trigonometry", "Probability"],
  Biology: ["Cell Structure", "Genetics", "Human Physiology", "Ecology"],
  "Computer Science": ["Linked Lists", "Trees", "Sorting Algorithms", "Dynamic Programming"],
};

const TEACHER = { name: "Ananya Rao", subject: "Physics", initials: "AR" };

const INITIAL_TESTS = [
  {
    id: "d1",
    title: "Laws of Motion — Unit Test",
    code: "PHY201",
    subject: "Physics",
    standard: "Class 11",
    questions: 20,
    status: "live",
    startAt: "2026-08-20T09:00",
    endAt: "2026-08-27T23:59",
    attempts: [
      { name: "Priya Sharma", score: 18, total: 20, submittedAt: "2026-08-21T14:32" },
      { name: "Rohan Gupta", score: 15, total: 20, submittedAt: "2026-08-21T15:10" },
      { name: "Ishita Verma", score: 20, total: 20, submittedAt: "2026-08-22T09:05" },
    ],
  },
  {
    id: "d2",
    title: "Rotational Dynamics — Quick Check",
    code: "PHY210",
    subject: "Physics",
    standard: "Class 11",
    questions: 10,
    status: "live",
    startAt: "2026-08-21T08:00",
    endAt: "2026-08-24T20:00",
    attempts: [{ name: "Aditya Nair", score: 7, total: 10, submittedAt: "2026-08-21T18:22" }],
  },
  {
    id: "d3",
    title: "Work, Energy & Power",
    code: "PHY198",
    subject: "Physics",
    standard: "Class 11",
    questions: 15,
    status: "concluded",
    startAt: "2026-08-01T09:00",
    endAt: "2026-08-08T23:59",
    attempts: [
      { name: "Meera Joshi", score: 12, total: 15, submittedAt: "2026-08-03T10:12" },
      { name: "Karthik Iyer", score: 9, total: 15, submittedAt: "2026-08-04T16:40" },
    ],
  },
];

function formatDateTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
}

function subjectPrefix(subject) {
  return (subject || "GEN").replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase();
}

function suggestCode(subject) {
  const n = Math.floor(100 + Math.random() * 900);
  return `${subjectPrefix(subject)}${n}`;
}

/* ------------------------------------------------------------------ */
/*  TeacherSidebar                                                            */
/* ------------------------------------------------------------------ */

function TeacherSidebar({ active, onNavigate, teacher }) {
  const items = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "wizard", label: "Create Test", icon: FilePlus2 },
    { key: "solveDoubt", label: "Solve Doubt", icon: MessagesSquare },
    { key: "profile", label: "Profile", icon: UserRound },
  ];

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-2.5 px-5 py-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600">
          <Sparkles className="h-4 w-4 text-white" strokeWidth={2} />
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-slate-900">TeachHub</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-3">
        <div className="flex items-center gap-2.5 rounded-xl px-2 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-semibold text-indigo-700">
            {teacher?.initials || "T"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-800">{teacher?.name || "Teacher"}</p>
            <p className="truncate text-[11px] text-slate-400">{teacher?.subject || ""} Teacher</p>
          </div>
          <button className="rounded-lg p-1.5 text-slate-300 transition-colors hover:bg-slate-100 hover:text-slate-500">
            <Settings className="h-3.5 w-3.5" />
          </button>
          <button className="rounded-lg p-1.5 text-slate-300 transition-colors hover:bg-slate-100 hover:text-rose-500">
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  0. Solve Doubt — teacher answers public student doubts             */
/* ------------------------------------------------------------------ */

function SolveDoubtBoard({ teacher }) {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("open"); // open | answered | all
  const [myRating, setMyRating] = useState(null);

  const load = () => {
    setLoading(true);
    const status = filter === "all" ? undefined : filter;
    api
      .listDoubts(status ? { status } : {})
      .then(({ doubts }) => setDoubts(doubts))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    api
      .getDoubtLeaderboard()
      .then(({ leaderboard }) => setMyRating(leaderboard.find((t) => t.id === teacher?.teacherId) || null))
      .catch(() => {});
  }, [teacher?.teacherId, doubts.length]);

  const tabs = [
    { key: "open", label: "Open" },
    { key: "answered", label: "Answered" },
    { key: "all", label: "All" },
  ];

  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Solve Doubt</h1>
          <p className="mt-1 text-sm text-slate-400">
            Answer doubts students have posted publicly. Students like the answers that help them —
            your likes become your rating.
          </p>
        </div>
        {myRating && (
          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-2.5">
            <div className="text-center">
              <p className="flex items-center justify-center gap-1 text-sm font-bold text-violet-700">
                <ThumbsUp className="h-3.5 w-3.5" />
                {myRating.rating}
              </p>
              <p className="text-[10px] font-medium text-violet-500">rating</p>
            </div>
            <div className="h-8 w-px bg-violet-200" />
            <div className="text-center">
              <p className="flex items-center justify-center gap-1 text-sm font-bold text-violet-700">
                <Award className="h-3.5 w-3.5" />#{myRating.rank}
              </p>
              <p className="text-[10px] font-medium text-violet-500">rank</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 flex gap-1.5">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === t.key ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {loading ? (
          [0, 1].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl border border-slate-100 bg-slate-100/60" />
          ))
        ) : doubts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 py-12 text-center">
            <p className="text-sm text-slate-400">
              {filter === "open" ? "No open doubts right now — you're all caught up." : "No doubts here yet."}
            </p>
          </div>
        ) : (
          doubts.map((d) => (
            <DoubtCard key={d.id} doubt={d} likerId={teacher?.teacherId} mode="teacher" teacher={teacher} onChanged={load} />
          ))
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  1. Create Test Wizard                                              */
/* ------------------------------------------------------------------ */

function Dropdown({ label, value, onChange, options, disabled, placeholder }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <label className="mb-1.5 block text-xs font-medium text-slate-500">{label}</label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-[15px] transition-colors ${
          disabled
            ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
            : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
        }`}
      >
        <span className={value ? "" : "text-slate-400"}>{value || placeholder}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && !disabled && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-1.5 max-h-56 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  value === opt ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {opt}
                {value === opt && <Check className="h-3.5 w-3.5" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CreateTestWizard({ teacherId, onPublish, onDone }) {
  const [standard, setStandard] = useState("");
  const [subject, setSubject] = useState("");
  const [chapters, setChapters] = useState([]);
  const [numQuestions, setNumQuestions] = useState(10);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");
  const [draft, setDraft] = useState(null); // generated test (pre-publish)
  const [publishOpen, setPublishOpen] = useState(false);

  const availableChapters = subject ? CHAPTERS_BY_SUBJECT[subject] : [];

  const toggleChapter = (ch) => {
    setChapters((cs) => (cs.includes(ch) ? cs.filter((c) => c !== ch) : [...cs, ch]));
  };

  const canGenerate = standard && subject && chapters.length > 0 && numQuestions >= 1;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setGenerating(true);
    setGenError("");
    try {
      const { draft: generated } = await api.generateTest({
        subject,
        chapters,
        numQuestions,
      });
      setDraft({ ...generated, standard });
    } catch (err) {
      setGenError(err.message || "Could not generate questions. Is the backend running?");
    } finally {
      setGenerating(false);
    }
  };

  const handleStartOver = () => {
    setDraft(null);
    setStandard("");
    setSubject("");
    setChapters([]);
    setNumQuestions(10);
  };

  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      <h1 className="text-xl font-semibold text-slate-900">Create a test</h1>
      <p className="mt-1 text-sm text-slate-400">Pick a scope and let TeachHub generate the questions.</p>

      {!draft ? (
        <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <Dropdown
              label="Standard"
              value={standard}
              onChange={setStandard}
              options={STANDARDS}
              placeholder="Select standard"
            />
            <Dropdown
              label="Subject"
              value={subject}
              onChange={(s) => {
                setSubject(s);
                setChapters([]);
              }}
              options={SUBJECTS}
              placeholder="Select subject"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">
              Chapters {subject && <span className="text-slate-300">· {chapters.length} selected</span>}
            </label>
            {!subject ? (
              <p className="rounded-xl border border-dashed border-slate-200 px-3.5 py-3 text-sm text-slate-300">
                Select a subject first
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {availableChapters.map((ch) => {
                  const isSelected = chapters.includes(ch);
                  return (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => toggleChapter(ch)}
                      className={`rounded-full border px-3.5 py-1.5 text-sm transition-all duration-150 ${
                        isSelected
                          ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {ch}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-medium text-slate-500">Number of MCQs</label>
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2 py-1">
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={numQuestions}
                  onChange={(e) => {
                    const v = Math.max(1, Math.min(100, Number(e.target.value) || 1));
                    setNumQuestions(v);
                  }}
                  className="w-10 bg-transparent text-right text-sm font-semibold text-slate-800 focus:outline-none"
                />
                <span className="text-xs text-slate-300">/ 100</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-100 accent-indigo-600"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!canGenerate || generating}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating questions…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Test
              </>
            )}
          </button>
          {genError && (
            <p className="flex items-center gap-1.5 text-xs font-medium text-rose-500">
              <AlertCircle className="h-3.5 w-3.5" />
              {genError}
            </p>
          )}
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <Check className="h-5 w-5 text-emerald-600" strokeWidth={2.5} />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">{draft.title}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 font-medium text-slate-500">
                {draft.standard}
              </span>
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 font-semibold text-indigo-700">
                {draft.subject}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Hash className="h-3.5 w-3.5" />
                {draft.questions.length} questions
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {draft.chapters.map((ch) => (
                <span key={ch} className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] text-slate-500">
                  {ch}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => window.print()}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
            <button
              onClick={() => setPublishOpen(true)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              <Rocket className="h-4 w-4" />
              Publish
            </button>
          </div>

          <button
            onClick={handleStartOver}
            className="text-xs font-medium text-slate-400 transition-colors hover:text-slate-600"
          >
            Start over with a new scope
          </button>
        </div>
      )}

      {publishOpen && (
        <PublishModal
          draft={draft}
          teacherId={teacherId}
          onClose={() => setPublishOpen(false)}
          onConfirm={(publishedTest) => {
            setPublishOpen(false);
            onPublish(publishedTest);
            onDone();
          }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Publish settings modal                                          */
/* ------------------------------------------------------------------ */

function PublishModal({ draft, teacherId, onClose, onConfirm }) {
  const [code, setCode] = useState(suggestCode(draft.subject));
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const handleConfirm = async () => {
    if (!code.trim()) {
      setError("Please set a test code.");
      return;
    }
    if (!startAt || !endAt) {
      setError("Please set both a start and end time.");
      return;
    }
    if (new Date(endAt) <= new Date(startAt)) {
      setError("End time must be after the start time.");
      return;
    }

    setPublishing(true);
    try {
      const { test } = await api.publishTest({
        teacherId,
        title: draft.title,
        subject: draft.subject,
        standard: draft.standard,
        chapters: draft.chapters,
        questions: draft.questions.map(({ id, prompt, options, correct, explanation }) => ({
          id,
          prompt,
          options,
          correct,
          explanation,
        })),
        code: code.trim().toUpperCase(),
        startAt,
        endAt,
      });
      setPublishing(false);
      onConfirm(test);
    } catch (err) {
      setPublishing(false);
      setError(err.message || "Could not publish this test.");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <motion.div
        className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Publish settings</h2>
            <p className="mt-0.5 text-sm text-slate-400">Set a code and a live window for students.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="space-y-3.5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Test code</label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
              <input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError("");
                }}
                className="w-full bg-transparent text-[15px] uppercase tracking-wide text-slate-800 focus:outline-none"
              />
              <button onClick={handleCopy} className="shrink-0 text-slate-300 transition-colors hover:text-indigo-600">
                {copied ? <CopyCheck className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Calendar className="h-3.5 w-3.5" />
                Start date & time
              </label>
              <input
                type="datetime-local"
                value={startAt}
                onChange={(e) => {
                  setStartAt(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Calendar className="h-3.5 w-3.5" />
                End date & time
              </label>
              <input
                type="datetime-local"
                value={endAt}
                onChange={(e) => {
                  setEndAt(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {error && <p className="text-xs font-medium text-rose-500">{error}</p>}

          <button
            onClick={handleConfirm}
            disabled={publishing}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
          >
            <Rocket className="h-4 w-4" />
            {publishing ? "Publishing..." : "Publish Test"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Status badge                                                    */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        Live
      </span>
    );
  }
  if (status === "scheduled") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
        <Radio className="h-3 w-3" />
        Scheduled
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-400">
      Concluded
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Dashboard (data table)                                          */
/* ------------------------------------------------------------------ */

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
        <Icon className="h-4.5 w-4.5 text-indigo-600" strokeWidth={2} />
      </div>
      <div>
        <p className="text-lg font-semibold text-slate-900">{value}</p>
        <p className="text-xs text-slate-400">{label}</p>
      </div>
    </div>
  );
}

function Dashboard({ tests, onOpenTest, onConclude, onUnpublish, onCreateNew }) {
  const stats = useMemo(() => {
    const liveCount = tests.filter((t) => t.status === "live").length;
    const totalAttempts = tests.reduce((s, t) => s + t.attempts.length, 0);
    const pctSum = tests.reduce(
      (s, t) => s + t.attempts.reduce((s2, a) => s2 + (a.score / a.total) * 100, 0),
      0
    );
    const avg = totalAttempts ? Math.round(pctSum / totalAttempts) : null;
    return { liveCount, totalAttempts, avg };
  }, [tests]);

  const sorted = [...tests].sort((a, b) => {
    const order = { live: 0, scheduled: 1, concluded: 2 };
    return order[a.status] - order[b.status] || new Date(b.startAt) - new Date(a.startAt);
  });

  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">Manage your published and past tests.</p>
        </div>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          <FilePlus2 className="h-4 w-4" />
          Create Test
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={Radio} label="Live tests" value={stats.liveCount} />
        <StatCard icon={Users} label="Total attempts" value={stats.totalAttempts} />
        <StatCard icon={TrendingUp} label="Average score" value={stats.avg === null ? "—" : `${stats.avg}%`} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-xs font-medium uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3">Test</th>
              <th className="px-5 py-3">Code</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Window</th>
              <th className="px-5 py-3">Students</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((t) => (
              <tr
                key={t.id}
                onClick={() => onOpenTest(t.id)}
                className="cursor-pointer border-b border-slate-50 last:border-0 transition-colors hover:bg-slate-50/70"
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-slate-800">{t.title}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {t.standard} · {t.subject} · {t.questions} Qs
                  </p>
                </td>
                <td className="px-5 py-4 font-mono text-xs font-semibold text-slate-500">{t.code}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={t.status} />
                </td>
                <td className="px-5 py-4 text-xs text-slate-400">
                  {formatDateTime(t.startAt)} → {formatDateTime(t.endAt)}
                </td>
                <td className="px-5 py-4">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Users className="h-3.5 w-3.5 text-slate-300" />
                    {t.attempts.length}
                  </span>
                </td>
                <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  {t.status === "live" && (
                    <button
                      onClick={() => onConclude(t.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <StopCircle className="h-3.5 w-3.5" />
                      Conclude
                    </button>
                  )}
                  {t.status === "scheduled" && (
                    <button
                      onClick={() => onUnpublish(t.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Ban className="h-3.5 w-3.5" />
                      Unpublish
                    </button>
                  )}
                  {t.status === "concluded" && <span className="text-xs text-slate-300">—</span>}
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-400">
                  No tests yet — create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Test detail — student scores table                                 */
/* ------------------------------------------------------------------ */

function TestDetail({ test, onBack }) {
  const sortedAttempts = [...test.attempts].sort((a, b) => b.score / b.total - a.score / a.total);
  const avg = test.attempts.length
    ? Math.round(
        test.attempts.reduce((s, a) => s + (a.score / a.total) * 100, 0) / test.attempts.length
      )
    : null;

  return (
    <div className="px-8 py-10">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </button>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-semibold text-slate-900">{test.title}</h1>
            <StatusBadge status={test.status} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 font-medium text-slate-500">
              {test.standard}
            </span>
            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 font-semibold text-indigo-700">
              {test.subject}
            </span>
            <span className="font-mono">{test.code}</span>
            <span>
              {formatDateTime(test.startAt)} → {formatDateTime(test.endAt)}
            </span>
          </div>
        </div>
        <div className="flex gap-6 text-center">
          <div>
            <p className="text-lg font-semibold text-slate-900">{test.attempts.length}</p>
            <p className="text-[11px] text-slate-400">Attempts</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">{avg === null ? "—" : `${avg}%`}</p>
            <p className="text-[11px] text-slate-400">Average</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-xs font-medium uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3">Rank</th>
              <th className="px-5 py-3">Student</th>
              <th className="px-5 py-3">Score</th>
              <th className="px-5 py-3">Percentage</th>
              <th className="px-5 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {sortedAttempts.map((a, i) => {
              const pct = Math.round((a.score / a.total) * 100);
              return (
                <tr key={a.name + i} className="border-b border-slate-50 last:border-0">
                  <td className="px-5 py-3.5">
                    {i === 0 ? (
                      <span className="flex items-center gap-1 text-amber-500">
                        <Trophy className="h-3.5 w-3.5" />
                        1
                      </span>
                    ) : (
                      <span className="text-slate-400">{i + 1}</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-800">{a.name}</td>
                  <td className="px-5 py-3.5 text-slate-500">
                    {a.score}/{a.total}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        pct >= 80
                          ? "bg-emerald-50 text-emerald-700"
                          : pct >= 50
                          ? "bg-amber-50 text-amber-700"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {pct}%
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-400">{formatDateTime(a.submittedAt)}</td>
                </tr>
              );
            })}
            {sortedAttempts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-sm text-slate-400">
                  No students have taken this test yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Root: Teacher Dashboard shell                                      */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  7b. Teacher profile — info + full leaderboard                      */
/* ------------------------------------------------------------------ */

function TeacherProfilePage({ teacher }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .getDoubtLeaderboard()
      .then(({ leaderboard }) => setLeaderboard(leaderboard))
      .catch((err) => setError(err.message || "Could not load leaderboard."))
      .finally(() => setLoading(false));
  }, []);

  const me = leaderboard.find((t) => t.id === teacher?.teacherId);

  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      <h1 className="text-xl font-semibold text-slate-900">Profile</h1>
      <p className="mt-1 text-sm text-slate-400">Your info and where you rank across EduBridge.</p>

      {/* Info card */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-16 bg-gradient-to-r from-violet-100 via-indigo-100 to-violet-50" />
        <div className="px-6 pb-6">
          <div className="-mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-xl font-semibold text-white shadow-md ring-4 ring-white">
            {teacher?.initials || "T"}
          </div>
          <h2 className="mt-3 text-lg font-semibold text-slate-900">{teacher?.name || "Teacher"}</h2>
          <p className="text-sm text-slate-500">{teacher?.subject || "—"} Teacher</p>

          <div className="mt-4 flex gap-8 border-t border-slate-100 pt-4">
            <div>
              <p className="text-lg font-semibold text-slate-900">{teacher?.standard || "—"}</p>
              <p className="text-[11px] text-slate-400">Standard taught</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-lg font-semibold text-slate-900">
                <ThumbsUp className="h-4 w-4 text-violet-400" />
                {me?.rating ?? 0}
              </p>
              <p className="text-[11px] text-slate-400">Total likes earned</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-lg font-semibold text-slate-900">
                <Award className="h-4 w-4 text-violet-400" />#{me?.rank ?? "—"}
              </p>
              <p className="text-[11px] text-slate-400">Current rank</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <p className="mb-3 mt-8 text-sm font-semibold text-slate-700">Leaderboard — ranked by likes</p>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="space-y-2 p-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        ) : error ? (
          <p className="p-6 text-center text-sm text-rose-500">{error}</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {leaderboard.map((t) => {
              const isMe = t.id === teacher?.teacherId;
              return (
                <div
                  key={t.id}
                  className={`flex items-center gap-3 px-5 py-3.5 transition-colors ${
                    isMe ? "bg-violet-50" : ""
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      t.rank === 1
                        ? "bg-amber-100 text-amber-700"
                        : t.rank === 2
                        ? "bg-slate-200 text-slate-600"
                        : t.rank === 3
                        ? "bg-orange-100 text-orange-700"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {t.rank}
                  </span>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700">
                    {t.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-sm font-medium ${isMe ? "text-violet-900" : "text-slate-800"}`}>
                      {t.name} {isMe && <span className="text-violet-500">(You)</span>}
                    </p>
                    <p className="truncate text-xs text-slate-400">{t.subject}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-700">
                    <ThumbsUp className="h-3.5 w-3.5 text-slate-300" />
                    {t.rating}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function TeacherPath({ teacher }) {
  const [nav, setNav] = useState("dashboard"); // dashboard | wizard
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openTestId, setOpenTestId] = useState(null);
  const [openTestDetail, setOpenTestDetail] = useState(null);
  const teacherId = teacher?.teacherId;

  const loadTests = () => {
    if (!teacherId) return;
    setLoading(true);
    api
      .getMyTests(teacherId)
      .then(({ tests }) => setTests(tests))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherId]);

  const handlePublish = () => {
    loadTests();
  };

  const handleConclude = async (id) => {
    setTests((ts) => ts.map((t) => (t.id === id ? { ...t, status: "concluded" } : t)));
    try {
      await api.concludeTest(id);
    } catch {
      loadTests();
    }
  };

  const handleUnpublish = async (id) => {
    setTests((ts) => ts.filter((t) => t.id !== id));
    try {
      await api.unpublishTest(id);
    } catch {
      loadTests();
    }
  };

  const openTest = async (id) => {
    setOpenTestId(id);
    setOpenTestDetail(null);
    try {
      const { test } = await api.getTest(id);
      setOpenTestDetail(test);
    } catch {
      /* ignore — TestDetail will just show a loading state forever, acceptable for demo */
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <TeacherSidebar
        active={nav}
        teacher={teacher}
        onNavigate={(key) => {
          setOpenTestId(null);
          setNav(key);
        }}
      />
      <main className="flex-1 overflow-y-auto">
        {openTestId ? (
          openTestDetail ? (
            <TestDetail test={openTestDetail} onBack={() => setOpenTestId(null)} />
          ) : (
            <div className="px-8 py-10 text-sm text-slate-400">Loading test details…</div>
          )
        ) : nav === "wizard" ? (
          <CreateTestWizard teacherId={teacherId} onPublish={handlePublish} onDone={() => setNav("dashboard")} />
        ) : nav === "solveDoubt" ? (
          <SolveDoubtBoard teacher={teacher} />
        ) : nav === "profile" ? (
          <TeacherProfilePage teacher={teacher} />
        ) : (
          <Dashboard
            tests={tests}
            loading={loading}
            onOpenTest={openTest}
            onConclude={handleConclude}
            onUnpublish={handleUnpublish}
            onCreateNew={() => setNav("wizard")}
          />
        )}
      </main>
    </div>
  );
}

/* ============================================================ */
/*  8. App orchestrator                                          */
/* ============================================================ */

function FloatingNav({ items }) {
  return (
    <div className="fixed right-4 top-4 z-[100] flex items-center gap-2">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={item.onClick}
          className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3.5 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-slate-900"
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  // screen: entry | login | studentSignup | teacherSignup | doubtChat | practice | publicDoubts | teachHub | teacherDashboard
  const [screen, setScreen] = useState("entry");
  const [selectedRole, setSelectedRole] = useState("student");
  const [currentUser, setCurrentUser] = useState(null);

  const goToEntry = () => {
    setScreen("entry");
    setSelectedRole("student");
    setCurrentUser(null);
  };

  let screenContent;

  switch (screen) {
    case "entry":
      screenContent = (
        <EntryScreen
          onSelect={(role) => {
            setSelectedRole(role);
            setScreen("login");
          }}
        />
      );
      break;

    case "login":
      screenContent = (
        <LoginPage
          initialRole={selectedRole}
          onBack={goToEntry}
          onSwitchToSignup={() => {
            setScreen(selectedRole === "student" ? "studentSignup" : "teacherSignup");
          }}
          onLogin={({ role, user }) => {
            setSelectedRole(role);
            setCurrentUser(user);
            setScreen(role === "student" ? "doubtChat" : "teacherDashboard");
          }}
        />
      );
      break;

    case "studentSignup":
      screenContent = (
        <StudentRegistration
          onSubmit={({ user }) => {
            setSelectedRole("student");
            setCurrentUser(user);
            setScreen("doubtChat");
          }}
        />
      );
      break;

    case "teacherSignup":
      screenContent = (
        <TeacherRegistration
          onSubmit={({ user }) => {
            setSelectedRole("teacher");
            setCurrentUser(user);
            setScreen("teacherDashboard");
          }}
        />
      );
      break;

    case "doubtChat":
      screenContent = (
        <>
          <DoubtChatPage onPractice={() => setScreen("practice")} />
          <FloatingNav
            items={[
              { label: "Ask Teachers", icon: <MessagesSquare className="h-3.5 w-3.5 text-violet-500" />, onClick: () => setScreen("publicDoubts") },
              { label: "TeachHub", icon: <Radio className="h-3.5 w-3.5 text-emerald-500" />, onClick: () => setScreen("teachHub") },
              { label: "Log out", icon: <LogOut className="h-3.5 w-3.5" />, onClick: goToEntry },
            ]}
          />
        </>
      );
      break;

    case "practice":
      screenContent = <PracticeFlow onExit={() => setScreen("doubtChat")} />;
      break;

    case "publicDoubts":
      screenContent = (
        <>
          <PublicDoubtBoard student={currentUser} onBack={() => setScreen("doubtChat")} />
          <FloatingNav
            items={[
              { label: "Doubt Chat", icon: <MessageSquare className="h-3.5 w-3.5 text-indigo-500" />, onClick: () => setScreen("doubtChat") },
              { label: "Log out", icon: <LogOut className="h-3.5 w-3.5" />, onClick: goToEntry },
            ]}
          />
        </>
      );
      break;

    case "teachHub":
      screenContent = (
        <>
          <TeachHubFlow />
          <FloatingNav
            items={[
              { label: "Doubt Chat", icon: <MessageSquare className="h-3.5 w-3.5 text-indigo-500" />, onClick: () => setScreen("doubtChat") },
              { label: "Log out", icon: <LogOut className="h-3.5 w-3.5" />, onClick: goToEntry },
            ]}
          />
        </>
      );
      break;

    case "teacherDashboard":
      screenContent = (
        <>
          <TeacherPath teacher={currentUser} />
          <FloatingNav
            items={[{ label: "Log out", icon: <LogOut className="h-3.5 w-3.5" />, onClick: goToEntry }]}
          />
        </>
      );
      break;

    default:
      screenContent = null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {screenContent}
      </motion.div>
    </AnimatePresence>
  );
}
