import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import React from "react";

import { dark } from "@clerk/themes";

import '../globals.css';

export const metadata = {
    title: "Threads Clone",
    description: "A clone of the Threads app using Next.js 14",
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children
}: {
    children: React.ReactNode 
}) {
    return (
    <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <html lang="en">
            <body className={`${inter.className} bg-dark-1`}>
                {children}
            </body>
        </html>
    </ClerkProvider>
    )
}