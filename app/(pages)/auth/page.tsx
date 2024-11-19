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
import { useAuth } from "@/context/authContext";
import { AuthRegister } from "@/api/auth";
import { useToast } from "@/hooks/use-toast";

type Form = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { login: signIn } = useAuth();
  const { toast } = useToast();

  const signUp = async (form: Form) => {
    try {
      await AuthRegister(form.name, form.email, form.password);
      setIsSignUp(false);
      toast({
        title: "Conta criada com sucesso",
        description: "Agora você pode fazer login",
        variant: "sucess",
      })
    } catch (error:any) {
      toast({
        title: "Erro ao criar conta",
        description: error?.response?.data?.message,
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSignUp && form.password !== form.confirmPassword) return;

    if (isSignUp) {
      signUp(form);
    } else {
      signIn(form.email, form.password);
    }
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
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  autoComplete="email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="senha"
                  required
                  autoComplete="new-password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                  />
                  {form.password !== form.confirmPassword && (
                    <span className="text-xs text-red-500">
                      As senhas devem ser iguais
                    </span>
                  )}
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
