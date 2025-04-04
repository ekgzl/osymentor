"use client";

import { Button, Dialog, Timeline } from "@material-tailwind/react";

import { Book, Notes, NumberedListLeft } from "iconoir-react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import {
  nextStep,
  prevStep,
  setTopicId,
} from "../../../../../features/drawer/StepperSlice";
import axios from "axios";

interface Topic {
  _id: string;
  name: string;
  subject: string;
}

export function StepperComp() {
  const dispatch = useDispatch();
  const stepper = useSelector((state: RootState) => state.stepper);
  return (
    <div className="w-full">
      <Timeline
        mode="stepper"
        value={stepper.step.toString()}
        className="relative mt-6"
      >
        <Timeline.Item disabled={stepper.step < 0} value="0" className="w-full">
          <Timeline.Header>
            <Timeline.Separator className="translate-x-1/2" />
            <Timeline.Icon className="mx-auto">
              <Book className="h-6 w-6" />
            </Timeline.Icon>
          </Timeline.Header>
          <Timeline.Body className="text-center"></Timeline.Body>
        </Timeline.Item>
        <Timeline.Item disabled={stepper.step < 1} value="1" className="w-full">
          <Timeline.Header>
            <Timeline.Separator className="translate-x-1/2" />
            <Timeline.Icon className="mx-auto">
              <Notes className="h-6 w-6" />
            </Timeline.Icon>
          </Timeline.Header>
          <Timeline.Body className="text-center"></Timeline.Body>
        </Timeline.Item>
        <Timeline.Item disabled={stepper.step < 2} value="2" className="w-full">
          <Timeline.Header>
            <Timeline.Icon className="mx-auto">
              <NumberedListLeft className="h-6 w-6" />
            </Timeline.Icon>
          </Timeline.Header>
          <Timeline.Body className="text-center"></Timeline.Body>
        </Timeline.Item>
      </Timeline>
      <div className="flex w-full justify-between gap-4">
        <Button
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
            color={"primary"}
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
                await axios
                  .get(`${import.meta.env.VITE_API_URL}/api/v1/user`, {
                    withCredentials: true,
                  })
                  .then(async (res) => {
                    const user_id = res.data.user._id;
                    await axios
                      .get(`${import.meta.env.VITE_API_URL}/api/v1/topic`, {
                        withCredentials: true,
                      })
                      .then((res) => {
                        const topic_id = res.data.data.topics.find(
                          (topic: Topic) => topic.name === stepper.topic
                        )._id;
                        dispatch(setTopicId(topic_id));
                      });
                    const sessionData = {
                      user: user_id,
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
                    await axios.post(
                      `${import.meta.env.VITE_API_URL}/api/v1/session`,
                      sessionData,
                      {
                        withCredentials: true,
                      }
                    );
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
