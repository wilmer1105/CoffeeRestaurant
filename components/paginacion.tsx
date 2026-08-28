'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Componente principal exportado
export function Paginacion() {
  const [loading, setLoading] = useState(true)
  
  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const ITEMS_PER_PAGE = 12

  const supabase = createClient()

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true)
      const from = (currentPage - 1) * ITEMS_PER_PAGE
      const to = from + ITEMS_PER_PAGE - 1

      const { data, count, error } = await supabase
        .from('productos')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('id', { ascending: true })
      if (count) {
          setTotalPages(Math.ceil(count / ITEMS_PER_PAGE))
        }
      setLoading(false)
    }

    fetchProductos()
  }, [currentPage, supabase])

  const handlePageChange = (page: number, e: React.MouseEvent) => {
    e.preventDefault()
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      
      // Buscamos la sección por su ID y hacemos scroll suave hacia ella
      const catalogSection = document.getElementById('catalogproduct')
      if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 animate-pulse">Cargando catálogo...</p>
      </div>
    )
  }

  return (
    <div id="catalogproduct" className="w-full pt-8">
      {/* PAGINACIÓN DINÁMICA */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#catalogproduct" 
                onClick={(e) => handlePageChange(currentPage - 1, e)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink 
                    href="#catalogproduct" 
                    isActive={currentPage === pageNumber}
                    onClick={(e) => handlePageChange(pageNumber, e)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            <PaginationItem>
              <PaginationNext 
                href="#catalogproduct" 
                onClick={(e) => handlePageChange(currentPage + 1, e)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}