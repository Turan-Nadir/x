import Carousel from "@/components/carousel";
import Registr from "@/components/signin";

export default function Home() {
  return (
    <section className="flex flex-row w-full ">
      <div className="w-3/5 h-screen">
        <Carousel/>
      </div>
      <div className="w-2/5 h-screen ">
        <Registr/>
      </div>
    </section>
  );
}
