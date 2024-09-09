"use client";

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
} from "@/components/ui/dialog";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { onDeleteNote, onEditNote, onGetNoteList } from "@/actions/nots";
import Image from "next/image";

type Props = {
  notes:
    | {
        status: number;
        message: string;
        data: {
          id: string;
          authorName: string;
          authorNote: string;
          filePath: string;
        }[];
      }
    | undefined;
};

type rowDataType = null | {
  id?: string;
  authorName?: string;
  authorNote?: string;
  filePath?: string;
};

function NotsList({ notes }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [allData, setAllData] = useState(notes?.data);
  const { toast } = useToast();
  const [rowData, setRowData] = useState<rowDataType>({
    id: "",
    authorName: "",
    authorNote: "",
    filePath: "",
  });

  if (!allData) return <div>Loading</div>;

  const editValues = async () => {
    if (rowData) {
      try {
        const formData = new FormData();
        formData.append("file", file || "");
    
        const result = await onEditNote(rowData, formData);
       
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
          description: "Bir hata olustu",
        });
      } finally {
        setOpenModal(false);
      }
    }
  };

  const deleteNote = async (id: string, filePath: string) => {
    const result = await onDeleteNote(id, filePath);

    if (result?.status === 200) {
      const newItems = allData?.filter((item) => item.id != id);
      setAllData(newItems);
    }
  };

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

                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <label className="block">File:</label>
                    <input
                      type="file"
                      className="border p-2 w-full"
                      // multiple={true}
                      onChange={(e) => {
                        setFile(e?.target?.files?.[0] || null);
                      }}
                    />
                  </div>

                  <div>
                    <img 
                     width={200}
                     height={200}
                     className="rounded-full border border-black ml-2"
                    src={rowData?.filePath?.replace('public','')} />
                  </div>
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
                <TableHead>File</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allData?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.authorName}
                  </TableCell>
                  <TableCell>{item.authorNote}</TableCell>
                  <TableCell>
                    <Image
                      src={item.filePath.replace("public", "")}
                      alt={item.authorName}
                      objectFit="contain"
                      width={100}
                      height={100}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size={"sm"}
                      style={{ marginRight: "1rem" }}
                      onClick={() => {
                        setRowData(item);
                        setOpenModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size={"sm"}
                      onClick={() => {
                        deleteNote(item.id, item.filePath);
                      }}
                    >
                      Delete
                    </Button>
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
