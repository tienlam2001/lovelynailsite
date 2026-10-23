const imageHosts = ["media.base44.com", "firebasestorage.googleapis.com"];

const nextConfig = {
  images: {
    remotePatterns: imageHosts.map((hostname) => ({
      protocol: "https" as const,
      hostname,
      pathname: "/**",
    })),
    contentSecurityPolicy:
      "default-src 'none'; img-src 'self' https://media.base44.com https://firebasestorage.googleapis.com; script-src 'none'; style-src 'none'; sandbox;",
  },
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://media.base44.com https://firebasestorage.googleapis.com",
      "font-src 'self' data:",
      "connect-src 'self' https://firestore.googleapis.com",
      "frame-src https://www.google.com https://operatix-profit-flow.base44.app",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://firestore.googleapis.com",
    ].join("; ");
    const header = { key: "Content-Security-Policy", value: contentSecurityPolicy };
    return [
      { source: "/", headers: [header] },
      { source: "/:path*", headers: [header] },
    ];
  },
};

export default nextConfig;
