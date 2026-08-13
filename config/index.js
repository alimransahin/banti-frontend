const config = {
  schoolNameBN: process.env.NEXT_PUBLIC_SCHOOL_NAME_BN || "",
  schoolNameEN: process.env.NEXT_PUBLIC_SCHOOL_NAME_EN || "",
  estdYear: process.env.NEXT_PUBLIC_ESTD_YEAR || "",
  eiin: process.env.NEXT_PUBLIC_EIIN || "",
  mpo: process.env.NEXT_PUBLIC_MPO || "",
  mobileNo: process.env.NEXT_PUBLIC_MOBILE_NO || "",
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  principalName: process.env.NEXT_PUBLIC_PRINCIPAL_NAME || "",
  chairmanName: process.env.NEXT_PUBLIC_CHAIRMAN_NAME || "",
  address: process.env.NEXT_PUBLIC_ADDRESS || "",

  baseURL: process.env.NEXT_PUBLIC_API_URL,
};

export default config;
