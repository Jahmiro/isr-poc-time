import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";

type Props = {
  initialCurrentTime: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Page: React.FC<Props> = ({ initialCurrentTime }) => {
  const [currentTime, setCurrentTime] = useState<string>(initialCurrentTime);

  useEffect(() => {
    const fetchCurrentTime = async () => {
      try {
        const res = await fetch(`${BASE_URL}/current-time`);
        if (!res.ok) {
          throw new Error("Failed to fetch current time");
        }
        const data = await res.json();
        setCurrentTime(data.time); 
      } catch (error) {
        console.error("Error fetching current time:", error);
      }
    };

    const interval = setInterval(fetchCurrentTime, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navigation />
      <div className="flex items-center justify-center my-12">
        <TimeCard currentTime={currentTime} />
      </div>
    </div>
  );
};

type TimeCardProps = {
  currentTime: string;
};

const TimeCard: React.FC<TimeCardProps> = ({ currentTime }) => {
  return (
    <div className="bg-neutral-125 rounded-lg shadow-md p-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold mb-4 text-tertiary-700">Huidige Tijd</h1>
      <div className="text-xl text-tertiary-700">
        {currentTime || "Laatst bekende tijd wordt geladen..."}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  try {
    const res = await fetch(
      "https://cryptic-bastion-20850-17d5b5f8ec19.herokuapp.com/current-time"
    );
    if (!res.ok) {
      throw new Error("Failed to fetch current time");
    }
    const data = await res.json();
    const currentTime = data.time;

    return {
      props: {
        initialCurrentTime: currentTime || "", 
      },
      revalidate: 5, 
    };
  } catch (error) {
    console.error("Error fetching current time:", error);
    return {
      props: {
        initialCurrentTime: "", 
      },
      revalidate: 5,
    };
  }
};

export default Page;
