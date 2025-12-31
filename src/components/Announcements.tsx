"use client";

/**
 * ================================
 * 🔁 CLERK (DESATIVADO TEMPORARIAMENTE)
 * ================================
 */
// import { auth } from "@clerk/nextjs";

import { useEffect, useState } from "react";

type Announcement = {
  id: number;
  title: string;
  description: string;
  date: string;
};

const Announcements = () => {
  const [data, setData] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const res = await fetch("/api/announcements");
      const json = await res.json();
      setData(json);
    };

    fetchAnnouncements();
  }, []);

  const colors = [
    "bg-lamaSkyLight",
    "bg-lamaPurpleLight",
    "bg-lamaYellowLight",
  ];

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Avisos</h1>
        <span className="text-xs text-gray-400">Ver Todos</span>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {data.map((item, idx) => (
          <div
            key={item.id}
            className={`${colors[idx % colors.length]} rounded-md p-4`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{item.title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(item.date)
                )}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
