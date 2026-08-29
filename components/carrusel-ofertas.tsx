import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselOfertas() {
  return (
    <section className="w-full py-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ofertas Especiales
        </h2>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Aprovecha los mejores descuentos por tiempo limitado
        </p>
      </div>
      <Carousel 
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem 
              key={index} 
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="p-1">
                <Card className="overflow-hidden rounded-xl border-0 shadow-md">
                  <div className="relative w-full aspect-square">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRryG-fvikVI0MOPCau64FRv-SXBb7UgkK8M06697ZcqxaGRtUPjlEa1_G_&s=10"
                      alt="Producto"
                      className="absolute inset-0 w-full h-full object-cover brightness-60 dark:brightness-40"
                    />
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </section>
  )
}