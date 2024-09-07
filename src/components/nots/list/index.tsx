'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { onDeleteNote, onEditNote, onGetNoteList } from "@/actions/nots";

type Props = {
  notes:
  | {
    status: number;
    message: string;
    data: {
      id: string;
      authorName: string;
      authorNote: string;
    }[];
  }
  | undefined;
}

type rowDataType =
  null |
  {
    id?: string
    authorName?: string
    authorNote?: string
  }

function NotsList({ notes }: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [allData, setAllData] = useState(notes?.data);
  const { toast } = useToast();
  const [rowData, setRowData] = useState<rowDataType>({
    id: "",
    authorName: "",
    authorNote: "",
  });

  if (!allData) return <div>Loading</div>;

  const editValues = async () => {
    if (rowData) {
      try {
        const result = await onEditNote(rowData);

        if (result?.status === 200) {
          const editingValues = await onGetNoteList();
          setAllData(editingValues?.data);

          toast({
            title: "Başarılı",
            description: result?.message,
          });

        } else {
          toast({
            title: "Hata!",
            description: result?.message,
          });
        }
      } catch (e) {
        console.error(e);
        toast({
          title: "Hata",
          description: 'Bir hata olustu',
        });
      } finally {
        setOpenModal(false);
      }
    }
  }

  const deleteNote = async (id: string) => {
    const result = await onDeleteNote(id);

    if (result?.status === 200) {
      const newItems = allData?.filter((item) => item.id != id);
      setAllData(newItems);
    }
  }

  return (
    <div>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editing the Author Details</DialogTitle>
            <DialogDescription>
              <div className="space-y-2">
                <div>
                  <Label htmlFor="authorName">Author Name</Label>
                  <Input
                    id="authorName"
                    type="text"
                    value={rowData?.authorName}
                    onChange={(e) => {
                      setRowData((prev: rowDataType) => ({
                        ...prev,
                        authorName: e.target.value,
                      }));
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="authorNote">Author Note</Label>
                  <Input
                    id="authorNote"
                    type="text"
                    value={rowData?.authorNote}
                    onChange={(e) => {
                      setRowData((prev: rowDataType) => ({
                        ...prev,
                        authorNote: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              <Button
                variant={"primary"}
                className="w-full mt-2"
                onClick={editValues}
              >
                Edit
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Note List</CardTitle>
          <CardDescription>Yazar ve notlarını listeler.</CardDescription>
        </CardHeader>
        <CardContent className="max-h-[500px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Author Name</TableHead>
                <TableHead>Author Note</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allData?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.authorName}</TableCell>
                  <TableCell>{item.authorNote}</TableCell>
                  <TableCell>
                    <Button
                      size={"sm"}
                      style={{marginRight: "1rem"}}
                      onClick={() => {
                        setRowData(item);
                        setOpenModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size={"sm"}
                      onClick={() => {deleteNote(item.id)}}
                      >Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default NotsList;
