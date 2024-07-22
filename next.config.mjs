/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "khqyahuhuknuctbwujqy.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;

////////////////////////////
// SECURE LOCAL HOST
// import autoCert from "anchor-pki/auto-cert/integrations/next";

// const withAutoCert = autoCert({
//   enabledEnv: "development",
// });

// export default withAutoCert(nextConfig);
