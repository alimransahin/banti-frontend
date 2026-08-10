import Header from "./Header";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">

            <Header />

            <Navigation />

            <main className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-4 lg:px-6">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">

                    {/* Main Content */}
                    <section className="min-w-0">
                        {children}
                    </section>

                    {/* Sidebar */}
                    <aside className="min-w-0">
                        <Sidebar />
                    </aside>

                </div>
            </main>

            <Footer />

        </div>
    );
}