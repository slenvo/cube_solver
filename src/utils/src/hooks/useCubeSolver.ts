import { useState } from 'react';
// @ts-ignore
import Cube from 'cubejs';

// Initialize CubeJS solver library mapping engine
try {
  Cube.initSolver();
} catch (e) {
  console.log("Solver initialization sequence.");
}

export function useCubeSolver() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSolution = async (cubeNotationString: string): Promise<string[]> => {
    setLoading(true);
    setError(null);
    try {
      // Input structure must match 54 character facelet format: UUUUUUUUU...RRRRRRRRR...
      const cubeInstance = Cube.fromString(cubeNotationString);
      const movesStr = cubeInstance.solve();
      return movesStr.split(' ').filter((m: string) => m.trim().length > 0);
    } catch (err) {
      setError('Invalid facelet distribution string structure. Verification failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generateSolution, loading, error };
}