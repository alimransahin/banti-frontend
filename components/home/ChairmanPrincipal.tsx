"use client";

import { useEffect, useState } from "react";
import { getTeachers } from "@/lib/teacher-api";
import { getCommittees } from "@/lib/committee-api";
import schoolContent from "@/data/schoolContent.json";

type Person = {
    title: string;
    name: string;
    image: string;
    content: string;
};

export default function ChairmanPrincipal() {
    const [selectedPerson, setSelectedPerson] =
        useState<Person | null>(null);

    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teachers, committees] = await Promise.all([
                    getTeachers(),
                    getCommittees(),
                ]);

                // ================= CHAIRMAN =================
                const chairman = committees.find(
                    (committee) =>
                        committee.designation === "সভাপতি"
                );

                // ================= PRINCIPAL =================
                const principal = teachers.find(
                    (teacher) =>
                        teacher.designation === "প্রধান শিক্ষক"
                );

                const data: Person[] = [];

                // Chairman found
                if (chairman) {
                    data.push({
                        title: schoolContent[1].title,
                        name: chairman.name,
                        image: chairman.photo || "",
                        content: schoolContent[1].content,
                    });
                }

                // Principal found
                if (principal) {
                    data.push({
                        title: schoolContent[2].title,
                        name: principal.name,
                        image: principal.photo || "",
                        content: schoolContent[2].content,
                    });
                }

                setPeople(data);

            } catch (error) {
                console.error(
                    "Failed to fetch chairman and principal:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Loading
    if (loading) {
        return (
            <div className="rounded-xl border border-border bg-surface p-10 text-center">
                তথ্য লোড হচ্ছে...
            </div>
        );
    }

    return (
        <>
            {/* ================= CHAIRMAN + PRINCIPAL ================= */}
            <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                {people.map((person) => (
                    <section
                        key={person.title}
                        className="
                            rounded-xl
                            border
                            border-border
                            bg-surface
                            p-5
                            shadow-sm
                        "
                    >

                        {/* Image */}
                        <div className="mb-4">
                            {person.image ? (
                                <img
                                    src={person.image}
                                    alt={person.name}
                                    className="
                                        aspect-[3/4]
                                        w-full
                                        max-h-[300px]
                                        rounded-xl
                                        object-cover
                                        shadow-sm
                                    "
                                />
                            ) : (
                                <div
                                    className="
                                        flex
                                        aspect-[3/4]
                                        max-h-[300px]
                                        w-full
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary
                                        text-5xl
                                    "
                                >
                                    👤
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <span
                            className="
                                mb-2
                                inline-block
                                rounded-full
                                bg-secondary-light
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                text-secondary
                            "
                        >
                            {person.title}
                        </span>

                        {/* Name */}
                        <h3
                            className="
                                mb-2
                                text-lg
                                font-bold
                                leading-snug
                                text-primary
                            "
                        >
                            {person.name}
                        </h3>

                        {/* Preview */}
                        <p
                            className="
                                text-sm
                                leading-7
                                text-text
                                text-justify
                            "
                        >
                            {person.content.split("\n\n")[0]}
                        </p>

                        {/* Details */}
                        <button
                            type="button"
                            onClick={() =>
                                setSelectedPerson(person)
                            }
                            className="
                                mt-3
                                font-semibold
                                text-primary
                                hover:text-secondary
                            "
                        >
                            বিস্তারিত →
                        </button>

                    </section>
                ))}

            </div>

            {/* ================= MODAL ================= */}
            {selectedPerson && (
                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/60
                        p-4
                        backdrop-blur-sm
                    "
                    onClick={() => setSelectedPerson(null)}
                >
                    <div
                        className="
                            relative
                            max-h-[90vh]
                            w-full
                            max-w-2xl
                            overflow-hidden
                            rounded-2xl
                            bg-surface
                            shadow-2xl
                        "
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Close */}
                        <button
                            type="button"
                            onClick={() =>
                                setSelectedPerson(null)
                            }
                            className="
                                absolute
                                right-4
                                top-4
                                z-10
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-black/60
                                text-xl
                                text-white
                            "
                        >
                            ×
                        </button>

                        <div className="max-h-[90vh] overflow-y-auto">

                            {selectedPerson.image && (
                                <img
                                    src={selectedPerson.image}
                                    alt={selectedPerson.name}
                                    className="
                                        h-[260px]
                                        w-full
                                        object-cover
                                        sm:h-[320px]
                                    "
                                />
                            )}

                            <div className="p-5 sm:p-7">

                                <span
                                    className="
                                        mb-2
                                        inline-block
                                        rounded-full
                                        bg-secondary-light
                                        px-3
                                        py-1
                                        text-xs
                                        font-semibold
                                        text-secondary
                                    "
                                >
                                    {selectedPerson.title}
                                </span>

                                <h2
                                    className="
                                        mb-5
                                        text-2xl
                                        font-bold
                                        text-primary
                                    "
                                >
                                    {selectedPerson.name}
                                </h2>

                                <div
                                    className="
                                        whitespace-pre-line
                                        text-sm
                                        leading-8
                                        text-text
                                        text-justify
                                    "
                                >
                                    {selectedPerson.content}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}