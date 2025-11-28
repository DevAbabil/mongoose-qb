import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CONFIG_OPTIONS } from "@/data/config-options";
import { SECTIONS } from "@/constants/sections";
import { Settings } from "lucide-react";

const ConfigurationSection = () => {
  return (
    <section id="config" className="scroll-mt-20 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-400">
          <Settings className="h-4 w-4" />
          Customization
        </div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{SECTIONS.config.title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {SECTIONS.config.description}
        </p>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-linear-to-br from-purple-500/5 via-background to-pink-500/5 p-1 shadow-lg shadow-purple-500/10">
        <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="relative space-y-6 rounded-xl bg-background/95 p-6 backdrop-blur">
          <div className="overflow-x-auto rounded-xl border border-border/50">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-border/50">
                  <TableHead className="w-[160px] font-semibold">Option</TableHead>
                  <TableHead className="w-[200px] font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CONFIG_OPTIONS.map((config) => (
                  <TableRow
                    key={config.option}
                    className="border-border/50 transition-colors hover:bg-muted/50"
                  >
                    <TableCell className="font-mono font-semibold text-purple-600 dark:text-purple-400">
                      {config.option}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {config.type}
                    </TableCell>
                    <TableCell className="text-sm">{config.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-6">
            <h3 className="mb-3 font-semibold text-purple-700 dark:text-purple-400">
              Type Definition
            </h3>
            <div className="space-y-2 font-mono text-sm text-muted-foreground">
              <p>
                <code className="rounded bg-muted px-2 py-1 text-purple-600 dark:text-purple-400">
                  IQBPopulate
                </code>
                {" = { path: string; select?: string; }"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ConfigurationSection;
