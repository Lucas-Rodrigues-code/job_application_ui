"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createApplications,
  getApplications,
} from "@/api/job_applications.api";
import { Application } from "@/types/application";
import TableApplications from "@/components/table-applications";
import { useToast } from "@/hooks/use-toast";
import Paginate from "@/components/paginate";
import withAuth from "@/hooks/withAuth";

function ApplicationsPage() {
  const [application, seApplication] = useState<Application[]>([]);
  const [newApplication, setNewApplication] = useState({
    companyName: "",
    position: "",
    status: "candidato",
    notes: "",
    applicationDate: "",
  });
  const [totalItems, setTotalItems] = useState(0);
  const [onPageChange, setOnPageChange] = useState(0);
  const [onItemsPerPageChange, setOnItemsPerPageChange] = useState(10);

  useEffect(() => {
    const fetchApplications = async () => {
      const data = await getApplications(onPageChange, onItemsPerPageChange);
      setOnPageChange(data.skip);
      setOnItemsPerPageChange(data.take);
      setTotalItems(data.total);
      seApplication(data.data);
    };

    fetchApplications();
  }, [onPageChange, onItemsPerPageChange]);

  const { toast } = useToast();

  const addApplication = async () => {
    try {
      const data = await createApplications(newApplication);
      seApplication([data, ...application]);
      setNewApplication({
        companyName: "",
        position: "",
        status: "candidato",
        notes: "",
        applicationDate: "",
      });
      toast({
        title: "Candidatura adicionada com sucesso",
        variant: "sucess",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar candidatura",
        description: error.response.data.message,
        variant: "destructive",
      });
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciador de Candidaturas</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Adicionar Nova Candidatura
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
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

          <Select
            value={newApplication.status}
            onValueChange={(e) =>
              setNewApplication({ ...newApplication, status: e })
            }
            defaultValue="candidato"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Candidato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="candidato">Candidato</SelectItem>
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
        </div>
        <TableApplications
          application={application}
          seApplication={seApplication}
        />
        <Paginate
          totalItems={totalItems}
          itemsPerPageOptions={[10, 20, 30, 50]}
          defaultItemsPerPage={onItemsPerPageChange}
          defaultPage={1}
          setOnPageChange={setOnPageChange}
          setOnItemsPerPageChange={setOnItemsPerPageChange}
        />
      </div>
    </div>
  );
}

export default withAuth(ApplicationsPage);
