"use client";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "next/navigation";

interface Exercise {
  id: number;
  name: string;
  title?: string;
}

interface Workout {
  title: string;
  description: string;
  exercises: Exercise[];
  id: string;
}

interface Set {
  id: number;
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

const GET_EXERCISES_QUERY = gql`
  query getAllExercises {
    getExercises {
      id
      title
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

const ADD_EXERCISES_MUTATION = gql`
  mutation AddExercises($addExercisesInput: AddExercisesInput!) {
    addExercisesToWorkout(input: $addExercisesInput) {
      id
      title
    }
  }
`;

// const DELETE_SET_MUTATION = gql`
//   mutation deleteSet($setID: deleteSetInput!) {
//     deleteSet(input: $setID)
//   }
// `;

const WorkoutPage: React.FC<{ workoutID: string }> = ({ workoutID }) => {
  const { loading, error, data } = useQuery(GET_WORKOUT_DETAIL, {
    variables: { workoutID },
    onCompleted: (data) => {
      if (data?.workout?.sets) {
        const setsByExercise = data.workout.exercises.reduce(
          (acc: { [key: number]: Set[] }, exercise: Exercise) => {
            acc[exercise.id] = data.workout.sets.filter(
              (set: Set) => set.id === exercise.id // Adjust logic based on actual association
            );
            return acc;
          },
          {}
        );
        setExerciseSets(setsByExercise);
      }
    },
  });

  const {
    loading: exercisesLoading,
    error: exercisesError,
    data: exercisesData,
  } = useQuery(GET_EXERCISES_QUERY);

  const toggleExerciseSelection = (id: string) => {
    setSelectedExercises((prev) =>
      prev.includes(id)
        ? prev.filter((exerciseId) => exerciseId !== id)
        : [...prev, id]
    );
  };
  const [addExercises] = useMutation(ADD_EXERCISES_MUTATION);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const [addSets] = useMutation(ADD_SET_MUTATION);
  // const [deleteSet] = useMutation(DELETE_SET_MUTATION);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);
  const [exerciseSets, setExerciseSets] = useState<{ [key: number]: Set[] }>(
    {}
  );

  const handleAddExercises = async () => {
    try {
      await addExercises({
        variables: {
          addExercisesInput: {
            workoutID: workout.id,
            exerciseIDs: selectedExercises,
          },
        },
      });
      alert("Exercises added successfully!");
      setSelectedExercises([]);
    } catch (error) {
      console.error("Error adding exercises:", error);
      alert("Failed to add exercises.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (loading || exercisesLoading) return <p>Loading...</p>;
  if (error || exercisesError)
    return <p>Error: {error?.message || exercisesError?.message}</p>;

  const allExercises: Exercise[] = exercisesData.getExercises;

  const workout: Workout = data.workout;

  const handleExpand = (exerciseId: number) => {
    setExpandedExercise((prev) => (prev === exerciseId ? null : exerciseId));
  };

  const handleAddSet = (exerciseId: number) => {
    setExerciseSets((prev) => ({
      ...prev,
      [exerciseId]: [
        ...(prev[exerciseId] || []),
        { id: undefined, weight: 0, reps: 0 },
      ],
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
      const savedSets = response.data.addSets.map((savedSet) => ({
        id: savedSet.id,
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
      {/* <h1>{workout.name}</h1> */}
      {/* <p>{workout.description}</p> */}
      <h2>Exercises</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {workout?.exercises?.map((exercise) => (
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
                    <div style={{ marginBottom: "10px" }}>
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
                    </div>
                    <div>
                      <label>
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

      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add Exercises
      </button>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "80%",
              overflowY: "auto",
            }}
          >
            <h2>Select Exercises</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {allExercises.map((exercise) => (
                <li
                  key={exercise.id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    padding: "10px",
                    cursor: "pointer",
                    backgroundColor: selectedExercises.includes(
                      String(exercise.id)
                    )
                      ? "#d1e7dd"
                      : "#fff",
                  }}
                  onClick={() => toggleExerciseSelection(String(exercise.id))}
                >
                  {exercise.title}
                </li>
              ))}
            </ul>
            <button
              onClick={handleAddExercises}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Add Selected Exercises
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Page = () => {
  const params = useParams();
  const workoutID = params?.workoutID;
  return <WorkoutPage workoutID={workoutID as string} />;
};

export default Page;
