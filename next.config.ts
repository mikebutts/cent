import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    FIREBASE_SERVICE_ACCOUNT_BASE64:
      process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
  },
};

export default nextConfig;
