"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminSession } from "@/lib/data-store";

import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "@/lib/teacher-api";

import {
  Edit2,
  Trash2,
  Plus,
  X,
  Upload,
  UserRound,
  Mail,
  Phone,
} from "lucide-react";
import type { Teacher } from "@/lib/data-store";
import { AdminSidebar } from "@/components/AdminSidebar";

type TeacherForm = Omit<Teacher, "_id">;

const initialForm: TeacherForm = {
  name: "",
  designation: null,
  subject: "",
  qualification: "",
  photo: "",
  phone: "",
  email: "",
};

const designationOptions = [
  "প্রধান শিক্ষক",
  "সহকারী প্রধান শিক্ষক",
  "সহকারী শিক্ষক",
  "অফিস সহকারী কাম কম্পিউটার অপারেটর",
  "কম্পিউটার ল্যাব অপারেটর",
  "অফিস সহায়ক",
  "নিরাপত্তা রক্ষী",
  "পরিচ্ছন্নতা কর্মী",
  "নৈশ প্রহরী",
  "আয়া",
];

export default function TeachersAdmin() {
  const router = useRouter();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] =
    useState<TeacherForm>(initialForm);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ================================
  // AUTH + LOAD DATA
  // ================================

  useEffect(() => {
    if (!getAdminSession()) {
      router.push("/admin");
      return;
    }

    setIsAuthorized(true);
    loadTeachers();
  }, [router]);

  const loadTeachers = async () => {
    try {
      const data = await getTeachers();
      setTeachers(data);
    } catch (error) {
      console.error("Load teachers error:", error);

      setError(
        "শিক্ষকদের তথ্য লোড করা যায়নি।"
      );
    }
  };
  // ================================
  // INPUT CHANGE
  // ================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================================
  // PHOTO CHANGE
  // ================================

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    // Max 1 MB
    if (file.size > 1024 * 1024) {
      setError("ছবির সাইজ সর্বোচ্চ ১ MB হতে হবে।");
      e.target.value = "";
      return;
    }

    // Allowed formats
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(
        file.type
      )
    ) {
      setError(
        "শুধুমাত্র JPG, PNG অথবা WebP ছবি আপলোড করা যাবে।"
      );
      e.target.value = "";
      return;
    }

    setPhotoFile(file);

    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
  };



  // ================================
  // SUBMIT
  // ================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append(
        "designation",
        formData.designation!
      );
      data.append("subject", formData.subject);
      data.append(
        "qualification",
        formData.qualification
      );
      data.append("phone", formData.phone);
      data.append("email", formData.email);

      // New photo
      if (photoFile) {
        data.append("photo", photoFile);
      }

      // UPDATE
      if (editingId) {
        await updateTeacher(
          editingId,
          data
        );
      }

      // CREATE
      else {
        if (!photoFile) {
          throw new Error(
            "শিক্ষকের ছবি নির্বাচন করুন।"
          );
        }

        await createTeacher(data);
      }

      // Reload from MongoDB
      await loadTeachers();

      resetForm();
    } catch (error) {
      console.error(
        "Teacher submit error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "কিছু সমস্যা হয়েছে।"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================================
  // EDIT
  // ================================
  const handleEdit = (teacher: Teacher) => {
    setFormData({
      name: teacher.name,
      designation: teacher.designation,
      subject: teacher.subject,
      qualification: teacher.qualification,
      photo: teacher.photo,
      phone: teacher.phone,
      email: teacher.email,
    });

    setEditingId(teacher._id);

    setPhotoFile(null);
    setPhotoPreview(teacher.photo);

    setError("");
    setShowForm(true);
  };
  // ================================
  // DELETE
  // ================================

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "আপনি কি এই শিক্ষক/কর্মচারীকে মুছে ফেলতে চান?"
    );

    if (!confirmed) return;

    try {
      await deleteTeacher(id);

      await loadTeachers();
    } catch (error) {
      console.error(
        "Delete teacher error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "শিক্ষক মুছে ফেলা যায়নি।"
      );
    }
  };

  // ================================
  // RESET
  // ================================

  const resetForm = () => {
    setFormData(initialForm);
    setPhotoFile(null);
    setPhotoPreview("");
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  // ================================
  // ADD FORM
  // ================================

  const openAddForm = () => {
    setFormData(initialForm);
    setPhotoFile(null);
    setPhotoPreview("");
    setEditingId(null);
    setError("");
    setShowForm(true);
  };

  // ================================
  // LOADING
  // ================================

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-primary">
        লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />

      <main className="min-h-screen">
        <div className="px-4 pb-8 pt-20 sm:px-5 sm:pt-20 lg:px-8 lg:pt-8">

          {/* ================================= */}
          {/* HEADER */}
          {/* ================================= */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-px w-8 bg-secondary" />

                <span className="text-xs font-semibold tracking-wide text-secondary">
                  প্রশাসনিক প্যানেল
                </span>
              </div>

              <h1 className="text-2xl font-bold text-primary sm:text-3xl">
                শিক্ষক ও কর্মচারী
              </h1>

              <p className="mt-1 text-sm text-muted">
                শিক্ষক ও কর্মচারীদের তথ্য যোগ, সম্পাদনা এবং
                মুছে ফেলুন।
              </p>
            </div>

            <button
              type="button"
              onClick={openAddForm}
              className="
                inline-flex cursor-pointer items-center
                justify-center gap-2 rounded-lg
                bg-secondary px-4 py-2.5
                text-sm font-semibold text-white
                shadow-sm transition hover:opacity-90
              "
            >
              <Plus size={18} />
              শিক্ষক/কর্মচারী যোগ করুন
            </button>
          </div>

          {/* ================================= */}
          {/* STATS */}
          {/* ================================= */}

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

            {/* Total */}
            <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">
                    মোট শিক্ষক/কর্মচারী
                  </p>

                  <p className="mt-1 text-3xl font-bold text-primary">
                    {teachers.length}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-light text-secondary">
                  <UserRound size={22} />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">
                    তথ্য সংরক্ষিত
                  </p>

                  <p className="mt-1 text-lg font-bold text-secondary">
                    সক্রিয়
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-light text-secondary">
                  <UserRound size={22} />
                </div>
              </div>
            </div>

            {/* Image limit */}
            <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">
                    ছবির সীমা
                  </p>

                  <p className="mt-1 text-lg font-bold text-primary">
                    ১ MB
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-light text-secondary">
                  <Upload size={22} />
                </div>
              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* TEACHERS TABLE */}
          {/* ================================= */}

          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">

            {teachers.length === 0 ? (
              <div className="px-5 py-14 text-center">

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary-light text-secondary">
                  <UserRound size={25} />
                </div>

                <h3 className="text-lg font-bold text-primary">
                  কোনো শিক্ষক/কর্মচারী যোগ করা হয়নি
                </h3>

                <p className="mt-1 text-sm text-muted">
                  প্রথম শিক্ষক/কর্মচারী যোগ করতে নিচের
                  বাটনে ক্লিক করুন।
                </p>

                <button
                  type="button"
                  onClick={openAddForm}
                  className="
                    mt-5 inline-flex cursor-pointer
                    items-center gap-2 rounded-lg
                    bg-secondary px-5 py-2.5
                    text-sm font-semibold text-white
                    transition hover:opacity-90
                  "
                >
                  <Plus size={17} />
                  প্রথমজন যোগ করুন
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-187.5">

                  <thead className="border-b border-border bg-background">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted">
                        শিক্ষক/কর্মচারী
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted">
                        পদবি
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted">
                        বিষয়
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted">
                        যোগাযোগ
                      </th>

                      <th className="px-4 py-3 text-right text-xs font-semibold text-muted">
                        অ্যাকশন
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {teachers.map((teacher) => (
                      <tr
                        key={teacher._id}
                        className="
                          border-b border-border
                          last:border-b-0
                          hover:bg-secondary-light/30
                        "
                      >
                        {/* Person */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">

                            <img
                              src={teacher.photo}
                              alt={teacher.name}
                              className="
                                h-11 w-11 rounded-lg
                                border border-border
                                object-cover
                              "
                            />

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-primary">
                                {teacher.name}
                              </p>

                              <p className="truncate text-xs text-muted">
                                {teacher.qualification}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Designation */}
                        <td className="px-4 py-4 text-sm text-primary">
                          {teacher.designation}
                        </td>

                        {/* Subject */}
                        <td className="px-4 py-4 text-sm text-muted">
                          {teacher.subject || "—"}
                        </td>

                        {/* Contact */}
                        <td className="px-4 py-4">
                          <div className="space-y-1">

                            {teacher.phone && (
                              <p className="flex items-center gap-2 text-xs text-muted">
                                <Phone size={13} />
                                {teacher.phone}
                              </p>
                            )}

                            {teacher.email && (
                              <p className="flex items-center gap-2 text-xs text-muted">
                                <Mail size={13} />
                                {teacher.email}
                              </p>
                            )}

                            {!teacher.phone &&
                              !teacher.email && (
                                <span className="text-xs text-muted">
                                  —
                                </span>
                              )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">

                            <button
                              type="button"
                              onClick={() => handleEdit(teacher)}
                              className="
                                inline-flex cursor-pointer
                                items-center gap-1.5
                                rounded-lg border border-border
                                bg-background px-3 py-2
                                text-xs font-semibold text-primary
                                transition
                                hover:border-secondary
                                hover:bg-secondary-light
                                hover:text-secondary
                              "
                            >
                              <Edit2 size={14} />
                              সম্পাদনা
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(teacher._id)
                              }
                              className="
                                inline-flex cursor-pointer
                                items-center gap-1.5
                                rounded-lg border border-border
                                bg-background px-3 py-2
                                text-xs font-semibold text-red-600
                                transition
                                hover:border-red-200
                                hover:bg-red-50
                              "
                            >
                              <Trash2 size={14} />
                              মুছুন
                            </button>

                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ================================= */}
      {/* FORM MODAL */}
      {/* ================================= */}

      {showForm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">

          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-surface shadow-2xl">

            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-primary px-5 py-4 sm:px-6">

              <div>
                <p className="text-xs text-white/60">
                  শিক্ষক ও কর্মচারী ব্যবস্থাপনা
                </p>

                <h2 className="mt-1 text-lg font-bold text-white">
                  {editingId
                    ? "তথ্য সম্পাদনা"
                    : "নতুন শিক্ষক/কর্মচারী যোগ করুন"}
                </h2>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="
                  flex h-9 w-9 cursor-pointer
                  items-center justify-center
                  rounded-full bg-white/10
                  text-white transition
                  hover:bg-white/20
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto p-5 sm:p-6"
            >

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary">
                    নাম
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="নাম লিখুন"
                    className="
                      w-full rounded-lg border border-border
                      bg-background px-4 py-2.5
                      text-sm text-primary
                      outline-none transition
                      focus:border-secondary
                      focus:ring-2 focus:ring-secondary/20
                    "
                  />
                </div>

                {/* Designation Dropdown */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary">
                    পদবি
                  </label>

                  <select
                    name="designation"
                    value={formData.designation || ""}
                    onChange={handleChange}
                    required
                    className="
                      w-full rounded-lg border border-border
                      bg-background px-4 py-2.5
                      text-sm text-primary
                      outline-none transition
                      focus:border-secondary
                      focus:ring-2 focus:ring-secondary/20
                    "
                  >
                    <option value="">
                      পদবি নির্বাচন করুন
                    </option>

                    {designationOptions.map(
                      (designation) => (
                        <option
                          key={designation}
                          value={designation}
                        >
                          {designation}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Subject - NORMAL INPUT, OPTIONAL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary">
                    বিষয়
                    <span className="ml-1 text-xs font-normal text-muted">
                      (ঐচ্ছিক)
                    </span>
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="যেমন: গণিত"
                    className="
                      w-full rounded-lg border border-border
                      bg-background px-4 py-2.5
                      text-sm text-primary
                      outline-none transition
                      focus:border-secondary
                      focus:ring-2 focus:ring-secondary/20
                    "
                  />
                </div>

                {/* Qualification */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary">
                    শিক্ষাগত যোগ্যতা
                  </label>

                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                    placeholder="যেমন: B.Sc, M.Sc"
                    className="
                      w-full rounded-lg border border-border
                      bg-background px-4 py-2.5
                      text-sm text-primary
                      outline-none transition
                      focus:border-secondary
                      focus:ring-2 focus:ring-secondary/20
                    "
                  />
                </div>

                {/* Phone - OPTIONAL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary">
                    ফোন
                    <span className="ml-1 text-xs font-normal text-muted">
                      (ঐচ্ছিক)
                    </span>
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    className="
                      w-full rounded-lg border border-border
                      bg-background px-4 py-2.5
                      text-sm text-primary
                      outline-none transition
                      focus:border-secondary
                      focus:ring-2 focus:ring-secondary/20
                    "
                  />
                </div>

                {/* Email - OPTIONAL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary">
                    ই-মেইল
                    <span className="ml-1 text-xs font-normal text-muted">
                      (ঐচ্ছিক)
                    </span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="teacher@example.com"
                    className="
                      w-full rounded-lg border border-border
                      bg-background px-4 py-2.5
                      text-sm text-primary
                      outline-none transition
                      focus:border-secondary
                      focus:ring-2 focus:ring-secondary/20
                    "
                  />
                </div>

              </div>

              {/* ================================= */}
              {/* PHOTO */}
              {/* ================================= */}

              <div className="mt-5">

                <label className="mb-2 block text-sm font-semibold text-primary">
                  শিক্ষকের ছবি
                </label>

                <div className="
                  flex flex-col gap-4
                  rounded-xl border border-dashed
                  border-border bg-background p-4
                  sm:flex-row sm:items-center
                ">

                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="
                        h-24 w-24 rounded-lg
                        border border-border
                        object-cover
                      "
                    />
                  ) : (
                    <div className="
                      flex h-24 w-24 shrink-0
                      items-center justify-center
                      rounded-lg bg-secondary-light
                      text-secondary
                    ">
                      <UserRound size={30} />
                    </div>
                  )}

                  <div className="flex-1">

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handlePhotoChange}
                      required={!editingId}
                      className="
                        block w-full cursor-pointer
                        text-sm text-muted
                        file:mr-4 file:cursor-pointer
                        file:rounded-lg file:border-0
                        file:bg-secondary
                        file:px-4 file:py-2
                        file:font-semibold
                        file:text-white
                        hover:file:opacity-90
                      "
                    />

                    <p className="mt-2 text-xs text-muted">
                      JPG, PNG অথবা WebP • সর্বোচ্চ ১ MB
                    </p>

                    {editingId &&
                      formData.photo &&
                      !photoFile && (
                        <p className="mt-1 text-xs text-secondary">
                          নতুন ছবি না দিলে বর্তমান ছবিটি থাকবে।
                        </p>
                      )}
                  </div>
                </div>
              </div>

              {/* ================================= */}
              {/* BUTTONS */}
              {/* ================================= */}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isSubmitting}
                  className="
                    cursor-pointer rounded-lg
                    border border-border
                    bg-background px-5 py-2.5
                    text-sm font-semibold text-primary
                    transition hover:bg-secondary-light
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  বাতিল
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    inline-flex cursor-pointer
                    items-center justify-center gap-2
                    rounded-lg bg-secondary
                    px-5 py-2.5
                    text-sm font-semibold text-white
                    shadow-sm transition
                    hover:opacity-90
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {isSubmitting
                    ? "সংরক্ষণ হচ্ছে..."
                    : editingId
                      ? "তথ্য আপডেট করুন"
                      : "তথ্য সংরক্ষণ করুন"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}