import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FEATURES } from "@/data/features";
import { SECTIONS } from "@/constants/sections";

const FeaturesSection = () => {
  return (
    <section id="features" className="scroll-mt-20 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{SECTIONS.features.title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {SECTIONS.features.description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <Card
            key={feature.title}
            className="group relative overflow-hidden border-border/50 bg-linear-to-br from-background to-muted/30 transition-all hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-500/5 blur-2xl transition-all group-hover:bg-green-500/10" />
            <CardHeader className="relative">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-600 transition-all group-hover:scale-110 group-hover:bg-green-500/20 dark:text-green-400">
                {feature.icon}
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
export default FeaturesSection;
