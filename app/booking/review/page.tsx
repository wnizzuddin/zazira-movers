import BackgroundSetter from "@/app/ui/background-setter";

export default function Review() {
  return (
    <main className="flex max-h-screen flex-col p-6">
      <BackgroundSetter src={"/main-background.png"} />

      <div className="grid grid-cols-1 my-10">
        <h1 className="mx-auto max-w-3xl text-5xl font-semibold text-white">
          Review
        </h1>
      </div>
    </main>
  );
}
