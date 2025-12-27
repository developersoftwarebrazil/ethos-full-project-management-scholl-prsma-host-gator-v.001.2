"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = ({ dateParam }: { dateParam?: string }) => {
  // Define a data inicial corretamente
  const initialDate = dateParam ? new Date(dateParam) : new Date();

  const [value, setValue] = useState<Value>(initialDate);
  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      const iso = value.toISOString();
      router.push(`?date=${iso}`);
    }
  }, [value, router]);

  return <Calendar onChange={setValue} value={value} />;
};

export default EventCalendar;
