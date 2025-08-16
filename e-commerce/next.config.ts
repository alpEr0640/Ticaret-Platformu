import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["fakestoreapi.com"], 
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
