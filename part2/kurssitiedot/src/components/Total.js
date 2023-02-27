const Total = ({ parts }) => {
  const totalExercises = parts
    .map((part) => part.exercises)
    .reduce((sum, current) => sum + current)
  return <b>Total of {totalExercises} exercises</b>
}

export default Total
