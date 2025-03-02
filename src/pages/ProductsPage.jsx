import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ProductDetailCard } from "../components/products/ProductDetailCard.jsx";
import { useCategories } from "../hooks/useCategories.js";
import { useProducts } from "../hooks/useProducts.js";
import { Button } from "../components/Button.jsx";
import { useLocations } from "../hooks/useLocations.js";
import { Filter } from "../components/filters/Filter.jsx";
import { CategoryFilter } from "../components/filters/CategoryFilter.jsx";
import { LocationFilter } from "../components/filters/LocationFilter.jsx";
import { PriceFilter } from "../components/filters/PriceFilter.jsx";
import { usePriceRange } from "../hooks/usePrices.js";

export const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState(`?${searchParams}`);

    const { products } = useProducts(filters);
    const { categories } = useCategories();
    const [categoriesChecked, setCategoriesChecked] = useState([]);
    const { locations } = useLocations();
    const { minPrice, maxPrice } = usePriceRange();

    const [categoryFilter, setCategoryFilter] = useState(null);
    const [locationFilter, setLocationFilter] = useState(null);
    const [minPriceFilter, setMinPriceFilter] = useState(null);
    const [maxPriceFilter, setMaxPriceFilter] = useState(null);

    const categoryRef = useRef();
    const locationRef = useRef();

    const handleCategoryChange = (event) => {
        const filter =
            event.target.value !== ""
                ? `filtros[categoria]=${event.target.value}`
                : "";
        setCategoryFilter(filter);
        const array = [filter, locationFilter, minPriceFilter, maxPriceFilter];
        setFilters(`?${array.filter((n) => n).join("&")}`);
    };

    const handleMinPriceChange = (event) => {
        const filter = `precio[min]=${event.target.value}`;
        setMinPriceFilter(filter);
        const array = [categoryFilter, locationFilter, filter, maxPriceFilter];
        setFilters(`?${array.filter((n) => n).join("&")}`);
    };
    const handleMaxPriceChange = (event) => {
        const filter = `precio[max]=${event.target.value}`;
        setMaxPriceFilter(filter);
        const array = [categoryFilter, locationFilter, minPriceFilter, filter];
        setFilters(`?${array.filter((n) => n).join("&")}`);
    };

    const handleLocationChange = (event) => {
        const filter =
            event.target.value !== ""
                ? `filtros[localidad]=${event.target.value}`
                : "";
        setLocationFilter(filter);
        const array = [filter, categoryFilter, minPriceFilter, maxPriceFilter];
        setFilters(`?${array.filter((n) => n).join("&")}`);
    };

    useEffect(() => {
        setFilters(`?${searchParams}`);
        setCategoryFilter(searchParams);
        setLocationFilter("");
        categoryRef.current.reset();
        locationRef.current.reset();

        const checked = categories.map((category) => {
            const categoria = category.categoria;
            const params = `${searchParams}`;
            const checked = params.includes(category.categoria);
            return { categoria, checked };
        });
        setCategoriesChecked(checked);
    }, [searchParams, categories]);

    return (
        <>
            <section className="flex justify-end bg-electric-violet-800 px-6 lg:px-32 2xl:px-40 py-2 w-full h-16">
                <Button
                    toggle={() => setIsOpen((prev) => !prev)}
                    colors="bg-electric-violet-50 hover:bg-electric-violet-900 
                                                    text-electric-violet-800 hover:text-electric-violet-50 lg:hidden"
                >
                    Filtros
                </Button>
            </section>
            <main className="relative lg:flex items-start px-6 lg:px-32 2xl:px-40 py-2 w-full">
                <aside
                    className={`${isOpen ? "scale-100" : "scale-0"} top-10 right-0 absolute lg:relative lg:flex flex-col bg-electric-violet-200/20 lg:bg-transparent backdrop-blur-lg p-10 border-r-1 border-r-electric-violet-200 rounded-3xl lg:rounded-none w-72 h-auto font-body lg:scale-100 text-dark origin-top-right -translate-x-8 md:-translate-x-6 transition-all duration-200 z-20`}
                >
                    <Filter section="Categoría">
                        <CategoryFilter
                            ref={categoryRef}
                            filters={categoriesChecked}
                            handleChange={handleCategoryChange}
                        />
                    </Filter>

                    <Filter section="Precio">
                        {minPrice > 0 && (
                            <PriceFilter
                                min={minPrice}
                                max={maxPrice}
                                handleMinChange={handleMinPriceChange}
                                handleMaxChange={handleMaxPriceChange}
                            />
                        )}
                    </Filter>

                    <Filter section="Localidad">
                        <LocationFilter
                            ref={locationRef}
                            filters={locations}
                            handleChange={handleLocationChange}
                        />
                    </Filter>
                </aside>
                {products.length ? (
                    <section className="gap-5 sm:gap-10 xl:gap-12 2xl:gap-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr p-6 w-full">
                        <AnimatePresence initial={false}>
                            {products.map((product) => {
                                let pic = null;
                                let pic2 = null;
                                if (product.fotos[0]) {
                                    pic = `${product.vendedorId}/${product.id}/${product.fotos[0].foto}`;
                                }
                                if (product.fotos[1]) {
                                    pic2 = `${product.vendedorId}/${product.id}/${product.fotos[1].foto}`;
                                }
                                return (
                                    <motion.article
                                        key={product.id}
                                        layout
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <ProductDetailCard
                                            id={product.id}
                                            name={product.nombre}
                                            price={product.precio}
                                            pic={pic}
                                            pict2={pic2}
                                        />
                                    </motion.article>
                                );
                            })}
                        </AnimatePresence>
                    </section>
                ) : (
                    <p className="p-6 text-electric-violet-950 text-center">
                        No se han encontrado productos con los filtros
                        proporcionados
                    </p>
                )}
            </main>
        </>
    );
};
