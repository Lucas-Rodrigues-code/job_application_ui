"use client";
import { useState } from "react";

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
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Application } from "@/types/application";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function TableApplications({
  application,
}: {
  application: Application[];
}) {
  const [editingApplication, setEditingApplication] =
    useState<Application | null>(null);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(
    null
  );

  const updateApplication = () => {
    if (editingApplication) {
      /*  seApplication(
        application.map((c) =>
          c.id === editingApplication.id ? editingApplication : c
        )
      ); */
      setEditingApplication(null);
    }
  };

  const deleteApplication = () => {
    if (applicationToDelete !== null) {
      /* seApplication(application.filter((c) => c.id !== applicationToDelete)); */
      setApplicationToDelete(null);
    }
  };

  return (
    <>
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
    </>
  );
}
