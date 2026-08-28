'use client' // 1. Agregamos use client

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client"; // 2. Usamos el cliente del navegador
import { useEffect, useState } from "react";

export function BuyButton({ producto }: { producto: any }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // 3. Obtenemos la sesión actual del usuario desde el cliente
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getUser();
  }, [supabase]);

  // Mientras verifica si hay usuario, mostramos un botón deshabilitado
  if (loading) {
    return (
      <Button disabled className="w-full">
        Verificando...
      </Button>
    )
  }

  // Si HAY usuario logueado, botón de compra normal
  if (user) {
    return (
      <Button disabled={producto.stock === 0}>
        {producto.stock > 0 ? "Comprar Ahora" : "Agotado"}
      </Button>
    )
  }

  // Si NO HAY usuario logueado, botón que redirige al login
  return (
    <Button disabled={producto.stock === 0}>
      <Link href="/auth/login">
        {producto.stock > 0 ? "comprar" : "Agotado"}
      </Link>
    </Button>
  );
}