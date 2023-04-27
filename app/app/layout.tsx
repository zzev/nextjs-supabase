import Providers from "./providers";

export const metadata = {
  title: "App",
  description: "NextJS 13 app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>/app/app/layout.tsx</div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
