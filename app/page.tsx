import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart2, Search, TrendingUp, Zap, Github } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col min-h-screen ">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link className="flex items-center justify-center" href="#">
            <BarChart2 className="h-6 w-6 mr-2" />
            <span className="font-bold">InsightJobs</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#funcionalidades"
            >
              Funcionalidades
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#sobre"
            >
              Sobre
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#contribuir"
            >
              Contribuir
            </Link>
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Analise e Otimize Suas Candidaturas
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Extraia insights valiosos de suas candidaturas, identifique
                    gargalos e melhore suas chances de conseguir a vaga dos
                    sonhos.
                  </p>
                </div>
                <div className="space-x-4">
                  <Button asChild>
                    <Link href="/auth">Começar Agora</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="#funcionalidades">Saiba Mais</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section
            id="funcionalidades"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                Funcionalidades Principais
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <Search className="w-8 h-8 mb-2 text-blue-500" />
                    <CardTitle>Análise de Candidaturas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Visualize estatísticas detalhadas sobre suas candidaturas
                      e identifique padrões.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <TrendingUp className="w-8 h-8 mb-2 text-green-500" />
                    <CardTitle>Identificação de Gargalos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Descubra em quais etapas do processo seletivo você está
                      enfrentando mais dificuldades.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Zap className="w-8 h-8 mb-2 text-yellow-500" />
                    <CardTitle>Recomendações Personalizadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Receba sugestões de melhoria baseadas na análise de suas
                      candidaturas anteriores.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section id="sobre" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                Sobre o Projeto
              </h2>
              <div className="grid gap-6 items-center">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      CandidaturasAnalytics: Potencialize Sua Busca por Emprego
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">
                      CandidaturasAnalytics é uma ferramenta open source
                      projetada para ajudar candidatos a empregos a entenderem
                      melhor seus processos seletivos. Ao analisar suas
                      candidaturas passadas, nossa plataforma oferece insights
                      valiosos que podem aumentar significativamente suas
                      chances de sucesso.
                    </p>
                    <p className="mt-4 text-lg">
                      Com recursos de análise de dados e visualizações
                      intuitivas, você pode identificar áreas de melhoria,
                      entender onde estão os gargalos em seus processos
                      seletivos e receber recomendações personalizadas para
                      aprimorar suas candidaturas futuras.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section
            id="contribuir"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                Como Contribuir
              </h2>
              <div className="grid gap-6 items-center">
                <Card>
                  <CardHeader>
                    <CardTitle>Junte-se à Nossa Comunidade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg mb-4">
                      Como um projeto open source, valorizamos a colaboração da
                      comunidade. Aqui estão algumas formas de contribuir:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Desenvolva novos algoritmos de análise de dados</li>
                      <li>Melhore as visualizações e dashboards</li>
                      <li>
                        Adicione integrações com plataformas de busca de emprego
                      </li>
                      <li>Reporte bugs e sugira melhorias</li>
                      <li>Melhore a documentação e tutoriais</li>
                    </ul>
                    <div className="mt-6">
                      <Button asChild>
                        <Link
                          href="https://github.com/CandidaturasAnalytics/repo"
                          className="flex items-center"
                        >
                          <Github className="mr-2 h-4 w-4" /> Visite nosso
                          GitHub
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 CandidaturasAnalytics. Todos os direitos reservados.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Termos de Uso
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacidade
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
