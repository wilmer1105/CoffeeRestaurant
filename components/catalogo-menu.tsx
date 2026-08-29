'use client'

import { useState } from "react"
import { ProductCatalog } from "@/components/productocatalog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function MenuCatalogo() {
  // Aquí guardaremos la categoría seleccionada para el filtro
  const [categoria, setCategoria] = useState<string>("Todas")

  // Lista de categorías de ejemplo
  const categorias = ["Todas", "General", "Bebidas", "Postres", "Combos"]

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl mx-auto py-8">
      
      {/* 1. BARRA LATERAL IZQUIERDA (FILTROS) */}
      <aside className="w-full md:w-1/4 lg:w-1/5 shrink-0">
        <div className="sticky top-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Filtrar por</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-3 text-gray-600">Categorías</h4>
              <div className="space-y-3">
                {categorias.map((cat) => (
                  <div key={cat} className="flex items-center space-x-2">
                    <Checkbox 
                      id={cat} 
                      checked={categoria === cat}
                      onCheckedChange={() => setCategoria(cat)}
                    />
                    <Label htmlFor={cat} className="text-sm cursor-pointer">
                      {cat}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Puedes agregar más filtros aquí después (Ej: Precio) */}
          </div>

          <Button 
            variant="outline" 
            className="w-full mt-6"
            onClick={() => setCategoria("Todas")}
          >
            Limpiar filtros
          </Button>
        </div>
      </aside>

      {/* 2. CONTENIDO PRINCIPAL DERECHA (CATÁLOGO) */}
      <main className="w-full md:w-3/4 lg:w-4/5">
        {/* Le pasamos la categoría seleccionada al catálogo */}
        <ProductCatalog categoriaFiltro={categoria} />
      </main>

    </div>
  )
}