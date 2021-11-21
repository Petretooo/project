import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../shared/Spinner";

import { fetchWorkout } from "../../actions/controller";

const Workout = () => {
  const workout = useSelector((state) => state.workout);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initWorkout = async () => {
      await fetchWorkout();
      setLoading(false);
    };

    initWorkout();
  }, []);

  if (loading)
    return (
      <div className="mt-32">
        <Spinner />
      </div>
    );
  return (
    <div className="text-center">
      <h1 className="text-3xl mt-32">Today's workout</h1>
      <div className="mt-8 border border-2 w-1/4 m-auto">
        <ul>
          {workout && workout.exercises && workout.exercises.length > 0
            ? workout.exercises.map((exercise, index) => {
                return (
                  <li key={index} className="p-2">
                    {exercise.reps} {exercise.name}
                  </li>
                );
              })
            : null}
        </ul>
      </div>
      <div className="mt-8">
        <Link to="/videos" replace>
          Upload video
        </Link>
      </div>
    </div>
  );
};

export default Workout;
