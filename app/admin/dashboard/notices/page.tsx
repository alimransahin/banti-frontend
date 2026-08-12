"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NoticeViewModal from "@/components/ui/NoticeViewModal";
import { getAdminSession } from "@/lib/data-store";

import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from "@/lib/notice-api";

import type { Notice } from "@/lib/notice-api";

import { AdminSidebar } from "@/components/AdminSidebar";

import {
  Edit2,
  Trash2,
  Plus,
  X,
  Upload,
  Bell,
  Image as ImageIcon,
  Eye,
} from "lucide-react";


// =====================================================
// FORM TYPE
// =====================================================

type NoticeForm = {
  title: string;
  details: string;
};

const initialForm: NoticeForm = {
  title: "",
  details: "",
};


// =====================================================
// COMPONENT
// =====================================================

export default function NoticesAdmin() {
  const router = useRouter();

  const [isAuthorized, setIsAuthorized] = useState(false);

  const [notices, setNotices] = useState<Notice[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<NoticeForm>(initialForm);

  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);

  const [attachmentPreview, setAttachmentPreview] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // =====================================================
  // AUTH + LOAD
  // =====================================================

  useEffect(() => {
    if (!getAdminSession()) {
      router.push("/admin");
      return;
    }

    setIsAuthorized(true);
    loadNotices();
  }, [router]);


  const loadNotices = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getNotices();

      const sorted = [...data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

      setNotices(sorted);
    } catch (error) {
      console.error(
        "Load notices error:",
        error
      );

      setError(
        "নোটিশের তথ্য লোড করা যায়নি।"
      );
    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // =====================================================
  // FILE CHANGE
  // =====================================================

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(
      e.target.files || []
    );

    setError("");

    if (files.length === 0) {
      return;
    }

    // Maximum 1 MB per image
    const invalidSize = files.find(
      (file) => file.size > 1024 * 1024
    );

    if (invalidSize) {
      setError(
        "প্রতিটি ছবির সাইজ সর্বোচ্চ ১ MB হতে হবে।"
      );

      e.target.value = "";
      return;
    }

    // Allowed formats
    const invalidType = files.find(
      (file) =>
        ![
          "image/jpeg",
          "image/png",
          "image/webp",
        ].includes(file.type)
    );

    if (invalidType) {
      setError(
        "শুধুমাত্র JPG, PNG অথবা WebP ছবি আপলোড করা যাবে।"
      );

      e.target.value = "";
      return;
    }

    setAttachmentFiles(files);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setAttachmentPreview(previews);
  };


  // =====================================================
  // RESET
  // =====================================================

  const resetForm = () => {
    setFormData(initialForm);

    setAttachmentFiles([]);

    setAttachmentPreview([]);

    setEditingId(null);

    setShowForm(false);

    setError("");
  };


  // =====================================================
  // OPEN ADD FORM
  // =====================================================

  const openAddForm = () => {
    setFormData(initialForm);

    setAttachmentFiles([]);

    setAttachmentPreview([]);

    setEditingId(null);

    setError("");

    setShowForm(true);
  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const data = new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "details",
        formData.details
      );

      attachmentFiles.forEach((file) => {
        data.append(
          "attachment",
          file
        );
      });

      // UPDATE
      if (editingId) {
        await updateNotice(
          editingId,
          data
        );
      }

      // CREATE
      else {
        await createNotice(data);
      }

      await loadNotices();

      resetForm();

    } catch (error) {
      console.error(
        "Notice submit error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "নোটিশ সংরক্ষণ করা যায়নি।"
      );

    } finally {
      setIsSubmitting(false);
    }
  };


  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (
    notice: Notice
  ) => {
    setFormData({
      title: notice.title,
      details: notice.details,
    });

    setEditingId(notice._id);

    setAttachmentFiles([]);

    setAttachmentPreview(
      notice.attachment || []
    );

    setError("");

    setShowForm(true);
  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        "আপনি কি এই নোটিশটি মুছে ফেলতে চান?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteNotice(id);

      await loadNotices();

    } catch (error) {
      console.error(
        "Delete notice error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "নোটিশ মুছে ফেলা যায়নি।"
      );
    }
  };


  // =====================================================
  // AUTH LOADING
  // =====================================================

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-primary">
        লোড হচ্ছে...
      </div>
    );
  }


  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-background">

      <AdminSidebar />

      <main className="min-h-screen">

        <div className="px-4 pb-8 pt-20 sm:px-5 sm:pt-20 lg:px-8 lg:pt-8">


          {/* =========================================
              HEADER
          ========================================= */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <span className="h-px w-8 bg-secondary" />

                <span className="text-xs font-semibold tracking-wide text-secondary">
                  প্রশাসনিক প্যানেল
                </span>

              </div>

              <h1 className="text-2xl font-bold text-primary sm:text-3xl">
                নোটিশ ব্যবস্থাপনা
              </h1>

              <p className="mt-1 text-sm text-muted">
                বিদ্যালয়ের নোটিশ যোগ, সম্পাদনা এবং মুছে ফেলুন।
              </p>

            </div>


            <button
              type="button"
              onClick={openAddForm}
              className="
                inline-flex cursor-pointer
                items-center justify-center gap-2
                rounded-lg bg-secondary
                px-4 py-2.5
                text-sm font-semibold text-white
                shadow-sm transition
                hover:opacity-90
              "
            >
              <Plus size={18} />

              নতুন নোটিশ
            </button>

          </div>


          {/* =========================================
              ERROR
          ========================================= */}

          {error && (
            <div className="
              mb-5 rounded-lg
              border border-red-200
              bg-red-50 px-4 py-3
              text-sm text-red-600
            ">
              {error}
            </div>
          )}


          {/* =========================================
              STATS
          ========================================= */}

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">


            {/* Total */}

            <div className="
              rounded-xl border border-border
              bg-surface p-5 shadow-sm
            ">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-muted">
                    মোট নোটিশ
                  </p>

                  <p className="mt-1 text-3xl font-bold text-primary">
                    {notices.length}
                  </p>

                </div>

                <div className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-lg bg-secondary-light
                  text-secondary
                ">
                  <Bell size={22} />
                </div>

              </div>

            </div>


            {/* Latest */}

            <div className="
              rounded-xl border border-border
              bg-surface p-5 shadow-sm
            ">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-muted">
                    সর্বশেষ নোটিশ
                  </p>

                  <p className="mt-1 text-lg font-bold text-secondary">
                    {notices.length > 0
                      ? "প্রকাশিত"
                      : "নেই"}
                  </p>

                </div>

                <div className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-lg bg-secondary-light
                  text-secondary
                ">
                  <Bell size={22} />
                </div>

              </div>

            </div>


            {/* Attachment */}

            <div className="
              rounded-xl border border-border
              bg-surface p-5 shadow-sm
            ">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-muted">
                    সংযুক্তি
                  </p>

                  <p className="mt-1 text-lg font-bold text-primary">
                    ছবি
                  </p>

                </div>

                <div className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-lg bg-secondary-light
                  text-secondary
                ">
                  <ImageIcon size={22} />
                </div>

              </div>

            </div>

          </div>


          {/* =========================================
              NOTICE TABLE / LIST
          ========================================= */}

          <div className="
            overflow-hidden rounded-xl
            border border-border
            bg-surface shadow-sm
          ">

            {loading ? (

              <div className="px-5 py-14 text-center">

                <div className="
                  mx-auto mb-4
                  h-8 w-8 animate-spin
                  rounded-full border-4
                  border-border
                  border-t-secondary"
                />

                <p className="text-sm text-muted">
                  নোটিশ লোড হচ্ছে...
                </p>

              </div>

            ) : notices.length === 0 ? (

              <div className="px-5 py-14 text-center">

                <div className="
                  mx-auto mb-4
                  flex h-14 w-14
                  items-center justify-center
                  rounded-full
                  bg-secondary-light
                  text-secondary
                ">
                  <Bell size={25} />
                </div>

                <h3 className="text-lg font-bold text-primary">
                  কোনো নোটিশ যোগ করা হয়নি
                </h3>

                <p className="mt-1 text-sm text-muted">
                  প্রথম নোটিশটি প্রকাশ করতে নিচের বাটনে ক্লিক করুন।
                </p>

                <button
                  type="button"
                  onClick={openAddForm}
                  className="
                    mt-5 inline-flex
                    cursor-pointer
                    items-center gap-2
                    rounded-lg bg-secondary
                    px-5 py-2.5
                    text-sm font-semibold text-white
                    transition hover:opacity-90
                  "
                >
                  <Plus size={17} />
                  প্রথম নোটিশ যোগ করুন
                </button>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-225">

                  <thead className="
                    border-b border-border
                    bg-background
                  ">

                    <tr>

                      <th className="
                        px-4 py-3 text-left
                        text-xs font-semibold text-muted
                      ">
                        নোটিশ
                      </th>

                      <th className="
                        px-4 py-3 text-left
                        text-xs font-semibold text-muted
                      ">
                        প্রকাশের তারিখ
                      </th>

                      <th className="
                        px-4 py-3 text-left
                        text-xs font-semibold text-muted
                      ">
                        সংযুক্তি
                      </th>

                      <th className="
                        px-4 py-3 text-right
                        text-xs font-semibold text-muted
                      ">
                        অ্যাকশন
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {notices.map((notice) => (

                      <tr
                        key={notice._id}
                        className="
                          border-b border-border
                          last:border-b-0
                          hover:bg-secondary-light/30
                        "
                      >

                        {/* Notice */}

                        <td className="px-4 py-4">

                          <div className="max-w-lg">

                            <p className="
                              text-sm font-semibold
                              text-primary
                            ">
                              {notice.title}
                            </p>
                          </div>

                        </td>


                        {/* Date */}

                        <td className="px-4 py-4">

                          <span className="
                            whitespace-nowrap
                            text-sm text-primary
                          ">
                            {new Date(
                              notice.createdAt
                            ).toLocaleDateString(
                              "bn-BD",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>

                        </td>


                        {/* Attachment */}

                        <td className="px-4 py-4">

                          {notice.attachment?.length > 0 ? (

                            <div className="flex items-center gap-2">

                              <div className="
                                flex h-9 w-9
                                items-center justify-center
                                rounded-lg
                                bg-secondary-light
                                text-secondary
                              ">
                                <ImageIcon size={17} />
                              </div>

                              <span className="
                                text-xs font-medium
                                text-muted
                              ">
                                {notice.attachment.length}টি ছবি
                              </span>

                            </div>

                          ) : (

                            <span className="text-xs text-muted">
                              নেই
                            </span>

                          )}

                        </td>


                        {/* Actions */}

                        <td className="px-4 py-4">

                          <div className="
                            flex justify-end gap-2
                          ">
                            <button
                              type="button"
                              onClick={() => setSelectedNotice(notice)}
                              className=" inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-primary transition hover:border-secondary hover:bg-secondary-light hover:text-secondary" >
                              <Eye size={14} />
                              বিস্তারিত
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(notice)
                              }
                              className="
                                inline-flex cursor-pointer
                                items-center gap-1.5
                                rounded-lg
                                border border-border
                                bg-background
                                px-3 py-2
                                text-xs font-semibold
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


                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  notice._id
                                )
                              }
                              className="
                                inline-flex cursor-pointer
                                items-center gap-1.5
                                rounded-lg
                                border border-border
                                bg-background
                                px-3 py-2
                                text-xs font-semibold
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

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </main >


      {/* =========================================
          FORM MODAL
      ========================================= */}

      {
        showForm && (

          <div className="
          fixed inset-0 z-60
          flex items-center justify-center
          bg-black/60 p-4
        ">

            <div className="
            flex max-h-[92vh]
            w-full max-w-3xl
            flex-col overflow-hidden
            rounded-xl bg-surface
            shadow-2xl
          ">


              {/* Modal Header */}

              <div className="
              flex shrink-0
              items-center justify-between
              border-b border-border
              bg-primary
              px-5 py-4
              sm:px-6
            ">

                <div>

                  <p className="text-xs text-white/60">
                    নোটিশ ব্যবস্থাপনা
                  </p>

                  <h2 className="
                  mt-1 text-lg
                  font-bold text-white
                ">
                    {editingId
                      ? "নোটিশ সম্পাদনা"
                      : "নতুন নোটিশ প্রকাশ করুন"}
                  </h2>

                </div>


                <button
                  type="button"
                  onClick={resetForm}
                  className="
                  flex h-9 w-9
                  cursor-pointer
                  items-center justify-center
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


              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="
                overflow-y-auto
                p-5 sm:p-6
              "
              >

                {/* Error */}

                {error && (

                  <div className="
                  mb-5 rounded-lg
                  border border-red-200
                  bg-red-50
                  px-4 py-3
                  text-sm text-red-600
                ">
                    {error}
                  </div>

                )}


                {/* Title */}

                <div>

                  <label className="
                  mb-2 block
                  text-sm font-semibold
                  text-primary
                ">
                    নোটিশের শিরোনাম
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="নোটিশের শিরোনাম লিখুন"
                    className="
                    w-full rounded-lg
                    border border-border
                    bg-background
                    px-4 py-2.5
                    text-sm text-primary
                    outline-none transition
                    focus:border-secondary
                    focus:ring-2
                    focus:ring-secondary/20
                  "
                  />

                </div>


                {/* Details */}

                <div className="mt-5">

                  <label className="
                  mb-2 block
                  text-sm font-semibold
                  text-primary
                ">
                    নোটিশের বিস্তারিত
                  </label>

                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    required
                    rows={9}
                    placeholder="নোটিশের বিস্তারিত তথ্য লিখুন..."
                    className="
                    w-full resize-y
                    rounded-lg
                    border border-border
                    bg-background
                    px-4 py-2.5
                    text-sm leading-7
                    text-primary
                    outline-none transition
                    focus:border-secondary
                    focus:ring-2
                    focus:ring-secondary/20
                  "
                  />

                </div>


                {/* Attachment */}

                <div className="mt-5">

                  <label className="
                  mb-2 block
                  text-sm font-semibold
                  text-primary
                ">
                    সংযুক্ত ছবি
                    <span className="
                    ml-1 text-xs
                    font-normal text-muted
                  ">
                      (ঐচ্ছিক)
                    </span>
                  </label>


                  <div className="
                  rounded-xl
                  border border-dashed
                  border-border
                  bg-background
                  p-4
                ">

                    <div className="
                    flex flex-col gap-4
                    sm:flex-row
                    sm:items-center
                  ">

                      <div className="
                      flex h-16 w-16
                      shrink-0
                      items-center justify-center
                      rounded-lg
                      bg-secondary-light
                      text-secondary
                    ">
                        <Upload size={25} />
                      </div>


                      <div className="flex-1">

                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          multiple
                          onChange={
                            handleFileChange
                          }
                          className="
                          block w-full
                          cursor-pointer
                          text-sm text-muted
                          file:mr-4
                          file:cursor-pointer
                          file:rounded-lg
                          file:border-0
                          file:bg-secondary
                          file:px-4 file:py-2
                          file:font-semibold
                          file:text-white
                          hover:file:opacity-90
                        "
                        />

                        <p className="
                        mt-2 text-xs
                        text-muted
                      ">
                          JPG, PNG অথবা WebP •
                          প্রতিটি ছবি সর্বোচ্চ ১ MB
                        </p>

                        {editingId && (
                          <p className="
                          mt-1 text-xs
                          text-secondary
                        ">
                            নতুন ছবি নির্বাচন করলে নতুন ছবি আপলোড হবে।
                          </p>
                        )}

                      </div>

                    </div>

                  </div>

                </div>


                {/* Preview */}

                {attachmentPreview.length > 0 && (

                  <div className="mt-5">

                    <div className="
                    mb-2 flex
                    items-center justify-between
                  ">

                      <p className="
                      text-sm font-semibold
                      text-primary
                    ">
                        সংযুক্ত ছবির প্রিভিউ
                      </p>

                      <span className="
                      text-xs text-muted
                    ">
                        {attachmentPreview.length}টি ছবি
                      </span>

                    </div>


                    <div className="
                    grid grid-cols-2
                    gap-3 sm:grid-cols-3
                  ">

                      {attachmentPreview.map(
                        (image, index) => (

                          <div
                            key={`${image}-${index}`}
                            className="
                            group relative
                            overflow-hidden
                            rounded-lg
                            border border-border
                            bg-background
                          "
                          >

                            <img
                              src={image}
                              alt={`সংযুক্ত ছবি ${index + 1}`}
                              className="
                              h-28 w-full
                              object-cover
                            "
                            />

                            <div className="
                            absolute bottom-0
                            left-0 right-0
                            bg-black/50
                            px-2 py-1
                            text-center
                            text-xs text-white
                          ">
                              ছবি {index + 1}
                            </div>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                )}


                {/* Buttons */}

                <div className="
                mt-6 flex
                flex-col-reverse
                gap-3
                border-t border-border
                pt-5
                sm:flex-row
                sm:justify-end
              ">

                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isSubmitting}
                    className="
                    cursor-pointer
                    rounded-lg
                    border border-border
                    bg-background
                    px-5 py-2.5
                    text-sm font-semibold
                    text-primary
                    transition
                    hover:bg-secondary-light
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
                    inline-flex
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-secondary
                    px-5 py-2.5
                    text-sm font-semibold
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
                        ? "নোটিশ আপডেট করুন"
                        : "নোটিশ প্রকাশ করুন"}

                  </button>

                </div>

              </form>

            </div>

          </div>

        )
      }
      <NoticeViewModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />

    </div >
  );
}