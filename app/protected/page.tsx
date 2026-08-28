import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { CarouselSpacing } from "@/components/carrusel-rest";
import { ProductCatalog } from "@/components/productocatalog";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Coffee Restaurant</Link>
            </div>
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}<ThemeSwitcher/>
          </div>
        </nav>
        <CarouselSpacing></CarouselSpacing>
        <div id ="catalogproduct" className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          
          <main className="flex-1 flex flex-col gap-6 px-4 w-full py-8"> 
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            Nuestro Catálogo
            </h2>
          <ProductCatalog/>
          </main>
          
        </div>
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8">
          <p>
            Powered by{" "}
            <a
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Pie de Pagina
            </a>
          </p>
          
        </footer>
      </div>
    </main>
  );
}
