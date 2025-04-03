"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types";
import TableColumns from "./components/TableColumns";
import { AdvocatesRows } from "./components/TableRow";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/advocates");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        console.log("jsonResponse", jsonResponse);
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <h1 className="text-center">Fetching Advocates...</h1>;
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.specialties.includes(searchTerm.toLowerCase()) ||
        String(advocate.yearsOfExperience).includes(searchTerm.toLowerCase())
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    setSearchTerm("")
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ marginTop: "24px", margin: "24px" }}>
      <h1 className="text-center font-bold">Solace Advocates</h1>
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input
          type="text"
          style={{ border: "1px solid black" }}
          value={searchTerm}
          onChange={onChange}
          placeholder="Enter search"
        />
        <button className="border-2 border-solid ml-3" onClick={onClick}>
          Reset Search
        </button>
      </div>
      <div style={{ marginTop: "24px" }}>
        <table className="min-w-full">
          <TableColumns />
          <tbody>
            <AdvocatesRows advocates={filteredAdvocates} />
          </tbody>
        </table>
      </div>
    </main>
  );
}
