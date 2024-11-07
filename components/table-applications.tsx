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
import {
  deleteApplication,
  updateApplication,
} from "@/api/job_applications.api";
import { useToast } from "@/hooks/use-toast";
import ModalUpdateApplication from "./modal-update-apllication";
import { formatDate } from "@/utils";

export default function TableApplications({
  application,
  seApplication,
}: {
  application: Application[];
  seApplication: (application: Application[]) => void;
}) {
  const [editingApplication, setEditingApplication] =
    useState<Application | null>(null);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(
    null
  );

  const { toast } = useToast();

  const handleUpdateApplication = async () => {
    try {
      if (!editingApplication) return;
      const { id, ...applicationWithoutId } = editingApplication;
      await updateApplication(applicationWithoutId, id);

      toast({
        title: "Candidatura atualizada com sucesso",
        variant: "sucess",
      });
      seApplication(
        application.map((c) => (c.id === id ? { ...editingApplication } : c))
      );
      setEditingApplication(null);
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar candidatura",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  const handleDeleteApplication = async () => {
    try {
      if (!applicationToDelete) return;
      await deleteApplication(applicationToDelete);
      toast({
        title: "Candidatura excluída com sucesso",
        variant: "sucess",
      });
      seApplication(application.filter((c) => c.id !== applicationToDelete));
      setApplicationToDelete(null);
    } catch (error: any) {
      toast({
        title: "Erro ao excluir candidatura",
        variant: "destructive",
      });
      console.log(error);
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
            <TableHead>Data</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {application.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.companyName}</TableCell>
              <TableCell>{item.position}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{formatDate(item.applicationDate)}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() =>
                    setEditingApplication({
                      id: item.id,
                      companyName: item.companyName,
                      position: item.position,
                      applicationDate: item.applicationDate,
                      status: item.status,
                      notes: item.notes,
                    })
                  }
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
        <ModalUpdateApplication
          editingApplication={editingApplication}
          setEditingApplication={setEditingApplication}
          handleUpdateApplication={handleUpdateApplication}
        />
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
            <Button variant="destructive" onClick={handleDeleteApplication}>
              Confirmar Exclusão
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
