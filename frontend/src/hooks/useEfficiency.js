export const useEfficiency = () => {
  const calculateScore = (pastTrips, rating) => {
    if (!pastTrips || pastTrips.length === 0) return 0;

    // 1. Calculate Average Speed Performance
    const totalDist = pastTrips.reduce((acc, trip) => acc + trip.distance, 0);
    const totalTime = pastTrips.reduce((acc, trip) => acc + trip.time, 0);
    const avgSpeed = totalDist / totalTime;

    // 2. Normalize: Assume 60km/h is the "perfect" efficiency for heavy trucks
    const speedScore = Math.min((avgSpeed / 60) * 100, 100);

    // 3. Normalize Rating: (Current Rating / Max Rating) * 100
    const ratingScore = (rating / 5) * 100;

    // 4. Weighted Result: 70% Speed Performance, 30% Customer Rating
    const finalScore = (speedScore * 0.7) + (ratingScore * 0.3);

    return Math.round(finalScore);
  };

  return { calculateScore };
};