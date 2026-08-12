interface PageHeroProps {
    eyebrow: string;
    title: string;
    description: string;

    count?: number;
    countLabel?: string;
    countIcon?: string;
}

export default function PageHero({
    eyebrow,
    title,
    description,
    count,
    countLabel = "মোট",
    countIcon = "📢",
}: PageHeroProps) {
    return (
        <section className="relative mb-2 overflow-hidden rounded bg-primary">

            {/* Decorative Shapes */}
            <div className="absolute right-0 top-0 h-48 w-48 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/5" />

            <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/3 translate-y-1/3 rounded-full bg-white/5" />

            <div className="container-max relative p-4 ">

                <div
                    className={`
                        flex flex-col gap-8
                        ${count !== undefined
                            ? "md:flex-row md:items-end md:justify-between"
                            : ""
                        }
                    `}
                >

                    {/* Heading */}
                    <div className="max-w-3xl">

                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-10 bg-accent" />

                            <span className="text-sm font-semibold tracking-wide text-white/80">
                                {eyebrow}
                            </span>
                        </div>

                        <h1 className="mb-4 text-2xl font-bold leading-tight text-white sm:text-2xl md:text-3xl">
                            {title}
                        </h1>

                        <p className="max-w-2xl text-base leading-8 text-white/80 md:text-md">
                            {description}
                        </p>

                    </div>

                    {/* Count */}
                    {count !== undefined && (
                        <div className="shrink-0 hidden sm:inline-flex">

                            <div className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-lg">
                                    {countIcon}
                                </div>

                                <div>
                                    <p className="text-xs text-white/65">
                                        {countLabel}
                                    </p>

                                    <p className="text-lg font-bold text-white">
                                        {count} টি
                                    </p>
                                </div>

                            </div>

                        </div>
                    )}

                </div>

            </div>

        </section>
    );
}