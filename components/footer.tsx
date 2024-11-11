import { BarChart2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} InsightJobs. Todos os direitos
              reservados.
            </p>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/contato"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Contato
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
