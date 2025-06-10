"use client";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "next/navigation";

interface Exercise {
  id: number;
  name: string;
}

interface Workout {
  title: string;
  description: string;
  exercises: Exercise[];
}

interface Set {
  weight: number;
  reps: number;
}

const GET_WORKOUT_DETAIL = gql`
  query WorkoutSpecifics($workoutID: ID!) {
    workout(id: $workoutID) {
      id
      name
      exercises {
        id
        name
      }
      sets {
        id
        exerciseID
        numOfReps
        weight
      }
    }
  }
`;

const ADD_SET_MUTATION = gql`
  mutation addSets($input: SetsInput!) {
    addSets(input: $input) {
      id
      numberOfReps
      weight
      workoutExerciseID
    }
  }
`;

const DELETE_SET_MUTATION = gql`
  mutation deleteSet($setID: deleteSetInput!) {
    deleteSet(input: $setID)
  }
`;

const WorkoutPage: React.FC<{ workoutID: string }> = ({ workoutID }) => {
  const { loading, error, data } = useQuery(GET_WORKOUT_DETAIL, {
    variables: { workoutID },
    onCompleted: (data) => {
      if (data?.workout?.sets) {
        const setsByExercise = data.workout.sets.reduce(
          (acc: { [key: number]: Set[] }, set: Set) => {
            if (!acc[set.exerciseID]) {
              acc[set.exerciseID] = [];
            }
            acc[set.exerciseID].push({
              id: set.id,
              weight: set.weight,
              reps: set.numOfReps,
            });
            return acc;
          },
          {}
        );
        setExerciseSets(setsByExercise);
      }
    },
  });

  const [addSets] = useMutation(ADD_SET_MUTATION);
  const [deleteSet] = useMutation(DELETE_SET_MUTATION);

  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);
  const [exerciseSets, setExerciseSets] = useState<{ [key: number]: Set[] }>(
    {}
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const workout: Workout = data.workout;

  const handleExpand = (exerciseId: number) => {
    setExpandedExercise((prev) => (prev === exerciseId ? null : exerciseId));
  };

  const handleAddSet = (exerciseId: number) => {
    setExerciseSets((prev) => ({
      ...prev,
      [exerciseId]: [...(prev[exerciseId] || []), { weight: 0, reps: 0 }],
    }));
  };

  const handleSetChange = (
    exerciseId: number,
    setIndex: number,
    field: "weight" | "reps",
    value: number
  ) => {
    setExerciseSets((prev) => {
      const updatedSets = [...(prev[exerciseId] || [])];
      updatedSets[setIndex] = { ...updatedSets[setIndex], [field]: value };
      return { ...prev, [exerciseId]: updatedSets };
    });
  };

  const handleSave = async (exerciseId: number) => {
    console.log(
      "Saved sets for exercise:",
      exerciseId,
      exerciseSets[exerciseId]
    );
    try {
      const response = await addSets({
        variables: {
          input: {
            WorkoutID: workoutID,
            exerciseID: exerciseId,
            sets: exerciseSets[exerciseId]?.map((set) => ({
              numberOfReps: set.reps,
              weight: set.weight,
            })),
          },
        },
      });
      const savedSets = response.data.addSets.map((savedSet: any) => ({
        id: savedSet.id, // Use the backend-generated ID
        weight: savedSet.weight,
        reps: savedSet.numberOfReps,
      }));

      setExerciseSets((prev) => ({
        ...prev,
        [exerciseId]: savedSets,
      }));
    } catch (error) {
      console.error("Error saving sets:", error);
      return;
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>{workout.name}</h1>
      <p>{workout.description}</p>
      <h2>Exercises</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {workout.exercises.map((exercise) => (
          <li
            key={exercise.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginBottom: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleExpand(exercise.id)}
          >
            <strong>{exercise.name}</strong>
            {expandedExercise === exercise.id && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the expanded UI
              >
                {exerciseSets[exercise.id]?.map((set, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <label>
                      Weight (lbs):
                      <input
                        type="number"
                        value={set.weight}
                        onChange={(e) =>
                          handleSetChange(
                            exercise.id,
                            index,
                            "weight",
                            parseInt(e.target.value, 10)
                          )
                        }
                        style={{
                          marginLeft: "10px",
                          padding: "5px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </label>
                    <label style={{ marginLeft: "20px" }}>
                      Reps:
                      <input
                        type="number"
                        value={set.reps}
                        onChange={(e) =>
                          handleSetChange(
                            exercise.id,
                            index,
                            "reps",
                            parseInt(e.target.value, 10)
                          )
                        }
                        style={{
                          marginLeft: "10px",
                          padding: "5px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </label>
                  </div>
                ))}
                <button
                  onClick={() => handleAddSet(exercise.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  + Add Set
                </button>
                <button
                  onClick={() => handleSave(exercise.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Page = () => {
  const params = useParams();
  const workoutID = params?.workoutID;
  return <WorkoutPage workoutID={workoutID} />;
};

export default Page;
