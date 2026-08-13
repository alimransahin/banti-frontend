"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, FileText, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import {
  IAdministration,
  getAdministrations,
  createAdministration,
  updateAdministration,
  deleteAdministration,
} from "@/lib/administration-api";

const administrationTitles = [
  "📜 পাঠদানের অনুমতি",
  "📄 শাখা অনুমোদন পত্র",
  "🏅 সর্বশেষ স্বীকৃতি",
  "🏫 শ্রেণী ভিত্তিক শিক্ষার্থীদের তথ্য",
  "👨‍👩‍👧 লিঙ্গ ভিত্তিক শিক্ষার্থীদের তথ্য",
  "📚 শ্রেণির রুটিন",
  "📝 পরীক্ষার রুটিন",
];

export default function AdministrationAdmin() {
  const [administrations, setAdministrations] = useState<IAdministration[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAdministrations = async () => {
    try {
      setLoading(true);

      const data = await getAdministrations();

      setAdministrations(data);
    } catch (error) {
      console.error("Failed to fetch administrations:", error);
      setError("প্রশাসনিক তথ্য লোড করা যায়নি।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdministrations();
  }, []);

  const resetForm = () => {
    setTitle("");
    setFile(null);
    setEditingId(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (administration: IAdministration) => {
    setEditingId(administration._id);
    setTitle(administration.title);
    setFile(null);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setError("প্রশাসনিক তথ্য নির্বাচন করুন।");
      return;
    }

    if (!editingId && !file) {
      setError("একটি PDF ফাইল নির্বাচন করুন।");
      return;
    }

    if (file && file.type !== "application/pdf") {
      setError("শুধুমাত্র PDF ফাইল আপলোড করা যাবে।");
      return;
    }

    if (file && file.size > 2 * 1024 * 1024) {
      setError("PDF ফাইলের সর্বোচ্চ সাইজ 2 MB হতে হবে।");
      return;
    }
    try {
      setSubmitting(true);
      setError("");

      const formData = new FormData();

      formData.append("title", title);

      if (file) {
        formData.append("file", file);
      }

      if (editingId) {
        await updateAdministration(editingId, formData);
      } else {
        await createAdministration(formData);
      }

      resetForm();
      await fetchAdministrations();
    } catch (error: any) {
      console.error("Administration submit error:", error);

      setError(
        error?.response?.data?.message ||
        "তথ্য সংরক্ষণ করা যায়নি।",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "আপনি কি এই প্রশাসনিক তথ্যটি মুছে ফেলতে চান?",
    );

    if (!confirmDelete) return;

    try {
      await deleteAdministration(id);

      if (editingId === id) {
        resetForm();
      }

      await fetchAdministrations();
    } catch (error) {
      console.error("Delete administration error:", error);
      setError("তথ্য মুছে ফেলা যায়নি।");
    }
  };

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            প্রশাসনিক তথ্য
          </h1>

          <p className="mt-1 text-sm text-paragraph">
            বিদ্যালয়ের গুরুত্বপূর্ণ প্রশাসনিক নথিপত্র পরিচালনা করুন।
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-2xl text-white">
          📋
        </div>
      </div>

      {/* ================= FORM ================= */}
      <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">

        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-primary">
              {editingId ? "তথ্য আপডেট করুন" : "নতুন তথ্য যোগ করুন"}
            </h2>

            <p className="mt-1 text-sm text-paragraph">
              একটি প্রশাসনিক তথ্যের সাথে একটি PDF সংযুক্ত করুন।
            </p>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-bold text-paragraph transition hover:bg-background"
            >
              <X size={16} />
              বাতিল
            </button>
          )}
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-bold text-primary">
              প্রশাসনিক তথ্য
            </label>

            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-secondary"
            >
              <option value="">
                নির্বাচন করুন
              </option>

              {administrationTitles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* PDF */}
          <div>
            <label className="mb-2 block text-sm font-bold text-primary">
              PDF ফাইল
            </label>

            <div className="rounded-xl border-2 border-dashed border-border bg-background p-5">
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                }}
                className="block w-full text-sm text-paragraph file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:font-bold file:text-white"
              />

              {file && (
                <div className="mt-3 flex items-center gap-2 text-sm text-secondary">
                  <FileText size={17} />
                  <span className="truncate">
                    {file.name}
                  </span>
                </div>
              )}

              {editingId && !file && (
                <p className="mt-3 text-xs text-text-light">
                  নতুন PDF না দিলে বর্তমান PDF অপরিবর্তিত থাকবে।
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              "সংরক্ষণ হচ্ছে..."
            ) : editingId ? (
              <>
                <Upload size={17} />
                আপডেট করুন
              </>
            ) : (
              <>
                <Plus size={17} />
                যোগ করুন
              </>
            )}
          </button>

        </form>
      </section>

      {/* ================= LIST ================= */}
      <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">

        <div className="mb-5">
          <h2 className="text-lg font-bold text-primary">
            প্রশাসনিক তথ্যের তালিকা
          </h2>

          <p className="mt-1 text-sm text-paragraph">
            মোট {administrations.length} টি তথ্য
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <div className="mb-3 text-4xl">
              📋
            </div>

            <p className="text-sm font-bold text-paragraph">
              তথ্য লোড হচ্ছে...
            </p>
          </div>
        ) : administrations.length === 0 ? (
          <div className="rounded-xl border border-border bg-background px-5 py-12 text-center">
            <div className="mb-3 text-4xl">
              📄
            </div>

            <h3 className="font-bold text-primary">
              কোনো তথ্য পাওয়া যায়নি
            </h3>

            <p className="mt-1 text-sm text-paragraph">
              উপরের ফর্ম থেকে প্রশাসনিক তথ্য যোগ করুন।
            </p>
          </div>
        ) : (
          <div className="space-y-3">

            {administrations.map((administration) => (
              <div
                key={administration._id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
              >

                {/* Info */}
                <div className="flex min-w-0 items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                    <FileText size={20} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-primary">
                      {administration.title}
                    </h3>
                  </div>

                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2">

                  {administration.file?.url && (
                    <a
                      href={administration.file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-bold text-secondary no-underline transition hover:bg-background"
                    >
                      <ExternalLink size={15} />
                      দেখুন
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => handleEdit(administration)}
                    className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs font-bold text-white transition hover:bg-primary"
                  >
                    <Pencil size={15} />
                    এডিট
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(administration._id)}
                    className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-700"
                  >
                    <Trash2 size={15} />
                    ডিলিট
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}