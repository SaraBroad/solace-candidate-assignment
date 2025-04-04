import React from "react";
import { render, screen } from "@testing-library/react";
import { TableRows } from ".";

const advocateData = [
  {
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    degree: "MD",
    specialties: ["Pediatrics"],
    yearsOfExperience: 10,
    phoneNumber: 5551234567,
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    city: "Los Angeles",
    degree: "PhD",
    specialties: ["Chronic pain"],
    yearsOfExperience: 8,
    phoneNumber: 5559876543,
  },
];

describe("TableColumns", () => {
  test("renders data", () => {
    render(<TableRows advocates={advocateData} />);
    const element = screen.getByText("Jane");
    expect(element).toBeInTheDocument();
  });
});
