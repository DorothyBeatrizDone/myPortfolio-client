import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
import axios from 'axios';
const baseUrl = `http://${host}:${PORT}`;

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);


  const fetchProject = async () => {
    try {
      const response = await axios.get(`{baseUrl}/projects/${id}`);
      setProject(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading project details</p>;

    <div>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <p>Visibility: {project.visibility}</p>

    </div>

  return
}