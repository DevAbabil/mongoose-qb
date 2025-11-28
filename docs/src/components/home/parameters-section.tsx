import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QUERY_PARAMS } from "@/data/query-params";
import { SECTIONS } from "@/constants/sections";
import { Code2 } from "lucide-react";

const ParametersSection = () => {
  return (
    <section id="parameters" className="scroll-mt-20 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-400">
          <Code2 className="h-4 w-4" />
          API Reference
        </div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {SECTIONS.parameters.title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {SECTIONS.parameters.description}
        </p>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-blue-500/20 bg-linear-to-br from-blue-500/5 via-background to-purple-500/5 p-1 shadow-lg shadow-blue-500/10">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative overflow-x-auto rounded-xl bg-background/95 backdrop-blur">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border/50">
                <TableHead className="w-[140px] font-semibold">Parameter</TableHead>
                <TableHead className="w-[100px] font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Example</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {QUERY_PARAMS.map((param) => (
                <TableRow
                  key={param.name}
                  className="border-border/50 transition-colors hover:bg-muted/50"
                >
                  <TableCell className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                    {param.name}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {param.type}
                  </TableCell>
                  <TableCell className="font-mono text-sm">{param.example}</TableCell>
                  <TableCell className="text-sm">{param.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};
export default ParametersSection;
