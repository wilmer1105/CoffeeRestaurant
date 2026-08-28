import { Badge } from "@/components/ui/badge"
import { BuyButton } from "./buy-button"
import { hasEnvVars } from "@/lib/utils";
import { EnvVarWarning } from "@/components/env-var-warning";
import { Suspense } from "react";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export function ProductCard({ producto }: { producto: any }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 flex flex-col h-full overflow-hidden">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRryG-fvikVI0MOPCau64FRv-SXBb7UgkK8M06697ZcqxaGRtUPjlEa1_G_&s=10"
        alt={producto.nombre}
        className="relative z-20 aspect-video w-full object-cover brightness-60 dark:brightness-40"
      />
      <CardHeader className="flex-grow">
        <CardAction>
          <Badge variant="secondary">{producto.categoria}</Badge>
        </CardAction>
        <CardTitle>{producto.nombre}</CardTitle>
        <CardDescription className="line-clamp-2">
          {producto.descripcion || "Sin descripción disponible."}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center mt-auto border-t pt-4">
        <span className="text-lg font-bold text-green-600">
          S/. {producto.precio.toFixed(2)}
        </span>
        <div className="flex items-center gap-4">
        {!hasEnvVars ? (<EnvVarWarning />):
        (<Suspense><BuyButton key={producto} producto={producto}></BuyButton></Suspense>

        )}
      </div>
      </CardFooter>
    </Card>
  )
}