"use client";

import { useEffect, useState } from "react";
import { Roboto_Slab } from 'next/font/google'
import { Advocate } from "./types";
import { TableColumns } from "./components/TableColumns";
import { TableRows } from "./components/TableRow";

const roboto = Roboto_Slab({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
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
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  if (loading) {
    return (
      <div className="text-xl font-semibold text-center transition duration-150 ease-in-out">
        <h1 className={roboto.className}>Fetching Advocates...</h1>
      </div>
    );
  }

  return (
    <main style={{ marginTop: "24px", margin: "24px" }}>
      <h1 className="text-center font-bold text-2xl tracking-wide bg-lime-800 contrast-100">
        Solace Advocates
      </h1>
      <div>
        <p className="font-serif font-semibold text-xl">Search</p>
        <p className="inline-block mr-5 font-semibold">
          Searching for: <span id="search-term">{searchTerm}</span>
        </p>
        <input
          type="text"
          style={{ border: "1px solid black", padding: 2 }}
          value={searchTerm}
          onChange={onChange}
          placeholder="Enter search"
        />
        <button
          className="ml-3 outline outline-offset-2 outline-1 hover:outline-2"
          onClick={onClick}
        >
          Reset Search
        </button>
      </div>
      <div style={{ marginTop: "24px" }}>
        <table className="min-w-full">
          <TableColumns />
          <tbody>
            <TableRows advocates={filteredAdvocates} />
          </tbody>
        </table>
      </div>
    </main>
  );
}
