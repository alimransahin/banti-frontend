import config from "@/config";

export default function Header() {
    return (
        <header
            style={{
                backgroundColor: "#E3F2FD",
                padding: "12px 15px",
                borderBottom: "3px solid #90CAF9",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                    flexWrap: "wrap",
                }}
            >
                {/* Logo + School Name */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flex: 1,
                        minWidth: 0,
                    }}
                >
                    {/* Logo */}
                    <div
                        style={{
                            width: "60px",
                            height: "70px",
                            background:
                                "linear-gradient(135deg, #FFC107 0%, #FFB300 100%)",
                            clipPath:
                                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            color: "#005A9C",
                            fontSize: "14px",
                            flexShrink: 0,
                        }}
                    >
                        DEMO
                    </div>

                    {/* School Name */}
                    <div
                        style={{
                            textAlign: "center",
                            minWidth: 0,
                        }}
                    >
                        <h1
                            style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "#D32F2F",
                                margin: 0,
                                fontFamily: '"Noto Sans Bengali", serif',
                                wordBreak: "break-word",
                            }}
                        >
                            {config.schoolNameBN}
                        </h1>

                        <p
                            style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#005A9C",
                                margin: "2px 0 0",
                            }}
                        >
                            {config.schoolNameEN}
                        </p>

                        <p
                            style={{
                                fontSize: "10px",
                                color: "#666",
                                margin: "2px 0 0",
                            }}
                        >
                            স্থাপিতঃ {config.estdYear} ইং
                        </p>
                    </div>
                </div>

                {/* School Information */}
                <div
                    className="school-info"
                    style={{
                        textAlign: "right",
                        fontSize: "12px",
                        minWidth: "180px",
                    }}
                >
                    <p
                        style={{
                            color: "#D32F2F",
                            fontWeight: "bold",
                            margin: "5px 0",
                        }}
                    >
                        EIIN: {config.eiin}
                    </p>

                    <p
                        style={{
                            color: "#005A9C",
                            fontWeight: "bold",
                            margin: "5px 0",
                        }}
                    >
                        Mobile No: {config.mobileNo}
                    </p>

                    <p
                        style={{
                            color: "#005A9C",
                            margin: "5px 0",
                        }}
                    >
                        E-mail: {config.email}
                    </p>
                </div>
            </div>
        </header>
    );
}