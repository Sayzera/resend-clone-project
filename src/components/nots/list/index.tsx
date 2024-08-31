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

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
};

function NotsList({ notes }: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [allData, setAllData] = useState(notes?.data);
  const [rowData, setRowData] = useState<{
    id: string;
    authorName: string;
    authorNote: string;
  }>({
    id: "",
    authorName: "",
    authorNote: "",
  });

  if (!allData) return <div>Loading</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Note List </CardTitle>
        <CardDescription>Yazar ve notlarini listeler.</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[500px] overflow-y-auto"></CardContent>
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
                <Button size={"sm"} onClick={() => {
                  setRowData(item)
                }}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export default NotsList;
