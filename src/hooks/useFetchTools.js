import { useState, useEffect } from 'react';
import { fetchTools } from '../services/toolsService';

export default function useFetchTools() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let sucess = true;
    setLoading(true);
    fetchTools()
      .then(data => {
        if (!sucess) return;
        setTools(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error(err);
        if (!sucess) return;
        setError(err);
      })
      .finally(() => sucess && setLoading(false));
    return () => { sucess = false; };
  }, []);

  return { tools, loading, error };
}
