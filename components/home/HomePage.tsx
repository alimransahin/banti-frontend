import ChairmanPrincipal from "./ChairmanPrincipal";
import NoticeHeroAbout from "./NoticeHeroAbout";
import Gallery from "./Gallery";

export default function HomePage() {

    return (
        <main className="w-full">

            <NoticeHeroAbout />

            <ChairmanPrincipal />

            <Gallery />

        </main>
    );
}


