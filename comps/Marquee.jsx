import Products from "../app/Products";
import { memo, useRef, useState } from "react";

const Marquee = ({ products }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-20">
      <h1 className="text-center text-secondary text-xl font-extrabold">
        You may also like
      </h1>

      <section className="mt-10 relative h-52 sm:h-96 w-full">
        <button 
          onClick={scrollLeft}
          className="absolute left-1 sm:left-2 top-[40%] transform -translate-y-1/2 z-10 bg-primary text-highLight rounded-full p-1 shadow-md hover:bg-opacity-90"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={scrollRight}
          className="absolute right-1 sm:right-2 top-[40%] transform -translate-y-1/2 z-10 bg-primary text-highLight rounded-full p-1 shadow-md hover:bg-opacity-90"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto hide-scrollbar" 
          style={{ direction: 'rtl' }}
          onScroll={handleScroll}
        >
          <div className="flex space-x-5 space-x-reverse" style={{ direction: 'rtl' }}>
            {products.map((product) => (
              <div key={product._id} className="flex-shrink-0">
                <Products gap={"ml-5"} products={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Marquee);
