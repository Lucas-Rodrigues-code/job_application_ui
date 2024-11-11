"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Form submitted:", isSignUp ? "Sign Up" : "Sign In");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Card className="flex-1 m-4">
        <CardHeader>
          <CardTitle>
            {isSignUp ? "Crie uma conta" : "Bem vindo de volta"}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? "Cadastre-se para começar a gerenciar suas candidaturas"
              : "Entre para continuar gerenciando suas candidaturas"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required />
              </div>
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <Input id="confirmPassword" type="password" required />
                </div>
              )}
            </div>
            <Button type="submit" className="w-full mt-6">
              {isSignUp ? "Inscrever-se" : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            variant="link"
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full"
          >
            {isSignUp
              ? "Já tem uma conta? Entrar"
              : "Não tem uma conta? Inscreva-se"}
          </Button>
        </CardFooter>
      </Card>
      <div className="flex-1 bg-muted hidden md:block">
        <img
          src="/capa.png?height=600&width=600"
          alt="Job application management"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
