import { Code2 } from "lucide-react";

const ConceptSection = () => {
  const exampleRequest = `GET /tours?search=sundarban&sort=-createdAt,price&fields=title,price&page=2&limit=20`;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-green-500/20 bg-linear-to-br from-green-500/5 via-background to-blue-500/5 p-8 shadow-lg shadow-green-500/5 transition-all hover:shadow-xl hover:shadow-green-500/10">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-green-500/10 blur-3xl transition-all group-hover:bg-green-500/20" />

      <div className="relative space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:text-green-400">
            <Code2 className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-2xl font-bold">Concept</h3>
            <p className="text-muted-foreground">
              Build flexible and clean Mongoose queries from HTTP query parameters.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">Example Request</p>
          <div className="overflow-x-auto rounded-xl border border-green-500/20 bg-background/50 p-4 backdrop-blur">
            <code className="font-mono text-sm text-green-600 dark:text-green-400">
              {exampleRequest}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptSection;
