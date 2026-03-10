import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVariables } from "../api/nhtsaApi";
import type { VehicleVariable } from "../types/vehicle";

export default function VariableDetails() {
  const { id } = useParams();
  const [variable, setVariable] = useState<VehicleVariable | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVariable = async () => {
      try {
        const data = await getVariables();
        const foundVariable = data.Results.find(
          (item) => item.ID === Number(id),
        );

        if (!foundVariable) {
          setError("Variable not found");
        } else {
          setVariable(foundVariable);
        }
      } catch {
        setError("Failed to fetch variable details");
      } finally {
        setLoading(false);
      }
    };
    fetchVariable();
  }, [id]);

  if (loading) return <p>Loading variable details...</p>;
  if (error) return <p className="text-red-700">{error}</p>;
  if (!variable) return <p>No data</p>;
  return (
    <div>
      <h1>{variable.Name}</h1>
      <p>
        <strong>ID:</strong> {variable.ID}
      </p>
      <p>
        <strong>Description:</strong> {variable.Description || "No description"}
      </p>
      <p>
        <strong>Data Type:</strong> {variable.DataType || "Not specified"}
      </p>
      <p>
        <strong>Group Name:</strong> {variable.GroupName || "Not specified"}
      </p>
    </div>
  );
}
