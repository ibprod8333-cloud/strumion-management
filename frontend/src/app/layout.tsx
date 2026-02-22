import "@/app/globals.css";
import { getLocale } from "@/i18n/server";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartModalProvider } from "@/context/cart-modal";
import { AuthProvider } from "@/context/AuthContext";
import { Footer } from "@/ui/footer/footer";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import {AuthGuard} from "@/components/guards/AuthGuard";


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const locale = await getLocale();

    return (
        <html lang={locale} className="h-full antialiased">
        <body className="flex min-h-full flex-col">
        <AuthProvider>
            <AuthGuard>
                <CartModalProvider>
                    <TooltipProvider>
                        <div className="flex min-h-screen bg-neutral-50">
                            <DashboardSidebar />
                            <div className="flex-1 flex flex-col ml-60">
                                <DashboardHeader />
                                <main className="flex-1 p-6">{children}</main>
                                <Footer />
                            </div>
                        </div>
                    </TooltipProvider>
                </CartModalProvider>
            </AuthGuard>
        </AuthProvider>
        </body>
        </html>
    );
}