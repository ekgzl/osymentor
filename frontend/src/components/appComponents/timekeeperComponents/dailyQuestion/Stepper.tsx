"use client";

import { Button, Dialog, Timeline } from "@material-tailwind/react";

import { Book, Notes, NumberedListLeft } from "iconoir-react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import {
  nextStep,
  prevStep,
  setStep,
} from "../../../../../features/drawer/StepperSlice";
import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export function StepperComp() {
  const dispatch = useDispatch();
  const stepper = useSelector((state: RootState) => state.stepper);
  const userId = useSelector((state: RootState) => state.user._id);
  return (
    <div className="w-full">
      <Timeline
        mode="stepper"
        value={stepper.step.toString()}
        className="relative mt-6"
      >
        <Timeline.Item disabled={stepper.step < 0} value="0" className="w-full">
          <Timeline.Header>
            <Timeline.Separator className="translate-x-1/2 bg-[#606060] group-data-[completed=true]:bg-emerald-600" />
            <Timeline.Icon className="mx-auto bg-[#606060] group-data-[active=true]:bg-white group-data-[completed=true]:bg-emerald-600">
              <Book className="h-6 w-6 group-data-[completed=true]:text-white text-black" />
            </Timeline.Icon>
          </Timeline.Header>
          <Timeline.Body className="text-center"></Timeline.Body>
        </Timeline.Item>
        <Timeline.Item disabled={stepper.step < 1} value="1" className="w-full">
          <Timeline.Header>
            <Timeline.Separator className="translate-x-1/2 bg-[#606060] group-data-[completed=true]:bg-emerald-600" />
            <Timeline.Icon className="mx-auto bg-[#606060] group-data-[active=true]:bg-white group-data-[completed=true]:bg-emerald-600">
              <Notes className="h-6 w-6 group-data-[completed=true]:text-white text-black" />
            </Timeline.Icon>
          </Timeline.Header>
          <Timeline.Body className="text-center"></Timeline.Body>
        </Timeline.Item>
        <Timeline.Item disabled={stepper.step < 2} value="2" className="w-full">
          <Timeline.Header>
            <Timeline.Icon className="mx-auto bg-[#606060] group-data-[active=true]:bg-white group-data-[completed=true]:bg-white">
              <NumberedListLeft className="h-6 w-6 group-data-[completed=true]:text-white text-black" />
            </Timeline.Icon>
          </Timeline.Header>
          <Timeline.Body className="text-center"></Timeline.Body>
        </Timeline.Item>
      </Timeline>
      <div className="flex w-full justify-between gap-4 -mt-5">
        <Button
          variant="solid"
          color="secondary"
          disabled={stepper.step === 0}
          onClick={() => dispatch(prevStep())}
        >
          Geri
        </Button>
        {stepper.step < 2 ? (
          <Button
            variant="solid"
            onClick={() => {
              if (stepper.step < 2) dispatch(nextStep());
              else {
                return;
              }
            }}
            color="secondary"
          >
            İleri
          </Button>
        ) : (
          <Dialog.DismissTrigger
            as={Button}
            variant="solid"
            color="success"
            onClick={async () => {
              try {
                const sessionData = {
                  user: userId,
                  //UPPERCASE
                  examType: stepper.type.toUpperCase(),
                  subjects: {
                    subject: stepper.subjectId,
                    topics: {
                      topic: stepper.topicId,
                    },
                    totalSolved: stepper.questionNumber,
                  },
                  totalDuration: stepper.duration,
                };
                await axios
                  .post(
                    `${import.meta.env.VITE_API_URL}/api/v1/session`,
                    sessionData,
                    {
                      withCredentials: true,
                    }
                  )
                  .then(() => {
                    Toast.fire({
                      icon: "success",
                      title: "Etüt başarıyla kaydedildi! Tebrikler..",
                      timer: 1000,
                    }).then(() => {
                      dispatch(setStep(0));
                    });
                  });
              } catch (error) {
                console.error("Kullanıcı bilgileri alınamadı:", error);
              }
            }}
          >
            Bitir
          </Dialog.DismissTrigger>
        )}
      </div>
    </div>
  );
}
