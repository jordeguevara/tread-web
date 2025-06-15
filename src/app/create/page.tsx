"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

interface Exercise {
  id: string;
  title: string;
  bodyPart: string;
  __typename: string;
}

const GET_EXERCISES_QUERY = gql`
  query getAllExercises {
    getExercises {
      id
      title
      bodyPart
    }
  }
`;

const ADD_EXERCISES_MUTATION = gql`
  mutation AddExercises($addExercisesInput: AddExercisesInput) {
    addExercisesToWorkout(input: $addExercisesInput) {
      title
      id
    }
  }
`;

const CREATE_WORKOUT_MUTATION = gql`
  mutation createWorkout($createWorkoutInput: CreateWorkoutInput!) {
    createWorkout(input: $createWorkoutInput) {
      name
      id
    }
  }
`;

export default function CreatePage() {
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const {
    loading,
    data: exercises,
    error,
  } = useQuery<{ getExercises: Exercise[] }>(GET_EXERCISES_QUERY);

  const [addExercises] = useMutation(ADD_EXERCISES_MUTATION, {
    variables: {
      addExercisesInput: {
        workoutID: null,
        exerciseIDs: selectedExercises,
      },
    },
  });
  const [createWorkout] = useMutation(CREATE_WORKOUT_MUTATION);

  const toggleExerciseSelection = (id: string) => {
    setSelectedExercises((prev) =>
      prev.includes(id)
        ? prev.filter((exerciseId) => exerciseId !== id)
        : [...prev, id]
    );
  };

  // Group exercises by bodyPart
  const groupedExercises = exercises?.getExercises?.reduce((acc, exercise) => {
    if (!acc[exercise.bodyPart]) {
      acc[exercise.bodyPart] = [];
    }
    acc[exercise.bodyPart].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>);

  const filteredGroupedExercises = groupedExercises
    ? Object.entries(groupedExercises).reduce((acc, [bodyPart, exercises]) => {
        const filteredExercises = exercises.filter((exercise) =>
          exercise.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredExercises.length > 0) {
          acc[bodyPart] = filteredExercises;
        }
        return acc;
      }, {} as Record<string, Exercise[]>)
    : null;

  // Handle adding selected exercises
  const handleAddExercises = async () => {
    try {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const formattedDate = now.toLocaleDateString("en-US", options);
      const workoutCreated = await createWorkout({
        variables: {
          createWorkoutInput: {
            name: `New Workout - ${formattedDate}`,
          },
        },
      });
      console.log({ workoutCreated });

      await addExercises({
        variables: {
          addExercisesInput: {
            workoutID: workoutCreated.data?.createWorkout.id,
            exerciseIDs: selectedExercises,
          },
        },
      });

      alert("Exercises added successfully!");
      setSelectedExercises([]);
      setSearchTerm("");
    } catch (error) {
      console.error("Error adding exercises:", error);
      alert("Failed to add exercises.");
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }
  if (error) {
    return <div className="p-4">Error loading exercises.</div>;
  }

  return (
    <div className="p-4">
      <div>
        <p className="text-center font-semibold pt-5 pb-4 text-2xl">
          Add Exercises
        </p>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Clear
        </button>
      </div>
      {filteredGroupedExercises &&
        Object.entries(filteredGroupedExercises).map(
          ([bodyPart, exercises]) => (
            <div key={bodyPart} className="mb-6">
              <h2 className="text-lg font-semibold mb-2">{bodyPart}</h2>
              <div className="space-y-2">
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className={`p-2 border rounded-md flex justify-between items-center ${
                      selectedExercises.includes(exercise.id)
                        ? "bg-blue-100"
                        : ""
                    }`}
                  >
                    <span>{exercise.title}</span>
                    <button
                      onClick={() => toggleExerciseSelection(exercise.id)}
                      className="text-sm text-blue-500"
                    >
                      {selectedExercises.includes(exercise.id)
                        ? "Deselect"
                        : "Select"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      <div className="sticky bottom-0 bg-white p-4 shadow-md">
        <button
          onClick={handleAddExercises}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Add Selected Exercises
        </button>
      </div>
    </div>
  );
}
