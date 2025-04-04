import { Advocate } from "../../types";
import { formatPhoneNumber } from "../../utils";
interface TableRowProps {
  advocates: Advocate[];
}

export function TableRows({ advocates }: TableRowProps): JSX.Element {
  const advocatesList = advocates.map((advocate) => {
    return (
      <tr key={advocate.id}>
        <td >{advocate.firstName}</td>
        <td>{advocate.lastName}</td>
        <td>{advocate.city}</td>
        <td>{advocate.degree}</td>
        <td>
          {advocate.specialties.map((s, index) => (
            <div key={index}>{s}</div>
          ))}
        </td>
        <td>{advocate.yearsOfExperience}</td>
        <td>{formatPhoneNumber(advocate.phoneNumber)}</td>
      </tr>
    );
  });
  return <>{advocatesList}</>;
}
