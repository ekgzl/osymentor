"use client";

import { Button, Timeline } from "@material-tailwind/react";

import { HomeSimple, Settings, UserCircle } from "iconoir-react";

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
              <HomeSimple className="h-6 w-6" />
            </Timeline.Icon>
          </Timeline.Header>
          <Timeline.Body className="text-center"></Timeline.Body>
        </Timeline.Item>
        <Timeline.Item disabled={step < 1} value="1" className="w-full">
          <Timeline.Header>
            <Timeline.Separator className="translate-x-1/2" />
            <Timeline.Icon className="mx-auto">
              <UserCircle className="h-6 w-6" />
            </Timeline.Icon>
          </Timeline.Header>
          <Timeline.Body className="text-center"></Timeline.Body>
        </Timeline.Item>
        <Timeline.Item disabled={step < 2} value="2" className="w-full">
          <Timeline.Header>
            <Timeline.Icon className="mx-auto">
              <Settings className="h-6 w-6" />
            </Timeline.Icon>
          </Timeline.Header>
          <Timeline.Body className="text-center"></Timeline.Body>
        </Timeline.Item>
      </Timeline>
      <div className="flex w-full justify-between gap-4">
        <Button disabled={step === 0} onClick={() => dispatch(prevStep())}>
          Geri
        </Button>
        <Button
          variant="solid"
          onClick={() => dispatch(nextStep())}
          color={step === 2 ? "success" : "primary"}
        >
          {step === 2 ? "Bitir" : "İleri"}
        </Button>
      </div>
    </div>
  );
}
