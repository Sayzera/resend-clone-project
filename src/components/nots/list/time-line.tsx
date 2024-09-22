import { Timeline } from "rsuite";
import CreditCardIcon from "@rsuite/icons/legacy/CreditCard";
import PlaneIcon from "@rsuite/icons/legacy/Plane";
import TruckIcon from "@rsuite/icons/legacy/Truck";
import UserIcon from "@rsuite/icons/legacy/User";
import CheckIcon from "@rsuite/icons/legacy/Check";
import { GrClose } from "react-icons/gr";
import { Checkbox } from "@/components/ui/checkbox"
import { changeStatusNoteLinkedToNote } from "@/actions/notes-linked-to-notes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TimeLineProps {
  data: {
    comment: string;
    createdBy: string;
    id: string;
    isTargetAchieved: boolean;
    status: string;
  }[];
}

const TimeLine = ({ data }: TimeLineProps) => {
  const router = useRouter()
  const [
    timeItem, setTimeItem
  ] = useState<
    {
      [key:string]: any
    }
  >({});
  const changeStatus = async (id:string, status:boolean) => {
   const response =  await changeStatusNoteLinkedToNote(id, status)
   return response
  }
  

  useEffect(() => {
    data?.map((item) => {
      setTimeItem((prev) => ({
        ...prev,
        [item.id]: item.isTargetAchieved
      }))
    })
  }, [data])



  return (
    <Timeline className="custom-timeline w-full">
      {data?.map((item, index) => (
        <Timeline.Item
          key={item.id}
          dot={
             timeItem[item.id]
            ? (
              <CheckIcon style={{ color: "green" }} />
            ) : (
              <GrClose style={{ color: "red" }} />
            )
          }
        >
          <div className="flex items-center justify-between w-full">
            <p>{item.comment}</p>

            <div>
            <Checkbox
                checked={timeItem[item.id]}
                onCheckedChange={async (e) => {
                 const result =  await changeStatus(item.id, e as boolean)

                  if(result?.status === 200) {
                    setTimeItem((prev) =>({
                      ...prev,
                      [item.id]: e
                    }))
                  }
                 
               }}
            />

            </div>
          </div>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default TimeLine;
