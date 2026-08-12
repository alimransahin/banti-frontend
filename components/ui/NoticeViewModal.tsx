"use client";

import { CalendarDays, FileImage, X } from "lucide-react";
import { useState } from "react";

export type NoticeViewData = {
    _id: string;
    title: string;
    details: string;
    createdAt: string;
    attachment?: string[];
};

type NoticeViewModalProps = {
    notice: NoticeViewData | null;
    onClose: () => void;
};

export default function NoticeViewModal({
    notice,
    onClose,
}: NoticeViewModalProps) {
    const [selectedImage, setSelectedImage] =
        useState<string | null>(null);

    if (!notice) {
        return null;
    }

    const handleClose = () => {
        setSelectedImage(null);
        onClose();
    };

    return (
        <>
            {/* ================= NOTICE MODAL ================= */}
            <div
                className="
          fixed inset-0 z-[60]
          flex items-center justify-center
          bg-black/70 p-4
        "
                onClick={handleClose}
            >
                <div
                    className="
            relative flex
            max-h-[92vh]
            w-full max-w-4xl
            flex-col overflow-hidden
            rounded-xl bg-surface
            shadow-2xl
          "
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* ================= HEADER ================= */}
                    <div
                        className="
              flex shrink-0
              items-start justify-between gap-4
              border-b border-border
              bg-primary
              px-5 py-4
              sm:px-6
            "
                    >
                        <div className="min-w-0">
                            <p className="mb-1 text-xs font-medium text-white/70">
                                নোটিশ
                            </p>

                            <h2
                                className="
                  text-lg font-bold
                  leading-snug text-white
                  sm:text-xl
                "
                            >
                                {notice.title}
                            </h2>

                            <div
                                className="
                  mt-2 flex items-center gap-2
                  text-xs text-white/70
                "
                            >
                                <CalendarDays size={14} />

                                <span>
                                    প্রকাশের তারিখ:{" "}
                                    {new Date(notice.createdAt).toLocaleDateString(
                                        "bn-BD",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Close */}
                        <button
                            type="button"
                            onClick={handleClose}
                            className="
                flex h-9 w-9 shrink-0
                cursor-pointer
                items-center justify-center
                rounded-full
                bg-white/10
                text-white
                transition
                hover:bg-white/20
              "
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* ================= CONTENT ================= */}
                    <div
                        className="
              overflow-y-auto
              px-5 py-5
              sm:px-6 sm:py-6
            "
                    >
                        {/* Details */}
                        <div className="mb-6">
                            <div className="mb-3 flex items-center gap-2">
                                <span className="h-px w-7 bg-secondary" />

                                <h3 className="text-sm font-bold text-primary">
                                    বিস্তারিত
                                </h3>
                            </div>

                            <p
                                className="
                  whitespace-pre-line
                  text-sm leading-7
                  text-muted
                  sm:text-base
                "
                            >
                                {notice.details}
                            </p>
                        </div>

                        {/* Attachments */}
                        {notice.attachment &&
                            notice.attachment.length > 0 && (
                                <div>
                                    <div className="mb-3 flex items-center gap-2">
                                        <FileImage
                                            size={17}
                                            className="text-secondary"
                                        />

                                        <h3 className="text-sm font-bold text-primary">
                                            সংযুক্ত ছবি
                                        </h3>
                                    </div>

                                    <div
                                        className="
                      grid grid-cols-1
                      gap-4
                      sm:grid-cols-2
                      md:grid-cols-3
                    "
                                    >
                                        {notice.attachment.map(
                                            (image, index) => (
                                                <button
                                                    key={`${image}-${index}`}
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedImage(image)
                                                    }
                                                    className="
                            group
                            cursor-pointer
                            overflow-hidden
                            rounded-lg
                            border border-border
                            bg-background
                          "
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`${notice.title} - ছবি ${index + 1
                                                            }`}
                                                        className="
                              h-56 w-full
                              object-contain
                              transition
                              duration-300
                              group-hover:scale-105
                              sm:h-64
                            "
                                                    />
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>

            {/* ================= IMAGE MODAL ================= */}
            {selectedImage && (
                <div
                    className="
            fixed inset-0 z-[70]
            flex items-center justify-center
            bg-black/95
            p-3 sm:p-6
          "
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        alt="নোটিশের সংযুক্ত ছবি"
                        className="
              max-h-full
              max-w-full
              object-contain
            "
                    />

                    <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        className="
              absolute
              right-4 top-4
              flex h-10 w-10
              cursor-pointer
              items-center justify-center
              rounded-full
              bg-white/10
              text-white
              transition
              hover:bg-white/20
              sm:right-6 sm:top-6
            "
                        aria-label="Close image"
                    >
                        <X size={22} />
                    </button>
                </div>
            )}
        </>
    );
}