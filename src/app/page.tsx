import { ForTeams } from "@/components/for-teams";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Privacy } from "@/components/privacy";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatItChecks } from "@/components/what-it-checks";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <Hero />
        <WhatItChecks />
        <HowItWorks />
        <Privacy />
        <ForTeams />
      </main>
      <SiteFooter />
    </>
  );
}
