export default function Gallery() {
    return (
        <div>            {/* ================= VIDEO ================= */}
            <section className="mb-5 rounded-xl border border-border bg-surface p-5 shadow-sm">

                <div className="mb-4 flex items-center gap-3">

                    <div className="h-8 w-1 rounded-full bg-accent" />

                    <h2 className="text-lg font-bold text-primary">
                        প্রাতিষ্ঠানিক ভিডিও
                    </h2>

                </div>

                <div className="relative aspect-video overflow-hidden rounded-lg bg-primary-dark">

                    <iframe
                        src="https://www.youtube.com/embed/jNgP6d9HraI?rel=0"
                        title="School Institutional Video"
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />

                </div>

            </section>


            {/* ================= PHOTO GALLERY ================= */}
            <section className="mb-5 rounded-xl border border-border bg-surface p-5 shadow-sm">

                <div className="mb-4 flex items-center gap-3">

                    <div className="h-8 w-1 rounded-full bg-accent" />

                    <h2 className="text-lg font-bold text-primary">
                        ফটো গ্যালারি
                    </h2>

                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                    {[
                        "https://images.unsplash.com/photo-1564629667269-b4cf1a40d92f?w=250&h=200&fit=crop",
                        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=250&h=200&fit=crop",
                        "https://images.unsplash.com/photo-1427504494785-cdec15f50a0d?w=250&h=200&fit=crop",
                        "https://images.unsplash.com/photo-1491841573634-28cb1b47b619?w=250&h=200&fit=crop",
                        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=250&h=200&fit=crop",
                        "https://images.unsplash.com/photo-1488190211105-8342881b2b94?w=250&h=200&fit=crop",
                    ].map((img, idx) => (

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
        </div>
    )
}