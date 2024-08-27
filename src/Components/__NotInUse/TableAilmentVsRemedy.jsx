import React from "react";
import { Table } from "react-bootstrap";

const TableAilmentVsRemedy = () => {
  return (
    <>
      <Table striped hover>
        <thead className="bgtheme ">
          <tr>
            <th width="300" className="p-3 left-border-white">
              Ailment
            </th>
            <th className="p-3 " colSpan={2}>
              Remedy
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="themeborder p-4">Mark</td>
            <td className="themeborder p-4">Mark</td>
            <td className="themeborder p-4">Mark</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TableAilmentVsRemedy;
