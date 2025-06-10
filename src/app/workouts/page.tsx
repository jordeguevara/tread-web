"use client";
import { QueryWorkoutsArgs } from "@/types";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

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
    router.push("/workouts/create"); // Navigate to the "create workout" page
  };

  return (
    <div className="bg-white text-black">
      <main className="">
        <p>Workouts:</p>
        {data?.workouts && data?.workouts.length > 0 && (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {data?.workouts?.map((workout) => (
              <li
                key={workout.id}
                onClick={() => handleWorkoutClick(workout.id)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                {workout.name}
              </li>
            ))}
          </ul>
        )}
        {data?.workouts && data?.workouts.length === 0 && (
          <p>No workouts found.</p>
        )}
        <button
          className="bg-blue-600 text-white  py-2 rounded w-full"
          onClick={handleNewWorkoutClick}
        >
          New Workout
        </button>
      </main>
    </div>
  );
}
