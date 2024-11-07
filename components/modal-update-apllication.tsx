import { Application } from "@/types/application";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

type ModalUpdateProps = {
  editingApplication: Application;
  setEditingApplication: (application: Application | null) => void;
  handleUpdateApplication: () => void;
};

export default function ModalUpdateApplication({
  editingApplication,
  setEditingApplication,
  handleUpdateApplication,
}: ModalUpdateProps) {
  return (
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
            <Select
              value={editingApplication.status}
              onValueChange={(e) =>
                setEditingApplication({ ...editingApplication, status: e })
              }
            >
              <SelectTrigger className="w-full col-span-3">
                <SelectValue placeholder={editingApplication.status} />
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
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Data
            </Label>

            <Input
              required
              placeholder="Data da Candidatura"
              type="date"
              value={
                editingApplication
                  ? editingApplication.applicationDate.split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setEditingApplication({
                  ...editingApplication,
                  applicationDate: e.target.value,
                })
              }
              className="col-span-3"
            />
          </div>
          <textarea
            placeholder="Notas"
            value={editingApplication.notes}
            onChange={(e) =>
              setEditingApplication({
                ...editingApplication,
                notes: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <Button onClick={handleUpdateApplication}>Salvar Alterações</Button>
      </DialogContent>
    </Dialog>
  );
}
