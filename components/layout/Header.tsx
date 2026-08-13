import config from "@/config";

export default function Header() {
    return (
        <header className="bg-surface">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">

                    {/* ================= LOGO + SCHOOL NAME ================= */}
                    <div className="flex w-full min-w-0 items-center gap-3 sm:w-auto">

                        {/* Logo */}
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center sm:h-20 sm:w-20">
                            <img
                                src="/assets/logo.png"
                                alt={`${config.schoolNameBN} Logo`}
                                className="h-full w-full object-contain"
                            />
                        </div>

                        {/* School Name */}
                        <div className="min-w-0 text-center sm:text-left">

                            <h1
                                className="
                                    m-0
                                    text-[16px] font-bold leading-tight
                                    text-primary
                                    sm:text-[18px]
                                "
                            >
                                {config.schoolNameBN}
                            </h1>

                            <p
                                className=" m-0 mt-1 text-[12px] font-bold leading-tight text-secondary sm:text-[20px]">
                                {config.schoolNameEN}
                            </p>

                            <p className="m-0 mt-1 text-[10px] text-text-light sm:text-[11px]">
                                স্থাপিতঃ {config.estdYear} ইং
                            </p>

                        </div>
                    </div>

                    {/* ================= SCHOOL INFORMATION ================= */}
                    <div
                        className="
                            w-full text-center
                            text-[11px]
                            sm:w-auto sm:text-right sm:text-[12px]
                        "
                    >

                        <p className="m-1 font-bold text-primary">
                            EIIN: {config.eiin}
                        </p>
                        <p className="m-1 font-bold text-primary">
                            MPO Code: {config.mpo}
                        </p>

                        <p className="m-1 font-bold text-secondary">
                            Mobile No: {config.mobileNo}
                        </p>

                        <p className="m-1 break-all text-text-light">
                            E-mail: {config.email}
                        </p>

                    </div>

                </div>
            </div>
        </header>
    );
}