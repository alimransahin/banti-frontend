export default function Gallery() {
    const images = [
        "/assets/1.jpg",
        "/assets/2.jpg",
        "/assets/3.jpg",
        "/assets/4.jpg",
    ]
    return (
        <div>
            {/* ================= PHOTO GALLERY ================= */}
            <section className="mb-5 rounded-xl border border-border bg-surface p-5 shadow-sm">

                <div className="mb-4 flex items-center gap-3">

                    <div className="h-8 w-1 rounded-full bg-accent" />

                    <h2 className="text-lg font-bold text-primary">
                        ফটো গ্যালারি
                    </h2>

                </div>

                <div className={`grid grid-cols-2 gap-3 ${images.length > 4 && "sm:grid-cols-3"}`}>

                    {images.map((img, idx) => (

                        <div key={idx} className="aspect-square overflow-hidden rounded-lg bg-background">

                            <img
                                src={img}
                                alt={`Gallery ${idx + 1}`}
                                className="h-full w-full object-cover transition duration-300 hover:scale-105"
                            />

                        </div>

                    ))}

                </div>

            </section>

            {/* ================= VIDEO ================= */}
            <section className="mb-5 rounded-xl border border-border bg-surface p-5 shadow-sm">

                <div className="mb-4 flex items-center gap-3">
                    <div className="h-8 w-1 rounded-full bg-accent" />

                    <h2 className="text-lg font-bold text-primary">
                        প্রাতিষ্ঠানিক ভিডিও
                    </h2>
                </div>

                <div className="relative aspect-video overflow-hidden rounded-lg bg-primary-dark">

                    <iframe
                        className="absolute inset-0 h-full w-full"
                        src="https://www.youtube.com/embed/3K81-16o0Qw"
                        title="প্রাতিষ্ঠানিক ভিডিও"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />

                </div>

            </section>
        </div>
    )
}