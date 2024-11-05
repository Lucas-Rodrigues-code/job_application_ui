"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

type Application = {
  id: number;
  companyName: string;
  position: string;
  applicationDate: string;
  status: string;
  notes: string;
};

export default function CandidaturasCRUD() {
  const [application, seApplication] = useState<Application[]>([
    {
      id: 1,
      companyName: "João Silva",
      position: "Desenvolvedor Frontend",
      status: "Em análise",
      notes: "",
      applicationDate: "2022-01-01",
    },
    {
      id: 2,
      companyName: "Maria Santos",
      position: "Designer UX/UI",
      status: "Entrevista agendada",
      notes: "",
      applicationDate: "2022-01-02",
    },
  ]);
  const [newApplication, setNewApplication] = useState({
    companyName: "",
    position: "",
    status: "",
    notes: "",
    applicationDate: "",
  });

  const [editingApplication, setEditingApplication] =
    useState<Application | null>(null);
  const [applicationToDelete, setApplicationToDelete] = useState<number | null>(
    null
  );

  const addApplication = () => {
    seApplication([...application, { ...newApplication, id: Date.now() }]);
    setNewApplication({
      companyName: "",
      position: "",
      status: "",
      notes: "",
      applicationDate: "",
    });
  };

  const updateApplication = () => {
    if (editingApplication) {
      seApplication(
        application.map((c) =>
          c.id === editingApplication.id ? editingApplication : c
        )
      );
      setEditingApplication(null);
    }
  };

  const deleteApplication = () => {
    if (applicationToDelete !== null) {
      seApplication(application.filter((c) => c.id !== applicationToDelete));
      setApplicationToDelete(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciador de Candidaturas</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Adicionar Nova Candidatura
        </h2>
        <form className="grid gap-6 md:grid-cols-2">
          <Input
            required
            placeholder="Nome da Empresa"
            value={newApplication.companyName}
            onChange={(e) =>
              setNewApplication({
                ...newApplication,
                companyName: e.target.value,
              })
            }
          />
          <Input
            required
            placeholder="Nome da Vaga"
            value={newApplication.position}
            onChange={(e) =>
              setNewApplication({ ...newApplication, position: e.target.value })
            }
          />
          <Input required className="hidden" value={newApplication.status} />
          <Select
            value={newApplication.status}
            onValueChange={(e) =>
              setNewApplication({ ...newApplication, status: e })
            }
            defaultValue="Candidato"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Candidato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Candidato">Candidato</SelectItem>
              <SelectItem value="Entrevista Inicial">
                Entrevista Inicial
              </SelectItem>
              <SelectItem value="Em andamento">Em andamento</SelectItem>
              <SelectItem value="contratado">Contratado</SelectItem>
            </SelectContent>
          </Select>

          <Input
            required
            placeholder="Data da Candidatura"
            type="date"
            value={newApplication.applicationDate}
            onChange={(e) =>
              setNewApplication({
                ...newApplication,
                applicationDate: e.target.value,
              })
            }
          />
          <textarea
            placeholder="Notas"
            value={newApplication.notes}
            onChange={(e) =>
              setNewApplication({ ...newApplication, notes: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <Button onClick={addApplication}>Adicionar</Button>
        </form>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Vaga</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {application.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.companyName}</TableCell>
              <TableCell>{item.position}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => setEditingApplication(item)}
                >
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setApplicationToDelete(item.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingApplication && (
        <Dialog
          open={!!editingApplication}
          onOpenChange={() => setEditingApplication(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Candidatura</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome
                </Label>
                <Input
                  id="nome"
                  value={editingApplication.companyName}
                  onChange={(e) =>
                    setEditingApplication({
                      ...editingApplication,
                      companyName: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vaga" className="text-right">
                  Vaga
                </Label>
                <Input
                  id="vaga"
                  value={editingApplication.position}
                  onChange={(e) =>
                    setEditingApplication({
                      ...editingApplication,
                      position: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Input
                  id="status"
                  value={editingApplication.status}
                  onChange={(e) =>
                    setEditingApplication({
                      ...editingApplication,
                      status: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={updateApplication}>Salvar Alterações</Button>
          </DialogContent>
        </Dialog>
      )}

      <Dialog
        open={applicationToDelete !== null}
        onOpenChange={() => setApplicationToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p>Tem certeza que deseja excluir esta candidatura?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setApplicationToDelete(null)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={deleteApplication}>
              Confirmar Exclusão
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
