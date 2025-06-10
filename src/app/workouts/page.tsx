"use client";
import { QueryWorkoutsArgs } from "@/types";
import { gql, useQuery } from "@apollo/client";

const GET_QUERY = gql`
  query Workout($userId: ID!) {
    workouts(userId: $userId) {
      name
      id
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery<[], QueryWorkoutsArgs>(GET_QUERY, {
    variables: { userId: "0" }, // Replace with actual user ID
  });

  console.log({ loading, error, workouts: data });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data</p>;

  const handleWorkoutClick = (id: string) => {
    alert(`Workout ID: ${id}`);
  };

  const mockData = [
    {
      id: "1",
      title: "Workout 1",
    },
    {
      id: "2",
      title: "Workout 2",
    },
    {
      id: "3",
      title: "Workout 3",
    },
  ];
  const workouts = mockData; //data.workouts

  return (
    <div className="bg-white text-black">
      <main className="">
        <p>Workouts:</p>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {workouts?.map((workout) => (
            <li
              key={workout.id}
              onClick={() => handleWorkoutClick(workout.id)}
              style={{
                cursor: "pointer",
                padding: "10px",
                borderBottom: "1px solid #ccc",
              }}
            >
              {workout.title}
            </li>
          ))}
        </ul>
        <button
          className="bg-blue-600 text-white  py-2 rounded w-full"
          onClick={() => alert("New Workout button clicked!")}
        >
          New Workout
        </button>
      </main>
    </div>
  );
}
