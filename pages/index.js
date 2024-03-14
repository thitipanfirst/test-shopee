import Categories from "@/components/categorie/Categories";
import Product from "@/components/product/Product";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between mx-4 md:mx-[8%] 2xl:mx-[20%] py-24 bg-zinc-50">
      <Categories />
      <div className="mt-8">
        <Product />
      </div>
    </div>
  );
}
