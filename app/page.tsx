import { EnvVarWarning } from "@/components/Login/env-var-warning";
import { AuthButton } from "@/components/Login/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { CarouselOfertas } from "@/components/carrusel-ofertas";
import { ProductCatalog } from "@/components/productocatalog";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";


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
        <CarouselOfertas/>
        <ProductCatalog/>
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
