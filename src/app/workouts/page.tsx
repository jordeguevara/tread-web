"use client";
import { QueryWorkoutsArgs } from "@/types";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const GET_QUERY = gql`
  query Workout($userId: ID!) {
    workouts(userId: $userId) {
      name
      id
    }
  }
`;

interface Workout {
  id: string;
  name: string;
}

interface WorkoutData {
  workouts: Workout[];
}

export default function Home() {
  const { loading, error, data } = useQuery<WorkoutData, QueryWorkoutsArgs>(
    GET_QUERY,
    {
      variables: { userId: "0" },
    }
  );
  const router = useRouter();

  console.log({ loading, error, workouts: data });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data</p>;

  const handleWorkoutClick = (id: string) => {
    router.push(`/workout/${id}`);
  };

  const handleNewWorkoutClick = () => {
    router.push("/create");
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <main className="flex-grow">
        <div>
          <p className="text-center font-semibold pt-5 pb-4 text-2xl">
            Workouts
          </p>
        </div>

        <div>
          <p className=" text-2xl font-semibold pl-4 pt-4 pb-2">
            Completed workouts
          </p>
        </div>

        {data?.workouts && data?.workouts.length > 0 && (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {data?.workouts?.map((workout) => (
              <li
                key={workout.id}
                onClick={() => handleWorkoutClick(workout.id)}
                className="pl-4"
                style={{
                  cursor: "pointer",
                  padding: "16px",
                  borderBottom: "1px solid #ccc",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="bg-gray-200 p-2 rounded">
                  <Image
                    src="db.svg"
                    alt={workout.name}
                    width={24}
                    height={24}
                  />
                </div>
                <div className="flex flex-col pl-2">
                  <span className="">{workout.name}</span>
                  <span className="text-gray-500">Strength training</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        {data?.workouts && data?.workouts.length === 0 && (
          <p>No workouts found.</p>
        )}
      </main>
      <div className="mx-4 sticky bottom-8 bg-white">
        <button
          className="bg-blue-600 text-white py-2 rounded-full w-full"
          onClick={handleNewWorkoutClick}
        >
          New Workout
        </button>
      </div>
    </div>
  );
}
