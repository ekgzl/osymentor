"use client";

import { Button, Dialog, Timeline } from "@material-tailwind/react";

import { Book, Notes, NumberedListLeft } from "iconoir-react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import {
  nextStep,
  prevStep,
} from "../../../../../features/drawer/StepperSlice";

export function StepperComp() {
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.stepper.step);

  return (
    <div className="w-full">
      <Timeline
        mode="stepper"
        value={step.toString()}
        className="relative mt-6"
      >
        <Timeline.Item disabled={step < 0} value="0" className="w-full">
          <Timeline.Header>
            <Timeline.Separator className="translate-x-1/2" />
            <Timeline.Icon className="mx-auto">
              <Book className="h-6 w-6" />
            </Timeline.Icon>
          </Timeline.Header>
          <Timeline.Body className="text-center"></Timeline.Body>
        </Timeline.Item>
        <Timeline.Item disabled={step < 1} value="1" className="w-full">
          <Timeline.Header>
            <Timeline.Separator className="translate-x-1/2" />
            <Timeline.Icon className="mx-auto">
              <Notes className="h-6 w-6" />
            </Timeline.Icon>
          </Timeline.Header>
          <Timeline.Body className="text-center"></Timeline.Body>
        </Timeline.Item>
        <Timeline.Item disabled={step < 2} value="2" className="w-full">
          <Timeline.Header>
            <Timeline.Icon className="mx-auto">
              <NumberedListLeft className="h-6 w-6" />
            </Timeline.Icon>
          </Timeline.Header>
          <Timeline.Body className="text-center"></Timeline.Body>
        </Timeline.Item>
      </Timeline>
      <div className="flex w-full justify-between gap-4">
        <Button disabled={step === 0} onClick={() => dispatch(prevStep())}>
          Geri
        </Button>
        {step < 2 ? (
          <Button
            variant="solid"
            onClick={() => {
              if (step < 2) dispatch(nextStep());
              else {
                //bitir
              }
            }}
            color={"primary"}
          >
            İleri
          </Button>
        ) : (
          <Dialog.DismissTrigger
            as={Button}
            variant="solid"
            color="success"
            onClick={() => {
              
            }}
          >
            Bitir
          </Dialog.DismissTrigger>
        )}
      </div>
    </div>
  );
}
