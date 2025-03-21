import React, { useEffect, useState } from "react";
import "./ProductsList.css";
import ProductCard from "./ProductCard";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagination";
import userProductList from "../../hooks/useProductList";

const ProductsList = () => {
  const [sortBy, setSortBy] = useState("");
  const [sortedProduct, setsortedProduct] = useState([]);
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const searchQuery = search.get("search");

  const { data, error, isFetching, hasNextPage, fetchNextPage } =
    userProductList({
      search: searchQuery,
      category,
      perPage: 10,
    });

  // useEffect(() => {
  //   setPage(1);
  // }, [searchQuery, category]);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search]);
    setSearch({ ...currentParams, page: parseInt(currentParams.page) + 1 });
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isFetching &&
        hasNextPage &&
        data
      ) {
        console.log("reached to Bottom");
        fetchNextPage();
        // handlePageChange();
        // setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, isFetching]);

  useEffect(() => {
    if (data && data.pages) {
      const products = data.pages.flatMap((page) => page.products);

      if (sortBy === "price desc") {
        setsortedProduct(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setsortedProduct(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setsortedProduct(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setsortedProduct(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else {
        setsortedProduct(products);
      }
    }
  }, [sortBy, data]);

  return (
    <section className="product_list_section">
      <header className="align_center product_list_header">
        <h2>Products</h2>
        <select
          name="sort"
          id=""
          className="products_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH</option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {
          /* {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.products && }*/
          sortedProduct.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        }
        {/* </div> </React.Fragment>
        ))} */}

        {isFetching && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
      </div>
      {/* {data && (
        <Pagination
          totalPosts={data.totalProducts}
          postPerPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )} */}
    </section>
  );
};

export default ProductsList;
