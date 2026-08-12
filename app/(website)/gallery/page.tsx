import Gallery from "@/components/home/Gallery";
import PageHero from "@/components/ui/PageHero";

export default function page() {
    return (
        <div>

            {/* Header */}
            <PageHero
                eyebrow="গ্যালারি"
                title="ছবির গ্যালারি"
                description="বিদ্যালয়ের বিভিন্ন কার্যক্রম ও অনুষ্ঠানগুলোর ছবি এখানে দেখতে পারবেন।"
            />

            <Gallery />

        </div>
    )
}