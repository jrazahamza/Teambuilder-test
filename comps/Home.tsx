"use client";
import { useState, useMemo } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

type SortOption = "none" | "lowToHigh" | "highToLow";

const Home = ({ products, bannerData }: HomeProps) => {
  const [sortOption, setSortOption] = useState<SortOption>("none");

  const sortedProducts = useMemo(() => {
    if (sortOption === "none") return products;
    
    return [...products].sort((a, b) => {
      if (sortOption === "lowToHigh") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }, [products, sortOption]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
  };

  return (
    <main>
      {/* === MAIN BANNER  */}
      <MainBanner banner={bannerData[0]} />

      <section className="mb-4 flex items-center flex-col">
        <h1
          className="headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary
         font-sans font-extrabold sm:rounded-t-3xl"
        >
          Best Selling Headphones
        </h1>
        
        {/* === SORT DROPDOWN === */}
        <div className="w-full max-w-xs mt-2 mb-4 flex justify-center">
          <select 
            className="bg-primary text-highLight border border-primary rounded-md px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="none">Sort by Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </section>

      {/* === SHOW PRODUCTS  */}
      <section
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3
       lg:mx-20 overflow-hidden"
      >
        {/* === MAP PRODUCTS  */}
        {sortedProducts?.map((products: ProductsTypes) => {
          return <Products key={products._id} products={products} />;
        })}
      </section>

      {/* ==== FOOTER BANNER  */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
