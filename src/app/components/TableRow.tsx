import { Advocate } from "../types";

interface TableRowProps {
  advocates: Advocate[];
}

export function AdvocatesRows({ advocates }: TableRowProps): JSX.Element {
  console.log("ADVOCATES", advocates);
  const advocatesList = advocates.map((advocate, index) => {
    return (
      <tr key={index}>
        <td>{advocate.firstName}</td>
        <td>{advocate.lastName}</td>
        <td>{advocate.city}</td>
        <td>{advocate.degree}</td>
        <td>
          {advocate.specialties.map((s) => (
            <div>{s}</div>
          ))}
        </td>
        <td>{advocate.yearsOfExperience}</td>
        <td>{advocate.phoneNumber}</td>
      </tr>
    );
  });
  return <>{advocatesList}</>;
}
