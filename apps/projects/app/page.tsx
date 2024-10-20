import Image from "next/image";
import SectionHeader from "@/app/components/SectionHeader";
import Card from "@/app/components/card";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center  min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <SectionHeader title="Projects"/>

      <Card title="CIMPL" type="Project Example" description="Devathon by Deen Developers" imgUrl="@/app/favicon.ico" url="questra.digital" />
      <Card title="CIMPL" type="Project Example" description="Devathon by Deen Developers" imgUrl="@/app/favicon.ico" url="questra.digital" />
      <Card title="CIMPL" type="Project Example" description="Devathon by Deen Developers" imgUrl="@/app/favicon.ico" url="questra.digital" />
    </div>
  );
}
