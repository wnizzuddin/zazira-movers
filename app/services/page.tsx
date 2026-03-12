import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BackgroundSetter from "../ui/background-setter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const servicesList = [
  {
    name: "BRONZE",
    imgsrc: "/services/pakej-bronze-1.png",
    title: "Basic Assistance with Manpower",
    basePrice: "RM690",
  },
  {
    name: "SILVER",
    imgsrc: "/services/pakej-silver-1.png",
    title: "Complete included with Unpacking",
    basePrice: "RM790",
  },
  {
    name: "GOLD",
    imgsrc: "/services/pakej-gold-1.png",
    title: "Popular for Complete House Move",
    basePrice: "RM1790",
  },
  {
    name: "GOLD+++",
    imgsrc: "/services/pakej-gold-2.png",
    title: "Full VIP Package with Unpack and Rearrange",
    basePrice: "RM2680",
  },
];

export default function Services() {
  return (
    <main className="flex max-h-screen flex-col p-6">
      <BackgroundSetter src={"/main-background.png"} />

      <div className="grid grid-cols-1 my-10">
        <h1 className="mx-auto max-w-3xl text-5xl font-semibold text-white">
          Services
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 p-5 gap-10 md:gap-10 lg:gap-5 h-[80vh]">
        {servicesList.map((item: any) => {
          return (
            <Card key={item.name} className="h-[100%] lg:h-fit shadow-xl">
              <img
                src={item.imgsrc}
                alt={`${item.name} image`}
                className="rounded-xl"
              />
              <CardHeader>
                <CardTitle className="text-2xl text-center mb-3">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-lg text-center">
                  As lowest as{" "}
                  <span className="text-black font-bold text-xl underline">
                    {item.basePrice}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="mt-2 bg-yellow-500 text-black hover:bg-blue-300 w-full"
                >
                  <Link
                    href={{ pathname: "/booking", query: { pkg: item.name } }}
                  >
                    Choose this
                    <ArrowRightCircleIcon className={cn("size-4")} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
