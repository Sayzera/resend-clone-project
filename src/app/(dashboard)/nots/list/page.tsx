"use server";
import { onGetNoteList } from "@/actions/nots";
import NotsList from "@/components/nots/list";
import React, { Suspense } from "react";

type Props = {};

export default async function NotListPage({}: Props) {
  const notes = await onGetNoteList();

  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="p-5 w-full">
        <NotsList notes={notes} />
      </div>
    </Suspense>
  );
}
