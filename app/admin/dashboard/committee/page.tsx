"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminSession } from "@/lib/data-store";

import {
  getCommittees,
  createCommittee,
  updateCommittee,
  deleteCommittee,
} from "@/lib/committee-api";

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

import { AdminSidebar } from "@/components/AdminSidebar";

// ======================================================
// TYPE
// ======================================================

type Committee = {
  _id: string;
  name: string;
  designation: string;
  phone: string;
  email: string;
  photo: string;
};

type CommitteeForm = Omit<Committee, "_id">;

// ======================================================
// INITIAL FORM
// ======================================================

const initialForm: CommitteeForm = {
  name: "",
  designation: "",
  phone: "",
  email: "",
  photo: "",
};

// ======================================================
// DESIGNATION OPTIONS
// ======================================================

const designationOptions = [
  "সভাপতি",
  "শিক্ষক প্রতিনিধি",
  "সংরক্ষিত মহিলা শিক্ষক প্রতিনিধি",
  "অভিভাবক সদস্য",
  "সংরক্ষিত মহিলা অভিভাবক সদস্য",
  "দাতা সদস্য",
  "কো-অপ্ট সদস্য",
  "সদস্য সচিব",
];

// ======================================================
// PAGE
// ======================================================

export default function CommitteeAdmin() {
  const router = useRouter();

  // ====================================================
  // STATE
  // ====================================================

  const [isAuthorized, setIsAuthorized] = useState(false);

  const [committees, setCommittees] = useState<Committee[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] =
    useState<CommitteeForm>(initialForm);

  const [photoFile, setPhotoFile] =
    useState<File | null>(null);

  const [photoPreview, setPhotoPreview] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  // ====================================================
  // AUTH + LOAD DATA
  // ====================================================

  useEffect(() => {
    if (!getAdminSession()) {
      router.push("/admin");
      return;
    }

    setIsAuthorized(true);
    loadCommittees();
  }, [router]);

  // ====================================================
  // LOAD COMMITTEES
  // ====================================================

  const loadCommittees = async () => {
    try {
      const data = await getCommittees();

      setCommittees(data);
    } catch (error) {
      console.error(
        "Load committees error:",
        error
      );

      setError(
        "কমিটির তথ্য লোড করা যায়নি।"
      );
    }
  };

  // ====================================================
  // INPUT CHANGE
  // ====================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ====================================================
  // PHOTO CHANGE
  // ====================================================

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    // Max 1 MB
    if (file.size > 1024 * 1024) {
      setError(
        "ছবির সাইজ সর্বোচ্চ ১ MB হতে হবে।"
      );

      e.target.value = "";

      return;
    }

    // Allowed formats
    if (
      ![
        "image/jpeg",
        "image/png",
        "image/webp",
      ].includes(file.type)
    ) {
      setError(
        "শুধুমাত্র JPG, PNG অথবা WebP ছবি আপলোড করা যাবে।"
      );

      e.target.value = "";

      return;
    }

    setPhotoFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setPhotoPreview(previewUrl);
  };

  // ====================================================
  // SUBMIT
  // ====================================================

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
        formData.designation
      );

      data.append("phone", formData.phone);

      data.append("email", formData.email);

      // New photo
      if (photoFile) {
        data.append("photo", photoFile);
      }

      // ================================================
      // UPDATE
      // ================================================

      if (editingId) {
        await updateCommittee(
          editingId,
          data
        );
      }

      // ================================================
      // CREATE
      // ================================================

      else {
        if (!photoFile) {
          throw new Error(
            "কমিটির সদস্যের ছবি নির্বাচন করুন।"
          );
        }

        await createCommittee(data);
      }

      // Reload from MongoDB
      await loadCommittees();

      resetForm();
    } catch (error) {
      console.error(
        "Committee submit error:",
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

  // ====================================================
  // EDIT
  // ====================================================

  const handleEdit = (
    committee: Committee
  ) => {
    setFormData({
      name: committee.name,
      designation: committee.designation,
      phone: committee.phone,
      email: committee.email,
      photo: committee.photo,
    });

    setEditingId(committee._id);

    setPhotoFile(null);

    setPhotoPreview(
      committee.photo
    );

    setError("");

    setShowForm(true);
  };

  // ====================================================
  // DELETE
  // ====================================================

  const handleDelete = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        "আপনি কি এই কমিটির সদস্যকে মুছে ফেলতে চান?"
      );

    if (!confirmed) return;

    try {
      await deleteCommittee(id);

      await loadCommittees();
    } catch (error) {
      console.error(
        "Delete committee error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "কমিটির সদস্য মুছে ফেলা যায়নি।"
      );
    }
  };

  // ====================================================
  // RESET
  // ====================================================

  const resetForm = () => {
    setFormData(initialForm);

    setPhotoFile(null);

    setPhotoPreview("");

    setEditingId(null);

    setShowForm(false);

    setError("");
  };

  // ====================================================
  // ADD FORM
  // ====================================================

  const openAddForm = () => {
    setFormData(initialForm);

    setPhotoFile(null);

    setPhotoPreview("");

    setEditingId(null);

    setError("");

    setShowForm(true);
  };

  // ====================================================
  // LOADING
  // ====================================================

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-primary">
        লোড হচ্ছে...
      </div>
    );
  }

  // ====================================================
  // UI
  // ====================================================

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />

      <main className="min-h-screen">
        <div className="px-4 pb-8 pt-20 sm:px-5 sm:pt-20 lg:px-8 lg:pt-8">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-px w-8 bg-secondary" />

                <span className="text-xs font-semibold tracking-wide text-secondary">
                  প্রশাসনিক প্যানেল
                </span>
              </div>

              <h1 className="text-2xl font-bold text-primary sm:text-3xl">
                পরিচালনা কমিটি
              </h1>

              <p className="mt-1 text-sm text-muted">
                পরিচালনা কমিটির সদস্যদের তথ্য যোগ,
                সম্পাদনা এবং মুছে ফেলুন।
              </p>
            </div>

            <button
              type="button"
              onClick={openAddForm}
              className="
                inline-flex cursor-pointer
                items-center justify-center
                gap-2 rounded-lg
                bg-secondary px-4 py-2.5
                text-sm font-semibold
                text-white shadow-sm
                transition hover:opacity-90
              "
            >
              <Plus size={18} />

              কমিটির সদস্য যোগ করুন
            </button>
          </div>

          {/* ================================================= */}
          {/* STATS */}
          {/* ================================================= */}

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

            {/* Total */}

            <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-muted">
                    মোট সদস্য
                  </p>

                  <p className="mt-1 text-3xl font-bold text-primary">
                    {committees.length}
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

          {/* ================================================= */}
          {/* COMMITTEE TABLE */}
          {/* ================================================= */}

          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">

            {committees.length === 0 ? (

              <div className="px-5 py-14 text-center">

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary-light text-secondary">
                  <UserRound size={25} />
                </div>

                <h3 className="text-lg font-bold text-primary">
                  কোনো কমিটির সদস্য যোগ করা হয়নি
                </h3>

                <p className="mt-1 text-sm text-muted">
                  প্রথম কমিটির সদস্য যোগ করতে
                  নিচের বাটনে ক্লিক করুন।
                </p>

                <button
                  type="button"
                  onClick={openAddForm}
                  className="
                    mt-5 inline-flex cursor-pointer
                    items-center gap-2 rounded-lg
                    bg-secondary px-5 py-2.5
                    text-sm font-semibold
                    text-white transition
                    hover:opacity-90
                  "
                >
                  <Plus size={17} />

                  প্রথম সদস্য যোগ করুন
                </button>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[750px]">

                  <thead className="border-b border-border bg-background">

                    <tr>

                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted">
                        সদস্য
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted">
                        পদবি
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

                    {committees.map(
                      (committee) => (

                        <tr
                          key={committee._id}
                          className="
                            border-b border-border
                            last:border-b-0
                            hover:bg-secondary-light/30
                          "
                        >

                          {/* MEMBER */}

                          <td className="px-4 py-4">

                            <div className="flex items-center gap-3">

                              {committee.photo ? (
                                <img
                                  src={
                                    committee.photo
                                  }
                                  alt={
                                    committee.name
                                  }
                                  className="
                                    h-11 w-11
                                    rounded-lg
                                    border border-border
                                    object-cover
                                  "
                                />
                              ) : (
                                <div
                                  className="
                                    flex h-11 w-11
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-secondary-light
                                    text-secondary
                                  "
                                >
                                  <UserRound
                                    size={20}
                                  />
                                </div>
                              )}

                              <div className="min-w-0">

                                <p className="truncate text-sm font-semibold text-primary">
                                  {committee.name}
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* DESIGNATION */}

                          <td className="px-4 py-4 text-sm text-primary">
                            {committee.designation}
                          </td>

                          {/* CONTACT */}

                          <td className="px-4 py-4">

                            <div className="space-y-1">

                              {committee.phone && (
                                <p className="flex items-center gap-2 text-xs text-muted">

                                  <Phone size={13} />

                                  {committee.phone}

                                </p>
                              )}

                              {committee.email && (
                                <p className="flex items-center gap-2 text-xs text-muted">

                                  <Mail size={13} />

                                  {committee.email}

                                </p>
                              )}

                              {!committee.phone &&
                                !committee.email && (
                                  <span className="text-xs text-muted">
                                    —
                                  </span>
                                )}

                            </div>

                          </td>

                          {/* ACTIONS */}

                          <td className="px-4 py-4">

                            <div className="flex justify-end gap-2">

                              {/* EDIT */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(
                                    committee
                                  )
                                }
                                className="
                                  inline-flex
                                  cursor-pointer
                                  items-center
                                  gap-1.5
                                  rounded-lg
                                  border
                                  border-border
                                  bg-background
                                  px-3 py-2
                                  text-xs
                                  font-semibold
                                  text-primary
                                  transition
                                  hover:border-secondary
                                  hover:bg-secondary-light
                                  hover:text-secondary
                                "
                              >
                                <Edit2 size={14} />

                                সম্পাদনা
                              </button>

                              {/* DELETE */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    committee._id
                                  )
                                }
                                className="
                                  inline-flex
                                  cursor-pointer
                                  items-center
                                  gap-1.5
                                  rounded-lg
                                  border
                                  border-border
                                  bg-background
                                  px-3 py-2
                                  text-xs
                                  font-semibold
                                  text-red-600
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

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>
      </main>

      {/* ================================================= */}
      {/* FORM MODAL */}
      {/* ================================================= */}

      {showForm && (

        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">

          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-surface shadow-2xl">

            {/* ================================================= */}
            {/* MODAL HEADER */}
            {/* ================================================= */}

            <div className="flex shrink-0 items-center justify-between border-b border-border bg-primary px-5 py-4 sm:px-6">

              <div>

                <p className="text-xs text-white/60">
                  পরিচালনা কমিটি ব্যবস্থাপনা
                </p>

                <h2 className="mt-1 text-lg font-bold text-white">

                  {editingId
                    ? "তথ্য সম্পাদনা"
                    : "নতুন কমিটির সদস্য যোগ করুন"}

                </h2>

              </div>

              <button
                type="button"
                onClick={resetForm}
                className="
                  flex h-9 w-9
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-white
                  transition
                  hover:bg-white/20
                "
              >
                <X size={20} />
              </button>

            </div>

            {/* ================================================= */}
            {/* FORM */}
            {/* ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto p-5 sm:p-6"
            >

              {/* ERROR */}

              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* ================================================= */}
                {/* NAME */}
                {/* ================================================= */}

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
                      w-full
                      rounded-lg
                      border
                      border-border
                      bg-background
                      px-4 py-2.5
                      text-sm
                      text-primary
                      outline-none
                      transition
                      focus:border-secondary
                      focus:ring-2
                      focus:ring-secondary/20
                    "
                  />

                </div>

                {/* ================================================= */}
                {/* DESIGNATION */}
                {/* ================================================= */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-primary">
                    পদবি
                  </label>

                  <select
                    name="designation"
                    value={
                      formData.designation
                    }
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      rounded-lg
                      border
                      border-border
                      bg-background
                      px-4 py-2.5
                      text-sm
                      text-primary
                      outline-none
                      transition
                      focus:border-secondary
                      focus:ring-2
                      focus:ring-secondary/20
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

                {/* ================================================= */}
                {/* PHONE */}
                {/* ================================================= */}

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
                      w-full
                      rounded-lg
                      border
                      border-border
                      bg-background
                      px-4 py-2.5
                      text-sm
                      text-primary
                      outline-none
                      transition
                      focus:border-secondary
                      focus:ring-2
                      focus:ring-secondary/20
                    "
                  />

                </div>

                {/* ================================================= */}
                {/* EMAIL */}
                {/* ================================================= */}

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
                    placeholder="example@gmail.com"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-border
                      bg-background
                      px-4 py-2.5
                      text-sm
                      text-primary
                      outline-none
                      transition
                      focus:border-secondary
                      focus:ring-2
                      focus:ring-secondary/20
                    "
                  />

                </div>

              </div>

              {/* ================================================= */}
              {/* PHOTO */}
              {/* ================================================= */}

              <div className="mt-5">

                <label className="mb-2 block text-sm font-semibold text-primary">
                  কমিটির সদস্যের ছবি
                </label>

                <div
                  className="
                    flex flex-col gap-4
                    rounded-xl
                    border border-dashed
                    border-border
                    bg-background
                    p-4
                    sm:flex-row
                    sm:items-center
                  "
                >

                  {/* PREVIEW */}

                  {photoPreview ? (

                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="
                        h-24 w-24
                        rounded-lg
                        border
                        border-border
                        object-cover
                      "
                    />

                  ) : (

                    <div
                      className="
                        flex h-24 w-24
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-secondary-light
                        text-secondary
                      "
                    >
                      <UserRound size={30} />
                    </div>

                  )}

                  <div className="flex-1">

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={
                        handlePhotoChange
                      }
                      required={!editingId}
                      className="
                        block w-full
                        cursor-pointer
                        text-sm
                        text-muted
                        file:mr-4
                        file:cursor-pointer
                        file:rounded-lg
                        file:border-0
                        file:bg-secondary
                        file:px-4
                        file:py-2
                        file:font-semibold
                        file:text-white
                        hover:file:opacity-90
                      "
                    />

                    <p className="mt-2 text-xs text-muted">
                      JPG, PNG অথবা WebP •
                      সর্বোচ্চ ১ MB
                    </p>

                    {editingId &&
                      formData.photo &&
                      !photoFile && (

                        <p className="mt-1 text-xs text-secondary">
                          নতুন ছবি না দিলে
                          বর্তমান ছবিটি থাকবে।
                        </p>

                      )}

                  </div>

                </div>

              </div>

              {/* ================================================= */}
              {/* BUTTONS */}
              {/* ================================================= */}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                {/* CANCEL */}

                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isSubmitting}
                  className="
                    cursor-pointer
                    rounded-lg
                    border
                    border-border
                    bg-background
                    px-5 py-2.5
                    text-sm
                    font-semibold
                    text-primary
                    transition
                    hover:bg-secondary-light
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  বাতিল
                </button>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    inline-flex
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-secondary
                    px-5 py-2.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
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