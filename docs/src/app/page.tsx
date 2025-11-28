import {
  ConceptSection,
  FeaturesSection,
  ParametersSection,
  UsageSection,
  ConfigurationSection,
  DocHero,
  InstallationSection,
} from "@/components";

export default function Page() {
  return (
    <main>
      <DocHero />
      <InstallationSection />
      <div className="mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6 lg:px-8">
        <ConceptSection />
        <FeaturesSection />
        <ParametersSection />
        <UsageSection />
        <ConfigurationSection />
      </div>
    </main>
  );
}
