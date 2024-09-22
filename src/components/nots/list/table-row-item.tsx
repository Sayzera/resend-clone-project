import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { updateUrlParameter } from "@/lib/urlFunctions";
import Image from "next/image";
import { useParams,useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiBoxList, CiEdit, CiSquarePlus } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

type Props = {
  item: {
    id: string;
    authorName: string;
    authorNote: string;
    filePath: string;
    user: {
      name: string;
    };
  };
  setRowData: (data: any) => void;
  setOpenAddSimilarNote: (data: any) => void;
  onGetCommentList: (data: any) => void;
  setOpenModal: (data: any) => void;
  deleteNote: (id: any, filePath: any) => void;
  openTimeLineHandler: (isOpen: any) => void;
};

function TableRowItem({
  item,
  setRowData,
  setOpenAddSimilarNote,
  onGetCommentList,
  setOpenModal,
  deleteNote,
  openTimeLineHandler,
   
}: Props) {
    const [openTimeLine, setOpenTimeLine] =useState(false);

    const searchParams= useSearchParams();
    const id = searchParams.get("id");



    console.log(openTimeLine, 'openTimeLine')



      
  return (
    <TableRow key={item.id}>
      <TableCell className="font-medium">
        {item.authorName} - {item.user?.name}
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
          size={"icon"}
          style={{ marginRight: "1rem" }}
          onClick={() => {
            setRowData(item);
            setOpenAddSimilarNote(true);
          }}
        >
          <CiSquarePlus className="size-5" />
        </Button>
        <Button
          size={"icon"}
          className={openTimeLine && id == item.id ? "bg-gray-300" : "bg-gray-800"}
          style={{ marginRight: "1rem" }}
          onClick={() => {
            onGetCommentList(item.id);
            updateUrlParameter("id", item.id);

            setOpenTimeLine(true);
            openTimeLineHandler(true);  


            /**
             * State değiştiğinde anlık olarak bu satır etkilenmez bir sonraki tıklanmada 
             * verinin değiştiğini görebiliriz 
             */
            if(openTimeLine && id == item.id){
                setOpenTimeLine(false);
                openTimeLineHandler(false);
            }


            
          }}
        >
          <CiBoxList className="size-5" />
        </Button>
        <Button
          size={"icon"}
          style={{ marginRight: "1rem" }}
          onClick={() => {
            setRowData(item);
            setOpenModal(true);
          }}
        >
          <CiEdit className="size-5" />
        </Button>
        <Button
          size={"icon"}
          onClick={() => {
            deleteNote(item.id, item.filePath);
          }}
        >
          <MdOutlineDelete className="size-5" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default TableRowItem;
